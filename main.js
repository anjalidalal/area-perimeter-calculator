let squares = document.querySelectorAll(".square");
let grids = document.querySelectorAll(".grid");
let resetButton = document.getElementById("reset");

const matrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let perimeter = 0;

//function for updating and assigning 1 in the martix position where square box is dropped on grid
const updateMatrix = (num) => {
  let count = 1;
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      if (count < num) {
        count++;
      } else {
        matrix[i][j] = 1;
        return;
      }
    }
  }
};

//function for calculating area and perimeter once the matrix is updated
function calcAreaAndPerimeter() {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const element = array[col];
    }
  }
}

//function to start the drag event for square box
function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

//function to take dragged element to the target location
function dragOver(event) {
  event.preventDefault();
}

//function for dropping the dragged element on target location
function drop(event) {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);

  let id = event.target.id?.split("-")[1];
  event.target.appendChild(draggedElement);
  updateMatrix(id);
  console.log(matrix);
}

//funtion for reset
function handleReset() {
  grids.forEach((grid) => {
    grid.remove();
  });
}

//mapping and attaching drag eventlistener on all square boxes
squares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
});

//mapping and attaching drop eventlistener on all target grids
grids.forEach((grid) => {
  grid.addEventListener("dragover", dragOver);
  grid.addEventListener("drop", drop);
});

resetButton.addEventListener("click", handleReset);
