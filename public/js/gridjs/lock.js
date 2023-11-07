var lockCanvas = document.getElementById("lock");
lockCanvas.addEventListener("click", lock);

function lock() {
    var activeObject = canvas.getActiveObject();

    if(!activeObject.lock) {
        if(activeObject.type === 'activeSelection'){
        
        activeObject._objects.forEach(function(item) {
            item.selectable = false; 
            item.lockMovementX = true;
            item.lockMovementY = true;
            item.lockScalingX = true;
            item.lockScalingY = true;
            item.lockRotation = true;
            item.lockUniScaling = true;
            item.hoverCursor = 'default';
            item.lock = true
        });
        
        } else {
        
            activeObject.selectable = false;
            activeObject.lockMovementX = true;
            activeObject.lockMovementY = true;
            activeObject.lockScalingX = true;
            activeObject.lockScalingY = true;
            activeObject.lockRotation = true;
            activeObject.lockUniScaling = true;
            activeObject.hoverCursor = 'default';
            activeObject.lock = true
            
        };
        canvas.discardActiveObject().renderAll();
    } else {
        if(activeObject.type === 'activeSelection'){
        
        activeObject._objects.forEach(function(item) {
            item.selectable = true; 
            item.lockMovementX = false;
            item.lockMovementY = false;
            item.lockScalingX = false;
            item.lockScalingY = false;
            item.lockRotation = false;
            item.lockUniScaling = false;
            item.hoverCursor = null;
            item.lock = false
        });
        
        } else {
        
            activeObject.selectable = true;
            activeObject.lockMovementX = false;
            activeObject.lockMovementY = false;
            activeObject.lockScalingX = false;
            activeObject.lockScalingY = false;
            activeObject.lockRotation = false;
            activeObject.lockUniScaling = false;
            activeObject.hoverCursor = null;
            activeObject.lock = false
            
        }
    }
    emitMod(activeObject, canvas.getActiveObjects().map(obj => canvas.getObjects().indexOf(obj)))
    canvas.renderAll();
}

canvas.on('mouse:dblclick', function(options) {
    var target = options.target;
  
    if (target) {
        canvas.setActiveObject(target).renderAll();
    }
});