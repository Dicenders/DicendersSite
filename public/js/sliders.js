//slider rede social
const wrap = document.querySelector(".wrap");
const carW = document.querySelector(".wrap_car");
const firstCardWidth = carW.querySelector(".wrap_card").offsetWidth;
const arrowSelector = document.querySelectorAll(".wrap .wrap-i");

let isDragging = false, startScrollLeft;

arrowSelector.forEach(btn => {
    btn.addEventListener("click", () => {
        carW.scrollLeft += btn.id == "wrapLeft" ? -(firstCardWidth*2) : (firstCardWidth*2);
    });
});

//slider mapa
const wrapMap = document.querySelector(".wrap-map");
const carM = document.querySelector(".wrap_car-map");
const firstCardWidthMap = carM.querySelector(".wrap_card-map").offsetWidth;
const arrowSelectorMap = document.querySelectorAll(".wrap-map .wrap-i");

let MapDragging = false, startScrollLeftNap;

arrowSelectorMap.forEach(btn => {
    btn.addEventListener("click", () => {
        carM.scrollLeft += btn.id == "wrapLeft" ? -(firstCardWidthMap*2) : (firstCardWidthMap*2);
    });
});
