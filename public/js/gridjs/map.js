document.getElementById("map").onchange = function (e) {
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
                    scaleX: canvasWidth / img.width,
                    scaleY: canvasHeight / img.height,
                });

                canvas.add(img).setActiveObject(img).renderAll();
                img.moveTo(0);
                lock(img)
            };
        };
        reader.readAsDataURL(files[i]);
    }
};

