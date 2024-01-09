// ASCII Art Generator using p5.js

// Define the characters used for ASCII mapping based on their visual density
const asciiCharacters = " `.'-~_;+=?7iI32yUZ%#Xg$@NQM";

let targetImage;
let imageInput;

function setup() {
  // Setup the canvas
  noCanvas();

  // Get the file input element and set up an event listener
  imageInput = document.getElementById("imageInput");
  imageInput.addEventListener("change", handleFileSelect);
}

function handleFileSelect(event) {
  // Get the selected file
  const file = event.target.files[0];
  if (file && file.type.startsWith("image/")) {
    // Load the image and process it for ASCII art
    loadImage(URL.createObjectURL(file), processImage);
  }
}

function processImage(img) {
    // Check if the image needs to be resized
    if (img.width !== 100 || img.height !== 100) {
    // Ask the user if they want to resize the image
    if (window.confirm("The image is not 100x100 pixels. Do you want to resize it?")) {
      img.resize(100, 100);
    }
    }
  
  targetImage = img;
  targetImage.loadPixels();

  // Clear previous ASCII art
  document.getElementById("asciiArt").innerHTML = "";

  // Iterate over each row of pixels in the image
  for (let rowIndex = 0; rowIndex < targetImage.height; rowIndex++) {
    let asciiRow = "";

    // Iterate over each pixel in the row
    for (let colIndex = 0; colIndex < targetImage.width; colIndex++) {
      // Calculate the index in the pixel array
      const pixelIndex = (colIndex + rowIndex * targetImage.width) * 4;
      const red = targetImage.pixels[pixelIndex + 0];
      const green = targetImage.pixels[pixelIndex + 1];
      const blue = targetImage.pixels[pixelIndex + 2];

      // Convert pixel to grayscale
      const grayscale = (red + green + blue) / 3;

      // Map the grayscale value to an ASCII character
      const asciiLength = asciiCharacters.length;
      let characterIndex = floor(map(grayscale, 255, 0, asciiLength - 1, 0));
      const asciiChar = asciiCharacters.charAt(characterIndex);

      // Append the ASCII character to the row string
      if (asciiChar == " ") {
        asciiRow += "&nbsp";
      } else {
        asciiRow += asciiChar;
      }
    }
    createDiv(asciiRow).parent("asciiArt"); // Create a new div for each row of ASCII characters
  }
}
