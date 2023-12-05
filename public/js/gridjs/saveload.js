var saveCanvasJson = document.getElementById("save");
saveCanvasJson.addEventListener("click", saveCanvas);

var loadCanvasJson = document.getElementById("load");
loadCanvasJson.addEventListener("click", loadCanvas);

fabric.Object.NUM_FRACTION_DIGITS = 8;

var savedJson

fabric.Object.prototype.toObject = (function (toObject) {
  return function (propertiesToInclude) {
    return fabric.util.object.extend(toObject.call(this, propertiesToInclude), {
      isGridLine: this.isGridLine,
      selectable: this.selectable,
      evented: this.evented,
      lock: this.lock,
      hoverCursor: this.hoverCursor,
      id: this.id,
      lockMovementX: this.lockMovementX,
      lockMovementY: this.lockMovementY,
      lockScalingX: this.lockScalingX,
      lockScalingY: this.lockScalingY,
      lockRotation: this.lockRotation,
      lockUniScaling: this.lockUniScaling,
    });
  };
})(fabric.Object.prototype.toObject);


function saveCanvas() {
  savedJson = JSON.stringify(canvas);
  // Salva o estado atual do canvas em formato JSON
  // console.log(savedJson);
}

function loadCanvas(savedJson) {
  console.log(savedJson);
  // Carrega o JSON salvo na variável savedJson
  canvas.loadFromJSON(savedJson, function () {
    canvas.renderAll();
  });
}

function loadInit(gridMap) {
  console.log(gridMap);
  // Carrega o JSON salvo na variável savedJson
  canvas.loadFromJSON(gridMap, function () {
    canvas.renderAll();
  });
}