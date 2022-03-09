var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

var dino = {
    x:100,
    y: 400,
    width: 50,
    height: 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

class Cactus {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = 400;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

var animation;
var timer = 0;
var jump = false;
var jumpTimer = 0;
var jumpSpeed = 5; // 점프 속도
var cactusGroup = []    // 배열에 장애물 생성
var cactusSpeed = 3; //장애물 속도
var cactusFrequency = 180 ///장애물 빈도수
var ground = dino.y;    //땅 위치

//스페이스바 점프
document.addEventListener("keydown", function() {
    if (dino.y == ground) {
        jump = true;
    }
})

//랜덤 정수
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max-min)) + min;
}

//충돌 확인
function checkCrush(obj1, obj2) {
    var xGap = obj1.x - obj2.x > 0 ? obj1.x - (obj2.x + obj2.width) : obj2.x - (obj1.x + obj1.width);
    var yGap = obj1.y - obj2.y > 0 ? obj1.y - (obj2.y + obj2.height) : obj2.y - (obj1.y + obj1.height);

    if (xGap <= 0  && yGap <= 0) {
        cancelAnimationFrame(animation);
    }
}

function frame() {
    animation = requestAnimationFrame(frame);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    timer++;
    
    //장애물 생성
    if (timer % cactusFrequency == 0) {
        var cactus = new Cactus(1300 + getRandomInt(-1, 1) * 100, 400, 50, 50);
        console.log(cactusGroup)
        cactusGroup.push(cactus);
    }

    //장애물 제거
    cactusGroup.forEach(function(element) {
        element.draw();
        element.x -= cactusSpeed;
        if (element.x < -element.width) {
            cactusGroup.splice(0,1);
        }
    })

    //점프
    if (jump == true) {
        jumpTimer++;
        dino.y -= jumpSpeed;
    }

    if (jumpTimer > 45) {
        jump = false;
        jumpTimer = 0;
    }

    if (jump == false) {
        if (dino.y < ground) {
            dino.y += jumpSpeed;
        }
    }

    dino.draw();
    checkCrush(dino, cactusGroup[0]);
}

frame();