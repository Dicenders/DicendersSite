var canvas = new fabric.Canvas("grid", {
  fireRightClick: true, // <-- enable firing of right click events
  fireMiddleClick: true, // <-- enable firing of middle click events
  stopContextMenu: true, // <--  prevent context menu from showing
  preserveObjectStacking: true,
});
var grid = 50;
var unitScale = 50;
var snap = 10;

canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight);
canvas.backgroundColor = 'rgb(7, 9, 39)';

window.addEventListener("resize", function() {
  canvas.setWidth(window.innerWidth);
  canvas.setHeight(window.innerHeight);
});

/**
 * - Modificado -
 */
console.log("grid:", grid);

var gridColor = '#F0D2FCa1'

// Criar linhas horizontais
fabric.InfGrid = fabric.util.createClass(fabric.Object, {
  type: 'infGrid',
  width: window.innerWidth,
  height: window.innerHeight,
  stroke: gridColor,
  selectable: false,
  evented: false,
  id: 0,
  
  initialize: function () {
    
  },
  
  render: function (ctx) {
    let XLeft = canvas.vptCoords.tl.x;
    let XRight = canvas.vptCoords.br.x;
    let YTop = canvas.vptCoords.tl.y;
    let YBottom = canvas.vptCoords.br.y;
    let XMin = Math.ceil((XLeft / grid) - 1);
    let XMax = Math.floor((XRight / grid) + 1);
    let YMin = Math.ceil((YTop / grid) - 1);
    let YMax = Math.floor((YBottom / grid) + 1);

    this.width = canvas.width / canvas.getZoom();
    this.height = canvas.height / canvas.getZoom();
    this.left = canvas.vptCoords.tl.x;
    this.top = canvas.vptCoords.tl.y;
    
    ctx.strokeStyle = gridColor;
    ctx.lineWidth = 1;
    
    // draw vectical lines
      for (let i = XMin; i <= XMax; i++) {
        let x = i * grid;
        ctx.moveTo(x, YTop);
        ctx.lineTo(x, YBottom);
        }
    
      // draw horizontal lines
      for (let i = YMin; i <= YMax; i++) {
        let y = i * grid;
        ctx.moveTo(XLeft, y);
        ctx.lineTo(XRight, y);
      }
    
      ctx.stroke();
  }
});

var bg = new fabric.InfGrid();

canvas.add(bg);

fabric.InfGrid.fromObject = function(object, callback) {
  return fabric.Object._fromObject('InfGrid', object, callback);
};

// snap to grid
canvas.on("object:moving", function (options) {
  if (
    (Math.abs(options.target.left) % 50 <= 10 || Math.abs(options.target.left) % 50 >= 40) &&
    (Math.abs(options.target.top) % 50 <= 10 || Math.abs(options.target.top) % 50 >= 40)
  ) {
    options.target.set({
      left: Math.round(options.target.left / 50) * 50,
      top: Math.round(options.target.top / 50) * 50,
    });
  } else if (
    Math.abs(options.target.left) % 50 <= 35 &&
    Math.abs(options.target.left) % 50 >= 15 &&
    Math.abs(options.target.top) % 50 <= 35 &&
    Math.abs(options.target.top) % 50 >= 15
  ) {
    options.target.set({
      left: Math.round((options.target.left - 25) / 50) * 50 + 25,
      top: Math.round((options.target.top - 25) / 50) * 50 + 25,
    });
  }
  console.log(options.target.selected);
  emitMod(canvas.getActiveObject(), canvas.getActiveObjects().map(obj => canvas.getObjects().indexOf(obj)), usertag);
});

/**
 * - Modificado -
 */
