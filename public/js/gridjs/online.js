var dataT;

function emitAdd(obj) {
    dataT = obj;
    let fullGrid = JSON.stringify(canvas);
    socket.emit('addgrid', dataT, fullGrid);
};

socket.on('addgrid', (data, fullGrid) => {
    console.log("emitiu: ", data);
    if (data.type === 'rect') {
        canvas.add(new fabric.Rect(data));
    } else if (data.type === 'image') {
        var image = new Image();
        image.src = data.src;
        image.onload = function () {
            var img = new fabric.Image(image);
            img.set(data);
            canvas.add(img);
        };
    };
    console.log(data);
    canvas.renderAll();
});

function emitMod(obj, indexT, user) {
    dataT = obj;
    console.log("enviou :", dataT, indexT, user);
    socket.emit('modgrid', dataT, indexT, user);
};

const moving = document.getElementById('moving')

socket.on('modgrid', (data, indexR, user) => {
    var objOcoordsX;
    var objOcoordsY;
    console.log("emitiu mod: ", data.objects);
    console.log(canvas.getActiveObject());
    if(canvas.getActiveObjects()) {
        canvas.getActiveObjects().forEach(function (obj) {
            if (obj.id === data.id) {
    
                canvas.discardActiveObject();
            };
        });
    }
    if (data.type === 'activeSelection') {
        data.objects.forEach((objD, index) => {
            canvas.forEachObject(function (obj) {
                if (obj.id === objD.id) {
                    console.log("recebeu: ", data);
                    var cos = Math.cos(fabric.util.degreesToRadians(data.angle));
                    var sen = Math.sin(fabric.util.degreesToRadians(data.angle));
                    var xc = (data.left + ((data.width * data.scaleX) / 2) * cos - ((data.height * data.scaleY) / 2) * sen);
                    var yc = (data.top + ((data.width * data.scaleX) / 2) * sen + ((data.height * data.scaleY) / 2) * cos);
                    var xo = objD.left * data.scaleX;
                    var yo = objD.top * data.scaleY;
                    console.log(xc + ((xo * cos) - (yo * sen)));
                    console.log(yc + ((xo * sen) + (yo * cos)));
                    obj.set({
                        left: xc + ((xo * cos) - (yo * sen)),
                        top: yc + ((xo * sen) + (yo * cos)),
                        //left: (data.left + (objD.left * data.scaleX) + ((data.width * data.scaleX) / 2)),
                        //top: (data.top + (objD.top * data.scaleY) + ((data.height * data.scaleY) / 2)),
                        scaleX: data.scaleX * objD.scaleX,
                        scaleY: data.scaleY * objD.scaleY,
                        angle: data.angle + objD.angle,
                    });
                    canvas.moveTo(obj, indexR[index])
                    obj.setCoords()
                    objOcoordsX = obj.oCoords.bl.x;
                    objOcoordsY = obj.oCoords.mb.y;
                };
                canvas.renderAll()
            });
        });
    } else {
        canvas.forEachObject(function (obj) {
            if (obj.id === data.id) {
                console.log("recebeu: ", data);
                obj.set(data);
                canvas.moveTo(obj, indexR[index])
                obj.setCoords()
                objOcoordsX = obj.oCoords.bl.x;
                objOcoordsY = obj.oCoords.mb.y;
            };
            canvas.renderAll()
        });
    }
    moving.innerText = user;
    moving.style.left = objOcoordsX+"px";
    moving.style.top = objOcoordsY+"px";
    moving.classList.remove("d-none")
});

function emitDel(obj) {
    dataT = obj;
    let fullGrid = JSON.stringify(canvas);
    console.log("enviou :", dataT);
    socket.emit('delgrid', dataT, fullGrid);
};

socket.on('delgrid', (data) => {
    data.forEach((objD, index) => {
        canvas.forEachObject(function (obj) {
            if (obj.id === objD.id) {
                canvas.remove(obj)
            };
        });
    });
    canvas.renderAll()
});

function emitCls(obj) {
    dataT = obj;
    let fullGrid = JSON.stringify(canvas);
    console.log("enviou :", dataT);
    socket.emit('clsgrid', dataT, fullGrid);
};

socket.on('clsgrid', (data) => {
    console.log("emitiu del");
    var listItems = canvas.getObjects();
    if (listItems !== undefined) {
        var len = listItems.length;
        for (var i = 0; i < len; i++) {
          var item = listItems[i];
          if (item.type != 'infGrid') {
            canvas.remove(item);
          }
        };
      }
});

function emitModified(){
    let fullGrid = JSON.stringify(canvas);
    socket.emit('lastMod', fullGrid);
}

socket.on('lastMod', () => {
    moving.classList.add("d-none")
})