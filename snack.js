//地图数组，0表示地图，1表示蛇，2表示食物
var numArr = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
];
var nodeArr = []; //节点数组
var Size = 20; //地图尺寸
var container = document.getElementsByClassName("container")[0];
container.style.width = Size * 20 + 1 + "px"; //动态设置容器宽高
//蛇对象
var Snack = {
    snackNode: [],
    direction: "right"
}
Snack.show = function () {
    for (var i = 0; i < this.snackNode.length; i++) {
        this.snackNode[i].className = "snack"
    }
}
Snack.move = function () {
    setTimeout(function () {
        var nextNode = null;
        var snackHead = Snack.snackNode[Snack.snackNode.length - 1];
        // console.log(snackHead);
        if (Snack.direction == "up") {
            // console.log("up");
            nextNode = nodeArr.filter(function (v, k) {
                return (v.offsetLeft == snackHead.offsetLeft) && (v.offsetTop == snackHead.offsetTop - 20)
            })
        }
        if (Snack.direction == "down") {
            // console.log("down");
            nextNode = nodeArr.filter(function (v, k) {
                return (v.offsetLeft == snackHead.offsetLeft) && (v.offsetTop == snackHead.offsetTop + 20)
            })
        }
        if (Snack.direction == "left") {
            // console.log("left");
            nextNode = nodeArr.filter(function (v, k) {
                return (v.offsetLeft == snackHead.offsetLeft - 20) && (v.offsetTop == snackHead.offsetTop)
            })
        }
        if (Snack.direction == "right") {
            // console.log("right");
            nextNode = nodeArr.filter(function (v, k) {
                return (v.offsetLeft == snackHead.offsetLeft + 20) && (v.offsetTop == snackHead.offsetTop)
            })
        }
        // console.log(nextNode);
        if (nextNode.length>0) {
            Snack.snackNode.push(nextNode[0]);
            if (nextNode[0].className=="food") {
                // console.log("213");
                createFood();
            } else {
                var snackTail= Snack.snackNode.shift();
                snackTail.className="";
            }
            Snack.show();
            Snack.move();
        } else {
            alert("game over!");
            InitMap();
            return;
        }
    }, 100)
}

var foodNode = null;
//初始化地图和蛇
function InitMap() {
    container.innerHTML="";
    Snack.snackNode = [];
    nodeArr=[];
    for (var i = 0; i < numArr.length; i++) {
        var li = document.createElement("li");
        if (numArr[i] == 1) {
            Snack.snackNode.push(li);
        }
        nodeArr.push(li);
        container.appendChild(li);
    }
    Snack.direction = "right";
    Snack.show();
}
//产生食物
function createFood() {
    var nodeLeft = nodeArr.filter(function (v, k) {
        return !Snack.snackNode.includes(v);
    });
    var ran = Math.floor(nodeLeft.length * Math.random());
    foodNode = nodeLeft[ran];
    foodNode.className = "food";
}

InitMap();
createFood();
Snack.move();
document.addEventListener("keypress",function(e){
    // console.log(e.keyCode);
    if(e.keyCode==97&&Snack.direction!="right"){
        Snack.direction="left"
    }
    if(e.keyCode==119&&Snack.direction!="down"){
        Snack.direction="up"
    }
    if(e.keyCode==100&&Snack.direction!="left"){
        Snack.direction="right"
    }
    if(e.keyCode==115&&Snack.direction!="up"){
        Snack.direction="down"
    }
})