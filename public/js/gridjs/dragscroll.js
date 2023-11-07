let lastClientX;
let lastClientY;


canvas.on('mouse:down', (e) => {
    if(e.button === 2) {
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