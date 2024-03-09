const canvas = document.querySelector('canvas');

// (1) Canvas 사이즈 정하기
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;

const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

// (2) 파티클 그리기
ctx.beginPath();
// >> arc(시작하는 x 위치, 시작하는 y 위치, 반지름의 길이, 시작하는 각도, 끝나는 각도, 시계or반시계 방향)
// >> 각도 1도는 파이를 180도로 나눈 값과 같다.
ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
ctx.fillStyle = 'red';
ctx.fill();
ctx.stroke();
ctx.closePath();

// >> 애니메이션을 그리고 싶다면? : 파티클의 위치를 이동하는 로직만 작성하면 됨
// >> 파티클을 여러 개 다루고 싶다면, 파티클 하나 당 클래스 하나를 둠으로써 관리하는 것이 편리함
class Particle {
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
  }
}

const x = 200;
const y = 200;
const radius = 25;
const particle = new Particle(x, y, 25);

particle.draw();

const x1 = 100;
const y1 = 200;
const particle1 = new Particle(x1, y1, radius);

function animate() {
  // 재귀적으로 animation 이 무한으로 실행되는 것
  window.requestAnimationFrame(animate);

  // cl
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle1.draw();
}

animate();
