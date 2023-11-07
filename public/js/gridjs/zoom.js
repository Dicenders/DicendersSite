canvas.on('mouse:wheel', function (opt) {
	var delta = opt.e.deltaY;
	var zoom = canvas.getZoom();
	zoom *= 0.999 ** delta;
	if (zoom > 10) zoom = 10;
	if (zoom < 0.2) zoom = 0.2;
	canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
	opt.e.preventDefault();
	opt.e.stopPropagation();
	fabric.Object.prototype.cornerSize = zoomCornerSize * zoom;
	fabric.Object.prototype.controls.mtr.offsetY = zoomRotating * zoom;
	canvas.renderAll();
});