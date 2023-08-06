const squares = document.querySelectorAll(".square");
const grids = document.querySelectorAll(".grid");
const submitButton = document.getElementById("submit");
const resetButton = document.getElementById("reset");
const perimeterElement = document.getElementById("perimeter");
const areaElement = document.getElementById("area");

let perimeter = 0;
let area = 0;

const params = new URLSearchParams(window.location.search);

const areaFromParams = Number(params.get("area"));
const perimeterFromParams = Number(params.get("perimeter"));

console.log(areaFromParams, perimeterFromParams);

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
  perimeter = 0;
  area = 0;
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
        }
        //right
        if (col < matrix.length - 1 && matrix[row][col + 1] === 1) {
          maxContribution--;
        }
        //bottom
        if (row < matrix.length - 1 && matrix[row + 1][col] === 1) {
          maxContribution--;
        }
        //left
        if (col > 0 && matrix[row][col - 1] === 1) {
          maxContribution--;
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

  if (!event.target.classList.contains("dropped")) {
    event.target.classList.add("dropped");
    draggedElement.classList.add("dropped");

    event.target.appendChild(draggedElement);
  }

  let id = +event.target.id?.split("-")[1];
  updateMatrix(id);

  // area and perimeter calculated and assign into areaElement and perimeter element
  calcAreaAndPerimeter();
  perimeterElement.innerText = perimeter;
  areaElement.innerText = area;
};

//funtion for updating perimeterElement and areaElement innerText on submit

const handleSubmit = () => {
  if (areaFromParams && perimeterFromParams) {
    if (areaFromParams === area && perimeterFromParams === perimeter) {
      console.log("Correct Answer");
    } else {
      console.log("Incorrect Answer");
    }
  } else if (areaFromParams) {
    if (areaFromParams === area) {
      console.log("Correct Answer");
    } else {
      console.log("Incorrect Answer");
    }
  } else if (perimeterFromParams) {
    if (perimeterFromParams === perimeter) {
      console.log("Correct Answer");
    } else {
      console.log("Incorrect Answer");
    }
  }
};

//funtion for reset
const handleReset = () => {
  const squares = document.querySelectorAll(".square");

  // square box append to square conatiner or set to their original position
  squares.forEach((square) => {
    square.classList.remove("dropped");
    document.getElementById("square-container").appendChild(square);
  });

  grids.forEach((grid) => {
    grid.classList.remove("dropped");
  });

  // reset matrix value to one
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      matrix[i][j] = 0;
    }
  }

  //reset result to zero
  perimeterElement.innerText = "0";
  areaElement.innerText = "0";
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
