const canvas = document.querySelector('canvas');

// (1) Canvas 사이즈 정하기
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

const getPosition = () => randomNumBetween(0, canvasWidth);
const getRadius = () => randomNumBetween(50, 100);
const getVy = () => randomNumBetween(1, 5);

// (2) 파티클 그리기
class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    // 랜덤한 속도로 애니메이션
    this.vy = vy;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }

  // 각각의 파티클이 초기화된 값을 변경되도록 만듦
  update() {
    this.y += this.vy;
  }

  restart() {
    this.y = 0 - this.radius;
    this.x = getPosition();
    this.radius = getRadius();
    this.vy = getVy();
  }
}

// (3) 파티클 애니메이션 로직
const TOTAL = 10;

const particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = getPosition();
  const y = getPosition();
  const radius = getRadius();
  const vy = getVy();
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

let interval = 1000 / 60; // 60FPS 가 타겟
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  // 캔버스 리셋
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    // 만약 캔버스 영역 바깥으로 나갔다면 위치를 캔버스 최상단으로 올리기

    if (
      particle.y -
        // >> particle.radius 를 더 빼줘야 공이 땅에 닿았을 때 올라감
        canvasHeight >
      particle.radius
    ) {
      particle.restart();
    }
  });

  then = now - (delta % interval);
}

animate();
