let squares = document.querySelectorAll(".square");
let grids = document.querySelectorAll(".grid");
let resetButton = document.getElementById(reset);

function dragStart(event) {
  console.log("....dragging");

  event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event) {
  console.log("...drag over");
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();
  console.log("...drop");

  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);
  event.target.appendChild(draggedElement);
  // if (!draggedElement.parentElement) {
  //   event.target.appendChild(draggedElement);
  // }
}

function handleReset() {
  squares.forEach((square) => {
    square.remove();
  });
}

squares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
});

grids.forEach((grid) => {
  grid.addEventListener("dragover", dragOver);

  grid.addEventListener("drop", drop);
});

resetButton.addEventListener("click", handleReset);
