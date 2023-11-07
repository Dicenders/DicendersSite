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

function emitMod(obj, indexT) {
    dataT = obj;
    let fullGrid = JSON.stringify(canvas);
    console.log("enviou :", dataT, indexT);
    socket.emit('modgrid', dataT, indexT, fullGrid);
};

socket.on('modgrid', (data, indexR) => {
    console.log("emitiu mod");
    canvas.forEachObject(function (obj) {
        if (obj.id === data.id) {
            console.log("recebeu: ", data);
            obj.set(data)
            canvas.moveTo(obj, indexR)
            obj.setCoords()
        };
        canvas.renderAll()
    });
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