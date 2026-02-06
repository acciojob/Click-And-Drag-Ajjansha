const container = document.getElementById("container");
const cubes = document.querySelectorAll(".cube");

let activeCube = null;
let offsetX = 0;
let offsetY = 0;

// Initialize cube positions in grid
cubes.forEach((cube, index) => {
  const col = index % 4;
  const row = Math.floor(index / 4);

  cube.style.left = `${col * 90}px`;
  cube.style.top = `${row * 90}px`;

  cube.addEventListener("mousedown", startDrag);
});

function startDrag(e) {
  activeCube = e.target;
  activeCube.style.cursor = "grabbing";

  const rect = activeCube.getBoundingClientRect();
  offsetX = e.clientX - rect.left;
  offsetY = e.clientY - rect.top;

  document.addEventListener("mousemove", drag);
  document.addEventListener("mouseup", stopDrag);
}

function drag(e) {
  if (!activeCube) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  const maxX = container.clientWidth - activeCube.offsetWidth;
  const maxY = container.clientHeight - activeCube.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeCube.style.left = `${x}px`;
  activeCube.style.top = `${y}px`;
}

function stopDrag() {
  if (!activeCube) return;

  activeCube.style.cursor = "grab";
  activeCube = null;

  document.removeEventListener("mousemove", drag);
  document.removeEventListener("mouseup", stopDrag);
}
