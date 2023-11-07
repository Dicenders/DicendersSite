heightgrid = 100;
widthgrid = 100;

var canvas = new fabric.Canvas("map", {
  fireRightClick: true, // <-- enable firing of right click events
  fireMiddleClick: true, // <-- enable firing of middle click events
  stopContextMenu: true, // <--  prevent context menu from showing
  preserveObjectStacking: true,
});
var grid = 50;
var unitScale = 50;
var canvasWidth = widthgrid * unitScale;
var canvasHeight = heightgrid * unitScale;
var snap = 10;

canvas.setWidth(750);
canvas.setHeight(400);
canvas.backgroundColor = 'rgb(7,9,39)';

window.addEventListener("resize", function() {
  canvas.setWidth(750);
  canvas.setHeight(400);
});

/**
 * - Modificado -
*/
console.log("canvasWidth:", canvasWidth);
console.log("canvasHeight:", canvasHeight);
console.log("grid:", grid);

/**
 * Create a grid on the canvas.
 * @param canvas - The fabric.js canvas object.
 * @param grid - The size of each grid unit.
 * @param canvasWidth - The width of the canvas.
 * @param canvasHeight - The height of the canvas.
 */

var gridlines = heightgrid + widthgrid + 2;
// Criar linhas horizontais
for (var i = 0; i <= canvasHeight / grid; i++) {
  canvas.add(new fabric.Line([0, i * grid, canvasWidth, i * grid], {
    type: "line",
    stroke: "#c04bf235",
    originX: "center",
    originY: "center",
    evented: false,
    selectable: false,
    isGridLine: true,
  }));
}

// Criar linhas verticais
for (var i = 0; i <= canvasWidth / grid; i++) {
  canvas.add(new fabric.Line([i * grid, 0, i * grid, canvasHeight], {
    type: "line",
    stroke: "#c04bf235",
    originX: "center",
    originY: "center",
    evented: false,
    selectable: false,
    isGridLine: true,
  }));
}
console.log(gridlines)


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
    });
    
/**
 * - Modificado -
*/
var mapWidth
var mapHeight

canvas.on("object:scaling", function (options) {
  var oldWidth = options.target.width;
  var oldHeight = options.target.height;
  var newWidth = (Math.round(options.target.getScaledWidth() / grid)) * grid;
  var newHeight = (Math.round(options.target.getScaledHeight() / grid)) * grid;

  mapWidth = Math.round(options.target.getScaledWidth() / grid)
  mapHeight = Math.round(options.target.getScaledHeight() / grid)

  console.log(mapWidth, mapHeight)
  document.getElementById("numHeight").value = mapHeight;
  document.getElementById("numWidth").value = mapWidth;
  
  options.target.set({
    scaleX: newWidth / oldWidth,
    scaleY: newHeight / oldHeight,
  });
});

/**
 * - Modificado -
 * Adds a rectangle object to a canvas using the Fabric.js library.
 * The rectangle is created with specific properties such as position, size, color, and ID.
*
* @param {Event} event - The event object that triggers the function.
*/
function addObjectCanvas(event) {
  const min = 99;
  const max = 9999999;
  
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  const id = new Date().getTime() + random;
  
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);
  const fill = "rgb(" + red + ", " + green + ", " + blue + ")";
  
  const rectangle = new fabric.Rect({
    left: 75,
    top: 75,
    width: 50,
    height: 50,
    type: "rect",
    fill: fill,
    stroke: "",
    originX: "center",
    originY: "center",
    id: id,
    hasControls: true,
    centeredRotation: true,
  });
  
  canvas.add(rectangle);
}



/**
 * - Modificado -
*/
function deleteList(listItems) {
  if (listItems !== undefined) {
    var len = listItems.length;
    for (var i = 0; i < len; i++) {
      var item = listItems[i];
      if (!item.isGridLine) {
        // Exclude grid lines
        canvas.remove(item);
      }
    }
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
     canvas.remove(...canvas.getActiveObjects());
    canvas.discardActiveObject().renderAll();
  }
});


canvas.setZoom(0.2);

canvas.on('mouse:wheel', function(opt) {
  var delta = opt.e.deltaY;
  var zoom = canvas.getZoom();
  zoom *= 0.999 ** delta;
  if (zoom > 10) zoom = 10;
  if (zoom < 0.2) zoom = 0.2;
  canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
  opt.e.preventDefault();
  opt.e.stopPropagation();
  canvas.renderAll();
});

