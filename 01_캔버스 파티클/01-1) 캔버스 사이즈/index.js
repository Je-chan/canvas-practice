const canvas = document.querySelector('canvas');

const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;

// ctx 는 canvas 를 사용할 도구라고 생각하면 된다.

// style 이 300 이 되면서, canvas 의 기본 길이가 300 으로 늘어지게 됨.
// canvas.style.width = 300 + "px";
// canvas.style.height = 300 + "px";
//
// canvas.width = 300;
// canvas.height = 300;

// 따라서 스타일링을 할 때, width, height 등은 변수를 사용하는 것이 좋다.
const canvasWidth = 300;
const canvasHeight = 300;

canvas.style.width = `${canvasWidth}px`;
canvas.style.height = `${canvasHeight}px`;

// dpr 을 곱해줌으로써 더 선명하게 홤녀을 볼 수 있도록 만듦
// >> style.width, style.height 가 있기 때문에 더 많은 디바이스를 사용해 픽셀을 그리고 크기를 줄인 것
// >> 픽셀을 더욱 잘개 쪼개서 그림을 표현하는 원리임
canvas.width = canvasWidth * dpr;
canvas.height = canvasHeight * dpr;
ctx.scale(dpr, dpr);

ctx.fillRect(10, 10, 50, 50);
