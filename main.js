let squares = document.querySelectorAll(".square");
let grids = document.querySelectorAll(".grid");
let resetButton = document.getElementById("reset");

function dragStart(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function dragOver(event) {
  event.preventDefault();
}

function drop(event) {
  event.preventDefault();

  let data = event.dataTransfer.getData("text");
  let draggedElement = document.getElementById(data);
  event.target.appendChild(draggedElement);
  // if (!draggedElement.parentElement) {
  //   event.target.appendChild(draggedElement);
  // }
}

function handleReset() {
  console.log("reset");
  window.location.reload();
}

squares.forEach((square) => {
  square.addEventListener("dragstart", dragStart);
});

grids.forEach((grid) => {
  grid.addEventListener("dragover", dragOver);

  grid.addEventListener("drop", drop);
});

resetButton.addEventListener("click", handleReset);
