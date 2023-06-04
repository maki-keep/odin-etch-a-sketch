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

const getArrowIndex = function(event) {
  return controls.items.findIndex(item => item.keyCode === event.keyCode);
};

const canvas = document.getElementById("canvas");
const { width, height } = canvas;

// set the join, cap and width for lines 
const ctx = canvas.getContext("2d");
ctx.lineJoin = "miter";
ctx.lineCap = "square";

ctx.strokeStyle = "#808080";
ctx.fillStyle = "#707070";

// object to keep track of when keys are pressed
/* let keysPressed = {}; */

// amount to move by
let moveAmount = 2;

let lastX = 0;
let lastY = 0;

// position of right wall
let right = 298;
// position of bottom wall
let bottom = 148;

document.addEventListener("keydown", (event) => {
  // prevent normal arrow functionality
  event.preventDefault();
  const index = getArrowIndex(event);

  // left
  if (index === 0) {
    console.log("left");
    if (lastX > 0) {
      lastX -= moveAmount;
    }
  }
  // up
  else if (index === 1) {
    console.log("up");
    if (lastY > 0) {
      lastY -= moveAmount;
    }
  }
  // right
  else if (index === 2) {
    console.log("right");
    if (lastX < right) {
      lastX += moveAmount;
    }
  }
  // down
  else if (index === 3) {
    console.log("down");
    if (lastY < bottom) {
      lastY += moveAmount;
    }
  }

  // any arrow key
  if (index !== -1) {
    // start the path with old x, y
    ctx.beginPath();
    // set new coordinates based on movement amount
    ctx.moveTo(lastX, lastY);
    // draw the path
    ctx.fillRect(lastX, lastY, moveAmount, moveAmount);
  }

  console.log(lastX, lastY);

  // keep track of keys pressed
  /* keysPressed[event.key] = true;
  console.log(keysPressed); */
});
