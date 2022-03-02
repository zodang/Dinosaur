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
    constructor() {
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

document.addEventListener('keydown', function(e) {
    if (e.code == 'Space' && dino.y == 200) {
        jump = true;
    }
})

//프레임마다 실행하는 함수
var timer = 0;
var jumpTimer = 0;

function frame() {
    requestAnimationFrame(frame);
    
    timer++;
    ctx.clearRect(0, 0, canvas.width, canvas.height); //화면 지움

    if (timer % 120 == 0) {
        var cactus = new Cactus();
        cactusGroup.push(cactus);
    }

    cactusGroup.forEach((a, i, o)=>{
        //x좌표가 0이면 제거
        if (a.x < 0) {
            o.splice(i, 1);
        }
        a.x--;
        a.draw();
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



