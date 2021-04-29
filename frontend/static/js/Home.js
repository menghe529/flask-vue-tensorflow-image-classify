//========================================================================
// Drag and drop image handling
//========================================================================
var fileDrag = document.getElementById("file-drag");
var fileSelect = document.getElementById("file-upload");

// Add event listeners
fileDrag.addEventListener("dragover", fileDragHover, false);
fileDrag.addEventListener("dragleave", fileDragHover, false);
fileDrag.addEventListener("drop", fileSelectHandler, false);
fileSelect.addEventListener("change", fileSelectHandler, false);

function fileDragHover(e) {
  // prevent default behaviour
  e.preventDefault();
  e.stopPropagation();

  fileDrag.className = e.type === "dragover" ? "upload-box dragover" : "upload-box";
}

function fileSelectHandler(e) {
  // handle file selecting
  var files = e.target.files || e.dataTransfer.files;
  fileDragHover(e);
  for (var i = 0, f; (f = files[i]); i++) {
    previewFile(f);
  }
}

//========================================================================
// Web page elements for functions to use
//========================================================================

var imagePreview = document.getElementById("image-preview");
var imageDisplay = document.getElementById("image-display");
var uploadCaption = document.getElementById("upload-caption");
var predResult = document.getElementById("pred-result");
var loader = document.getElementById("loader");
var mychart = document.getElementById("mychart");

//========================================================================
// Main button events
//========================================================================

function submitImage() {
  // action for the submit button
  // console.log("submit");
  // hide(mychart);

  if (!imageDisplay.src || !imageDisplay.src.startsWith("data")) {
    window.alert("Please select an image before submit.");
    return;
  }

  loader.classList.remove("hidden");
  imageDisplay.classList.add("loading");

  // call the predict function of the backend
  predictImage(imageDisplay.src);
}

function clearImage() {
  // reset selected files
  // this.isShow = false
  // console.log(isShow)
  fileSelect.value = "";

  // remove image sources and hide them
  imagePreview.src = "";
  imageDisplay.src = "";
  predResult.innerHTML = "";
  xdata = ''

  hide(imagePreview);
  hide(imageDisplay);
  hide(loader);
  hide(predResult);
  // hide(mychart);
  show(uploadCaption);

  imageDisplay.classList.remove("loading");
}

function previewFile(file) {
  // show the preview of the image
  // console.log(file.name);
  var fileName = encodeURI(file.name);

  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
    imagePreview.src = URL.createObjectURL(file);

    show(imagePreview);
    hide(uploadCaption);

    // reset
    predResult.innerHTML = "";
    imageDisplay.classList.remove("loading");

    displayImage(reader.result, "image-display");
  };
}

//========================================================================
// Helper functions
//========================================================================

function predictImage(image) {
    // const path = 'http://localhost:5000/api/predict';
    // axios.get(path)
    //   .then(response => {
    //     this.randomNumber = response.data.randomNumber
    //   })
    //   .catch(error => {
    //     console.log(error)
    //   })

  fetch("http://localhost:5000/api/prediction", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "If-Modified-Since": "0",
      "Cache-Control": "no-store"
    },
    body: JSON.stringify(image)
  })
    .then(resp => {
      if (resp.ok)
        resp.json().then(data => {
          // console.log(data.result)
          displayResult(data);
          result = data.result;
          // console.log(result)
          // a = "a"
          // console.log(a)
          // drawEcharts();
        });
    })
    .catch(err => {
      console.log("An error occured", err.message);
      window.alert("Oops! Something went wrong.");
    });

    console.log("-----prediction-history-----")
    fetch("http://localhost:5000/api/prediction-history")
      .then(resp => {
        if (resp.ok)
          resp.json().then(data => {
            console.log(data)
            tableResult = data
          });
      })
      .catch(err => {
        console.log("An error occured", err.message);
        window.alert("Oops! Something went wrong.");
      });
}

function displayImage(image, id) {
  // display image on given id <img> element
  let display = document.getElementById(id);
  display.src = image;
  show(display);
}

function displayResult(data) {
  // display the result
  // imageDisplay.classList.remove("loading");
  hide(loader);
  predResult.innerHTML = data.result;
  show(predResult);
}

function hide(el) {
  // hide an element
  el.classList.add("hidden");
}

function show(el) {
  // show an element
  el.classList.remove("hidden");
}

// function drawEcharts(){
//   console.log("123456789")
// }

// module.exports = {
//   drawEcharts
// }