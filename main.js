let squares = document.querySelectorAll(".square");
let grids = document.querySelectorAll(".grid");
let submitButton = document.getElementById("submit");
let resetButton = document.getElementById("reset");
let perimeterElement = document.getElementById("perimeter");
let areaElement = document.getElementById("area");
let perimeter = 0;
let area = 0;

const matrix = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

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
const calcAreaAndPerimeter = () => {
  let sideCount = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[0].length; col++) {
      const square = matrix[row][col];
      if (square === 1) {
        let maxContribution = 4;
        sideCount++;
        //top
        if (row > 0 && matrix[row - 1][col] === 1) {
          maxContribution--;
          console.log(`Top : ${maxContribution}`);
        }
        //right
        if (col < matrix.length - 1 && matrix[row][col + 1] === 1) {
          maxContribution--;
          console.log(`Right : ${maxContribution}`);
        }
        //bottom
        if (row < matrix.length - 1 && matrix[row + 1][col] === 1) {
          maxContribution--;
          console.log(`Bottom : ${maxContribution}`);
        }
        //left
        if (col > 0 && matrix[row][col - 1] === 1) {
          maxContribution--;
          console.log(`Left : ${maxContribution}`);
        }
        perimeter += maxContribution;
      }
    }
  }
  area = sideCount;
};

//function to start the drag event for square box
const dragStart = (event) => {
  event.dataTransfer.setData("text", event.target.id);
};

//function to take dragged element to the target location
const dragOver = (event) => {
  event.preventDefault();
};

//function for dropping the dragged element on target location
const drop = (event) => {
  event.preventDefault();
  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);

  event.target.appendChild(draggedElement);

  let id = event.target.id?.split("-")[1];
  updateMatrix(id);
  console.log(matrix);

  calcAreaAndPerimeter();
  console.log(perimeter);
};

//funtion for updating perimeterElement and areaElement innerText on submit
const handleSubmit = () => {
  perimeterElement.innerText = perimeter;
  areaElement.innerText = area;
};

//funtion for reset
const handleReset = () => {
  const squares = document.querySelectorAll(".square");
  squares.forEach((square) => {
    document.getElementById("square-container").appendChild(square);
  });

  areaElement.innerText = "0";
  perimeterElement.innerText = "0";
};

//mapping and attaching drag eventlistener on all square boxes
squares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
});

//mapping and attaching drop eventlistener on all target grids
grids.forEach((grid) => {
  grid.addEventListener("dragover", dragOver);
  grid.addEventListener("drop", drop);
});

submitButton.addEventListener("click", handleSubmit);

resetButton.addEventListener("click", handleReset);