const STATE_IDLE = 'idle';
const STATE_PANNING = 'panning';
fabric.Canvas.prototype.toggleDragMode = function(dragMode) {
  // Remember the previous X and Y coordinates for delta calculations
  let lastClientX;
  let lastClientY;
  // Keep track of the state
  let state = STATE_IDLE;
  // We're entering dragmode
  if (dragMode) {
    // Discard any active object
    this.discardActiveObject();
    // Set the cursor to 'move'
    this.defaultCursor = 'move';
    // Loop over all objects and disable events / selectable. We remember its value in a temp variable stored on each object
    this.forEachObject(function(object) {
      object.prevEvented = object.evented;
      object.prevSelectable = object.selectable;
      object.evented = false;
      object.selectable = false;
    });
    // Remove selection ability on the canvas
    this.selection = false;
    // When MouseUp fires, we set the state to idle
    this.on('mouse:up', function(e) {
      state = STATE_IDLE;
    });
    // When MouseDown fires, we set the state to panning
    this.on('mouse:down', (e) => {
      state = STATE_PANNING;
      lastClientX = e.e.clientX;
      lastClientY = e.e.clientY;
    });
    // When the mouse moves, and we're panning (mouse down), we continue
    this.on('mouse:move', (e) => {
      if (state === STATE_PANNING && e && e.e) {
        // let delta = new fabric.Point(e.e.movementX, e.e.movementY); // No Safari support for movementX and movementY
        // For cross-browser compatibility, I had to manually keep track of the delta

        // Calculate deltas
        let deltaX = 0;
        let deltaY = 0;
        if (lastClientX) {
          deltaX = e.e.clientX - lastClientX;
        }
        if (lastClientY) {
          deltaY = e.e.clientY - lastClientY;
        }
        // Update the last X and Y values
        lastClientX = e.e.clientX;
        lastClientY = e.e.clientY;

        let delta = new fabric.Point(deltaX, deltaY);
        this.relativePan(delta);
      }
    });
  } else {
    // When we exit dragmode, we restore the previous values on all objects
    this.forEachObject(function(object) {
      object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
      object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
    });
    // Reset the cursor
    this.defaultCursor = 'default';
    // Remove the event listeners
    this.off('mouse:move');
    // Restore selection ability on the canvas
    this.selection = true;
  }
};

// Create the canvas

// Handle dragmode change

let dragMode = false;
document.getElementById('dragmode').addEventListener('change', () => {
  dragMode = !dragMode;
  canvas.toggleDragMode(dragMode);
});

let lastClientX;
let lastClientY;


canvas.on('mouse:down', (e) => {
    if(e.button === 2) {
        e.e.preventDefault();
        canvas.discardActiveObject();
        canvas.defaultCursor = 'move';
        canvas.forEachObject(function(object) {
            object.prevEvented = object.evented;
            object.prevSelectable = object.selectable;
            object.evented = false;
            object.selectable = false;
        });
        canvas.selection = false;
        lastClientX = e.e.clientX;
        lastClientY = e.e.clientY;
        canvas.on('mouse:move', (e) => {

                let deltaX = 0;
                let deltaY = 0;
                if (lastClientX) {
                  deltaX = e.e.clientX - lastClientX;
                }
                if (lastClientY) {
                  deltaY = e.e.clientY - lastClientY;
                }
                // Update the last X and Y values
                lastClientX = e.e.clientX;
                lastClientY = e.e.clientY;
                
                let delta = new fabric.Point(deltaX, deltaY);
                canvas.relativePan(delta);       
        });
    }
});
canvas.on('mouse:up', (e) => {
    if(e.button === 2) {
        canvas.forEachObject(function(object) {
            object.evented = (object.prevEvented !== undefined) ? object.prevEvented : object.evented;
            object.selectable = (object.prevSelectable !== undefined) ? object.prevSelectable : object.selectable;
          });
          // Reset the cursor
          canvas.defaultCursor = 'default';
          // Remove the event listeners
          canvas.off('mouse:move');
          // Restore selection ability on the canvas
          canvas.selection = true;
    }
});

document.getElementById("visual").onchange = function (e) {
  var files = e.target.files; // Get the selected files
  var reader;

  for (var i = 0; i < files.length; i++) {
      reader = new FileReader();
      reader.onload = function (e) {
          var image = new Image();
          image.src = e.target.result;
          image.onload = function () {
              var img = new fabric.Image(image);
              img.set({
                  left: 0,
                  top: 0,
              });

              canvas.add(img).setActiveObject(img).renderAll();
              img.moveTo(0);
          };
      };
      reader.readAsDataURL(files[i]);
  }
};

