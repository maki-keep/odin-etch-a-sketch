const getArrowIndex = function(event) {
  return controls.items.findIndex(item => item.keyCode === event.keyCode);
};

const drawSketch = function() {
  // start the path with old x y
  sketchContext.beginPath();
  // set new coordinates based on movement amount
  sketchContext.moveTo(lastX, lastY);
  // draw the path
  sketchContext.fillRect(lastX, lastY, moveAmount, moveAmount);
};

const drawGrid = function() {
  gridContext.clearRect(0, 0, width, height);

  // reset position
  gridContext.moveTo(0, 0);

  gridContext.beginPath();

  // vertical lines
  for (let i = 0; i <= width; i += moveAmount) {
    gridContext.moveTo(0.5 + i, 0);
    gridContext.lineTo(0.5 + i, height);
  }

  // horizontal lines
  for (let i = 0; i <= height; i += moveAmount) {
    gridContext.moveTo(0, 0.5 + i);
    gridContext.lineTo(width, 0.5 + i);
  }

  gridContext.stroke();
};

// draw the cursor image on the cursor canvas
const drawCursor = function() {
  // clear the previous cursors
  cursorContext.clearRect(0, 0, width, height);

  // draw a new cursor
  cursorContext.drawImage(cursorImage, lastX - moveAmount / 2, lastY - moveAmount / 2, moveAmount * 2, moveAmount * 2);
}

const handleToggleGrid = () => {
  gridCanvas.style.display = gridCanvas.style.display === "none" ? "block" : "none";
};

const handleToggleCursor = () => {
  cursorCanvas.style.display = cursorCanvas.style.display === "none" ? "block" : "none";
};

const handleDraw = (event) => {
  // prevent normal arrow functionality
  event.preventDefault();

  const index = getArrowIndex(event);
  // left
  if (index === 0) {
    if (lastX > 0) {
      lastX -= moveAmount;
    }
  }
  // up
  else if (index === 1) {
    if (lastY > 0) {
      lastY -= moveAmount;
    }
  }
  // right
  else if (index === 2) {
    if (lastX < right) {
      lastX += moveAmount;
    }
  }
  // down
  else if (index === 3) {
    if (lastY < bottom) {
      lastY += moveAmount;
    }
  }

  // any arrow key
  if (index !== -1) {
    drawSketch();
    // move the cursor
    drawCursor();
  }

  // console.log(lastX, lastY);

  // keep track of keys pressed
  /* keysPressed[event.key] = true;
  console.log(keysPressed); */
};

const handleResetCanvas = (event) => {
  event.preventDefault();
  sketchContext.clearRect(0, 0, width, height);

  // change moveAmount to the selected stroke width
  moveAmount = parseInt(event.currentTarget.elements["stroke-width"].value);
  lastX = 0;
  lastY = 0;
  right = width - moveAmount;
  bottom = height - moveAmount;

  // draw the first sketch tile
  drawSketch();
  // draw grid with the new moveAmount
  drawGrid();
  // move the cursor
  drawCursor();
};

const controls = {
  items: [
    {
      name: "left",
      keyCode: 37
    },
    {
      name: "up",
      keyCode: 38
    },
    {
      name: "right",
      keyCode: 39
    },
    {
      name: "down",
      keyCode: 40
    }
  ]
};

// object to keep track of when keys are pressed
/* let keysPressed = {}; */

const sketchCanvas = document.getElementById("sketch-canvas");
const { width, height } = sketchCanvas;

// amount to move by
let moveAmount = 4;

// position of cursor
let lastX = 0;
let lastY = 0;

// right and bottom walls
let right = width - moveAmount;
let bottom = height - moveAmount;

// set the join, cap and width for lines 
const sketchContext = sketchCanvas.getContext("2d");
sketchContext.lineJoin = "miter";
sketchContext.lineCap = "square";
sketchContext.strokeStyle = "#808080";
sketchContext.fillStyle = "#707070";

// grid
const gridCanvas = document.getElementById("grid-canvas");

const gridContext = gridCanvas.getContext("2d");
gridContext.lineJoin = "miter";
gridContext.lineCap = "square";
gridContext.strokeStyle = "808080";

// cursor
const cursorCanvas = document.getElementById("cursor-canvas");

const cursorContext = cursorCanvas.getContext("2d");
cursorContext.lineJoin = "miter";
cursorContext.lineCap = "square";
cursorContext.strokeStyle = "FF0000";

const cursorImage = document.getElementById("cursor");

// draw the first sketch tile
drawSketch();
// draw the default grid
drawGrid();
// draw the cursor for the first time
drawCursor();

// display options
const toggleGridButton = document.getElementById("toggle-grid");
toggleGridButton.addEventListener("click", handleToggleGrid);
const toggleCursorButton = document.getElementById("toggle-cursor");
toggleCursorButton.addEventListener("click", handleToggleCursor);

// listen for arrow key presses
document.addEventListener("keydown", handleDraw);

// form to configure canvas
const canvasSettingsForm = document.getElementById("canvas-settings");
canvasSettingsForm.addEventListener("submit", handleResetCanvas);
