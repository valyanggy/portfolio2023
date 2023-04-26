const showDraggableButton = document.getElementById('show-draggable');
const draggableElement = document.getElementById('draggable');
const toggleDraggableButton = document.getElementById('toggle-draggable');

showDraggableButton.addEventListener('click', () => {
  if (draggableElement.style.display === 'none') {
    // Calculate a random x and y position for the draggable element
    const x = Math.floor(Math.random() * window.innerWidth);
    const y = Math.floor(Math.random() * window.innerHeight);

    // Set the position of the draggable element
    draggableElement.style.left = x + 'px';
    draggableElement.style.top = y + 'px';

    // Show the draggable element
    draggableElement.style.display = 'block';
  } else {
    // Hide the draggable element
    draggableElement.style.display = 'none';
  }
  
  // Make the draggable element draggable
  makeDraggable(draggableElement);
});

toggleDraggableButton.addEventListener('click', () => {
  draggableElement.style.display = 'none';
});

function makeDraggable(element) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    element.style.top = (element.offsetTop - pos2) + "px";
    element.style.left = (element.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
