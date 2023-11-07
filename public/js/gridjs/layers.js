/**
 * Manda o objeto para trás.
 */
 function sendToBack(object) {
  canvas.sendBackwards(object, true);
  canvas.renderAll();
}

/**
 * Manda o objeto para frente.
 */
function bringToFront(object) {
  canvas.bringForward(object, true);
  canvas.renderAll();
}

document.getElementById("sendToBackButton").addEventListener("click", function() {
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    sendToBack(activeObject);
  }
});

document.getElementById("bringToFrontButton").addEventListener("click", function() {
  var activeObject = canvas.getActiveObject();
  if (activeObject) {
    bringToFront(activeObject);
  }
});