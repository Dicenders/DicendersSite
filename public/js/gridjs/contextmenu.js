/**
 * - Novo -
 *
 * Menu de Contexto
 */
var contextMenu = document.getElementById("contextMenu");
var isContextMenuVisible = false;

canvas.on("mouse:down", function (event) {
  if (event.e.button === 2) {

    var activeObject = canvas.getActiveObject();
    if (activeObject && activeObject === event.target) {
      // Verifica se o objeto clicado é o objeto ativo
      isContextMenuVisible = true;
      contextMenu.style.display = "block";
      contextMenu.style.left = event.e.clientX + "px";
      contextMenu.style.top = event.e.clientY + "px";
      if(activeObject.lock) {
        var lock = document.getElementById("lock");
        lock.firstElementChild.classList.remove("fa-unlock");
        lock.firstElementChild.classList.add("fa-lock");
      } else if(!activeObject.lock) {
        var lock = document.getElementById("lock");
        lock.firstElementChild.classList.remove("fa-lock");
        lock.firstElementChild.classList.add("fa-unlock");
      }
    }
  }
});

contextMenu.addEventListener("contextmenu", function (event) {
  event.preventDefault();
});

document.addEventListener("click", function (event) {
  if (!isContextMenuVisible) return;

  if (event.button === 0 || event.button === 2) {
    isContextMenuVisible = false;
    contextMenu.style.display = "none";
  }
});
