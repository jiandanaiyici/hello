let drapged = null;
let prevNode = null;

document.addEventListener('drag', function (event) {}, false);

document.addEventListener(
  'dragstart',
  function (event) {
    console.log('1 ===> dragstart');
    // store a ref. on the dragged elem
    dragged = event.target;
    // make it half transparent
    if (event.target.nodeType === 1) {
      event.target.style.opacity = 0.5;
    }
  },
  false,
);

document.addEventListener(
  'dragend',
  function (event) {
    console.log('2 ===> dragend');
    // reset the transparency
    if (event.target.nodeType === 1) {
      event.target.style.opacity = '';
    }
  },
  false,
);

/* events fired on the drop targets */
document.addEventListener(
  'dragover',
  function (event) {
    console.log('3 ===> dragover');
    // prevent default to allow drop
    event.preventDefault();
  },
  false,
);

document.addEventListener(
  'dragenter',
  function (event) {
    console.log('4 ===> dragenter');
    // highlight potential drop target when the draggable element enters it
    if (event.target.className == 'box') {
      event.target.style.background = 'purple';
    }
  },
  false,
);

document.addEventListener(
  'dragleave',
  function (event) {
    console.log('5 ===> dragleave');
    // reset background of potential drop target when the draggable element leaves it
    if (event.target.className == 'box') {
      event.target.style.background = '';
    }
  },
  false,
);

document.addEventListener(
  'drop',
  function (event) {
    console.log('6 ===> drop');
    event.preventDefault();
    if (event.target.className == 'box') {
      event.target.style.background = '';
      dragged.parentNode.removeChild(dragged);
      event.target.appendChild(dragged);
      prevNode = event.target;
      // } else if (
      //   event.target.contains(dragged) &&
      //   prevNode &&
      //   event.target !== prevNode
      // ) {
      //   prevNode.removeChild(dragged);
      // event.target.parentNode.appendChild(dragged);
    }
  },
  false,
);
