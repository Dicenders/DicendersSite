/**
 * - Modificado -
*/
const limitBytes = 5242880
console.log(document.getElementById("uploader"));
const uploader = document.getElementById("uploader");

uploader.onchange = function (e) {
  var files = e.target.files; // Get the selected files
  var reader;

  for (var i = 0; i < files.length; i++) {
    reader = new FileReader();
    const id = Date.now().toString(16) + Math.floor(Math.random() * 9999999);
    reader.onload = function (e) {
      var image = new Image();
      image.src = e.target.result;
      const yourBase64String = image.src.substring(image.src.indexOf(',') + 1);
      const bytes = Math.ceil(((yourBase64String.length * 6) / 8));
      console.log(bytes);
      if (bytes < limitBytes) {
        image.onload = function () {
          var img = new fabric.Image(image);
          img.set({
            scaleX: ((Math.round(img.width / grid)) * grid) / img.width,
            scaleY: ((Math.round(img.height / grid)) * grid) / img.height,
            left: canvas.getVpCenter().x - (img.getScaledWidth() / 2),
            top: canvas.getVpCenter().y - (img.getScaledHeight() / 2),
            id: id,
          });
          canvas.add(img).setActiveObject(img).renderAll();
          emitAdd(img);
        }
      };
      uploader.value = '';
    };
    reader.readAsDataURL(files[i]);
  }
};