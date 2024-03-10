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
    this.vy = vy;

    // 가속도 (+) : 점점 더 빨라지는 느낌(중력)
    this.acc = 1.01;
    // 마찰력 (-) : 점점 더 느려지다 결국 0으로 수렴(결국 멈추는 것)
    this.friction = 0.98;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.vy *= this.acc;
    // this.vy *= this.friction;
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

    if (particle.y - canvasHeight > particle.radius) {
      particle.restart();
    }
  });

  then = now - (delta % interval);
}

animate();
