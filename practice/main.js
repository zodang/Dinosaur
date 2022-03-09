var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth - 100;
canvas.height = window.innerHeight - 100;

//dino 객체

var dino = {
    x : 10,
    y : 200,
    width : 50,
    height : 50,
    draw() {
        ctx.fillStyle = 'green';
        ctx.fillRect(this.x, this.y, this.width, this.height);        
    }
}

//장애물 클래스
var cactusGroup = [];

class Cactus {
    constructor (x, y, width, height) {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

//스페이스바 누르면 점프
var jump = false;

document.addEventListener('keydown', function(event) {
    if (event.code == 'Space' && dino.y == 200) {
        jump = true;
    }
})

document.addEventListener('click', function() {
    if (dino.y == 200) {
        jump = true;
    }
})


//프레임마다 실행하는 함수
var timer = 0;
var jumpTimer = 0;
var animation;

function frame() {
    animation = requestAnimationFrame(frame);
    
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //화면 지움

    if (timer % 150 == 0) {
        var cactus = new Cactus();
        cactusGroup.push(cactus);
    }
    

    cactusGroup.forEach((element, index, array) => {
        //x좌표가 -50 제거
        if (element.x < -50) {
            array.splice(index, 1);
        }
        element.x = element.x - 2;
        element.draw();

        checkCrush(dino, element);
    })

    //점프 올라가기
    if (jump == true) {
        jumpTimer++;
        dino.y -= 2;
    }
    
    //50 프레임동안 점프
    if (jumpTimer > 60) {
        jump = false;
        jumpTimer = 0;
    }

    //점프 내려오기
    if (jump == false) {
        if (dino.y < 200){
            dino.y += 2;
        }
    }
    dino.draw();
}
frame();

//충돌확인
function checkCrush(dino, cactus) {
    var xGap = cactus.x - (dino.x + dino.width);
    var yGap = cactus.y - (dino.y + dino.height);
    
    if (xGap <= 0 && yGap <= 0) {
        cancelAnimationFrame(animation);
    }
}