canvas.on("object:scaling", function (options) {
  var oldTop = options.transform.original.top;
  var oldLeft = options.transform.original.left;
  var oldWidth = options.target.width;
  var oldHeight = options.target.height;
  var newWidth = (Math.round(options.target.getScaledWidth() / grid)) * grid;
  var newHeight = (Math.round(options.target.getScaledHeight() / grid)) * grid;

  options.target.set({
    left: oldLeft - Math.round((oldLeft - options.target.left) / grid) * grid,
    top: oldTop - Math.round((oldTop - options.target.top) / grid) * grid,
    scaleX: newWidth / oldWidth,
    scaleY: newHeight / oldHeight,
  });
  emitMod(canvas.getActiveObject(), canvas.getActiveObjects().map(obj => canvas.getObjects().indexOf(obj)));
});

canvas.on("object:rotating", function (options) {
  if (options.target.angle % 45 <= 10 || options.target.angle % 45 >= 35) {
    options.target.rotate(Math.round(options.target.angle / 45) * 45);
  }
  emitMod(canvas.getActiveObject(), canvas.getActiveObjects().map(obj => canvas.getObjects().indexOf(obj)));
});

canvas.on("object:modified", function (options) {
  emitModified();
});

/**
 * - Modificado -
 * Adds a rectangle object to a canvas using the Fabric.js library.
 * The rectangle is created with specific properties such as position, size, color, and ID.
 *
 * @param {Event} event - The event object that triggers the function.
 */
function addObjectCanvas(event) {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const fill = "rgb(" + red + ", " + green + ", " + blue + ")";
  const id = Date.now().toString(16) + Math.floor(Math.random() * 9999999);

  const rectangle = new fabric.Rect({
    width: grid,
    height: grid,
    left: canvas.getVpCenter().x - (grid / 2),
    top: canvas.getVpCenter().y - (grid / 2),
    type: "rect",
    strokeWidth: 0,
    fill: fill,
    hasControls: true,
    centeredRotation: true,
    padding: 0,
    id: id,
  });
  canvas.add(rectangle);
  emitAdd(rectangle)
}



/**
 * - Modificado -
 */
function deleteList(listItems) {
  if (listItems !== undefined) {
    var len = listItems.length;
    var removedObjects = [];
    for (var i = 0; i < len; i++) {
      var item = listItems[i];
      if (item.type != 'infGrid') {
        canvas.remove(item);
        removedObjects.push(item);
      }
    };
    emitCls(removedObjects)
  }
}

function deleteAllObjects(event) {
  var objects = canvas.getObjects();
  deleteList(objects);
}

var index = 0,
  duration = 500,
  time;

/**
 * - Novo -
 *
 * Adiciona event listeners para excluir objetos na tela.
 *
 * O trecho de código adiciona event listeners ao documento para o evento de pressionamento de tecla "Delete" e o evento de clique no botão Delete.
 * Quando acionado, remove os objetos selecionados na tela e atualiza a renderização.
 *
 * @example
 * // EventListener para o evento de pressionamento de tecla "Delete"
 * document.addEventListener("keydown", function(event) {
 *     if (event.key === "Delete") {
 *         canvas.remove(...canvas.getActiveObjects());
 *         canvas.discardActiveObject().renderAll();
 *     }
 * });
 *
 * // EventListener para o evento de clique no botão Delete
 * var deleteButton = document.getElementById('deleteob');
 * deleteButton.addEventListener('click', function() {
 *     canvas.remove(...canvas.getActiveObjects());
 *     canvas.discardActiveObject().renderAll();
 * });
 */
document.addEventListener("keydown", function (event) {
  if (event.key === "Delete") {
    var delObject = canvas.getActiveObjects()
    canvas.remove(...delObject);
    emitDel(delObject)
    canvas.discardActiveObject().renderAll();
  }
});

var deleteButton = document.getElementById("deleteob");
deleteButton.addEventListener("click", function () {
  var delObject = canvas.getActiveObjects()
  canvas.remove(...delObject);
  emitDel(delObject)
  canvas.discardActiveObject().renderAll();
});





var addObject = document.getElementById("addnew");
addObject.addEventListener("click", addObjectCanvas);

var deleteObjects = document.getElementById("delete");
deleteObjects.addEventListener("click", deleteAllObjects);