document.addEventListener("mousemove", function () {
    var e = event;
    window.ee = e
    brush.style.top = (e.clientY - canvas.getBoundingClientRect().top - brush.getBoundingClientRect().height / 2 /*- brush.getBoundingClientRect().height * 3*/) + "px";
    brush.style.left = (e.clientX - canvas.getBoundingClientRect().left - brush.getBoundingClientRect().width / 2) + "px";
})

brush.addEventListener("click", function () {
    drawOnCanvas(event);
});

dragElement(brush);

drawOnCanvas = (e) => {
    var xPos = e.clientX - canvas.getBoundingClientRect().left - parseFloat(canvas.style.borderWidth.replace("px", "")),
        yPos = e.clientY - canvas.getBoundingClientRect().top - parseFloat(canvas.style.borderWidth.replace("px", ""));

    ctx.beginPath();
    ctx.arc(xPos, yPos, brushSize, 0, 2 * Math.PI);
    ctx.fillStyle = brushColor
    ctx.fill();
}

activateEraser = (checked) => {
    console.log(checked)
    if (checked == true) {
        ctx.globalCompositeOperation="destination-out";
    } else {
        ctx.globalCompositeOperation="source-over";
    };
};

function dragElement(elem) {
    var pos1 = 0,
        pos2 = 0,
        pos3 = 0,
        pos4 = 0;
    if (brush) {
        document.getElementById("brush").onmousedown = dragMouseDown;
    } else {
        elem.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        drawOnCanvas(e)
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elem.style.top = (elem.offsetTop - pos2) + "px";
        elem.style.left = (elem.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}