const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext("2d");
const color = document.querySelectorAll(".jsColor");
const range = document.querySelector("#jsRange");
const mode = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");

const CANVAS_SIZE = 700;
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

const INITIAL_COLOR = "#2c2c2c";

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

ctx.fillStyle = INITIAL_COLOR;
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}
function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function onMouseDown(event) {
  painting = true;
}

function handleRange(event) {
  ctx.lineWidth = event.target.value;
}
function handleMode() {
  if (filling === true) {
    filling = false;
    mode.innerHTML = "Fill";
  } else {
    filling = true;
    mode.innerHTML = "PAINT";
    ctx.fillStyle = ctx.strokeStyle;
  }
  console.log(filling);
}
function handleCanvasClick() {
  if (filling) ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
}
function handleCM(event) {
  event.preventDefault();
}
function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "JsPaint";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

color.forEach((colors) => {
  colors.addEventListener("click", () => {
    ctx.strokeStyle = colors.style.backgroundColor;
    ctx.fillStyle = colors.style.backgroundColor;
  });
});

range.addEventListener("input", handleRange);
mode.addEventListener("click", handleMode);

saveBtn.addEventListener("click", handleSaveClick);
