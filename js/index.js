urlToBase64Url = (url) => {
    return new Promise((resolve, reject) => {
        fetch("https://cors-anywhere.herokuapp.com/" + url)
            .then(res => {
                return res.blob()
            })
            .then(blob => {
                blobToDataURL(blob, function (dataUrl) {
                    resolve(dataUrl)
                });
            })
    });
}

downloadImage = () => {
    document.getElementById("downloadA").setAttribute("href", canvas.toDataURL());
    document.getElementById("downloadA").click();
}

blobToDataURL = (blob, callback) => {
    var fr = new FileReader();
    fr.onload = function (e) {
        callback(e.target.result);
    }
    fr.readAsDataURL(blob);
}

changeBrushSize = (val) => {
    brushSize = parseFloat(val);
    brush.style.width = val * 2 + "px";
    brush.style.height = val * 2 + "px";
}

updateImage = () => {
    if (confirm("Are you sure you want to erase your current drawing without downloading?")) {
        let files = document.getElementById("fileInput").files
        let image = files[0];
        document.getElementById("downloadA").setAttribute("download", image.name.replace(".png", "").replace(".jpeg", "").replace(".jpg", "").replace("svg", "") + "_Modified")

        blobToDataURL(image, function (dataUrl) {
            img.src = dataUrl;
            img.onload = function () {
                canvas.setAttribute("height", img.height)
                canvas.setAttribute("width", img.width)
                document.getElementById("canvasDiv").style = `height: ${img.height + 6}px; width: ${img.width + 6}px;`
                document.getElementById("xVal").innerHTML = img.width;
                document.getElementById("yVal").innerHTML = img.height;
                ctx.drawImage(img, 0, 0);
            }
        });
    }
}

clearCanvas = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.getElementById("fileInput").addEventListener('change', function () {
    updateImage();
}, false);

var searchParams = new URL(document.URL).searchParams,
    urlParam = searchParams.get("url"),
    imgUrl;


(async function () {
    try {
        urlParam = urlParam.toLowerCase()
        if (urlParam.slice(0, 5) == "blob:") {
            let blob = await fetch(imgUrl).then(r => r.blob());
            blobToDataURL(blob, function (dataUrl) {
                imgUrl = dataUrl;
            });
        } else if (urlParam.slice(0, 5) == "data:") {
            imgUrl = urlParam;
        } else if (urlParam.slice(0, 4) == "http") {
            urlToBase64Url(urlParam).then(dataUrl => {
                imgUrl = dataUrl
                img.src = imgUrl
                img.onload = function () {
                    canvas.setAttribute("height", img.height)
                    canvas.setAttribute("width", img.width)
                    document.getElementById("canvasDiv").style = `height: ${img.height + 6}px; width: ${img.width + 6}px;`
                    document.getElementById("xVal").innerHTML = img.width;
                    document.getElementById("yVal").innerHTML = img.height;
                    ctx.drawImage(img, 0, 0);
                }
            });
        } else if (urlParam == "youtube") {
            imgUrl = "/img/youtube.png";
        } else {
            imgUrl = "about:blank";
        }
    } catch (err) {
        imgUrl = "about:blank"
    }
})()

var brush = document.getElementById("brush"),
    canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d"),
    img = new Image(),
    brushColor = "#000000",
    brushSize = 25;
img.src = imgUrl
img.onload = function () {
    canvas.setAttribute("height", img.height)
    canvas.setAttribute("width", img.width)
    document.getElementById("canvasDiv").style = `height: ${img.height + 6}px; width: ${img.width + 6}px;`
    document.getElementById("xVal").innerHTML = img.width;
    document.getElementById("yVal").innerHTML = img.height;
    ctx.drawImage(img, 0, 0);
}

resetCanvas = () => {
    if (confirm('Are you sure you want to erase your current drawing without downloading?')) {
        var sizeStr = prompt("Canvas Size EX: 1280 x 720 (width px x height px)").split("px").join("")
        var x = parseInt(sizeStr.split("x")[0])
        var y = parseInt(sizeStr.split("x")[1])
        canvas.setAttribute("height", y)
        canvas.setAttribute("width", x)
        document.getElementById("canvasDiv").style = `height: ${y + 6}px; width: ${x + 6}px;`
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.getElementById("xVal").innerHTML = x;
        document.getElementById("yVal").innerHTML = y;
        document.getElementById("downloadA").setAttribute("download", "Untitled")
    }
}