var lineWID = document.getElementById("lineW");
lineWID.addEventListener("click", whiteGrid);

var lineBID = document.getElementById("lineB");
lineBID.addEventListener("click", blackGrid);

var linePID = document.getElementById("lineP");
linePID.addEventListener("click", purpleGrid);

function whiteGrid() {
    gridColor = '#F0D2FCa1';
    canvas.renderAll();
};

function blackGrid() {
    gridColor = '#000A1';
    canvas.renderAll();
};

function purpleGrid() {
    gridColor = '#9F2CBFA1';
    canvas.renderAll();
}