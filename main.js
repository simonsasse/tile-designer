let color = "#000000";
let colorPickerMode = false;
let rotated = true;

// Function that exports the tiles as a png image
function exportTiles() {
    // Get the container element where the tiles are
    const container = document.getElementById("container");

    // Create a new image element
    const image = new Image();

    // Set the image source to the container element
    image.src = container.toDataURL("image/png");

    // Create a new anchor element
    const anchor = document.createElement("a");

    // Set the anchor href to the image source
    anchor.href = image.src;

    // Set the anchor download to "tiles.png"
    anchor.download = "tiles.png";

    // Click the anchor element
    anchor.click();
}


// function to change local color
function pickNewColorFromColorPicker() {
    // log
    console.log("pickNewColorFromColorPicker");
    document.getElementById("colorDialogID").onchange = function () {
        color = document.getElementById("colorDialogID").value;

        // turn color of colorCircleID to the color of the clicked tile
        document.getElementById("colorCircleID").style.background = color;
    };
    document.getElementById("colorDialogID").focus();

    document.getElementById("colorDialogID").click();
    // get color from colorCircleID
    color = document.getElementById("colorCircleID").style.background;
}

// set new selected color
function changeColor(newColor) {
    // log
    console.log("changeColor: " + newColor);
    color = newColor;
    // turn color of colorCircleID to the color of the clicked tile
    document.getElementById("colorCircleID").style.background = color;
}


// turn on color picker mode
function colorPicker() {
    colorPickerMode = true;
    // change cursor 
    document.body.style.cursor = "crosshair";
}
// Create a click callback function for the tiles
function tileClickHandler() {
    if (colorPickerMode) {
        // set color of the clicked tile
        if (rotated)
            changeColor(this.querySelectorAll(".middle")[0].style.background);
        else
            changeColor(this.querySelectorAll(".middleRotated")[0].style.background);
        colorPickerMode = false;
        // change cursor
        document.body.style.cursor = "default";
        return;
    }
    // set color of all children of the clicked tile
    // this refers to the clicked tile
    this.querySelectorAll(".middle").forEach((element) => {
        element.style.background = color;
    });
    this.querySelectorAll(".top").forEach((element) => {
        element.style.borderBottomColor = color;
    }
    );
    this.querySelectorAll(".bottom").forEach((element) => {
        element.style.borderTopColor = color;
    });

    this.querySelectorAll(".middleRotated").forEach((element) => {
        element.style.background = color;
    });
    this.querySelectorAll(".left").forEach((element) => {
        element.style.borderRightColor = color;
    }
    );
    this.querySelectorAll(".right").forEach((element) => {
        element.style.borderLeftColor = color;
    });

}

// set color of a tile 
function setTileColor(tile, color) {
    // log tile
    console.log(tile);
    console.log("setTileColor: " + color);
    if (tile.classList.contains("hex-rot")) {
        tile.querySelectorAll(".middleRotated").forEach((element) => {
            element.style.background = color;
        });
        tile.querySelectorAll(".left").forEach((element) => {
            element.style.borderRightColor = color;
        }
        );
        tile.querySelectorAll(".right").forEach((element) => {
            element.style.borderLeftColor = color;
        }
        );
        return;
    }
    else {
        tile.querySelectorAll(".middle").forEach((element) => {
            element.style.background = color;
        });
        tile.querySelectorAll(".top").forEach((element) => {
            element.style.borderBottomColor = color;
        }
        );
        tile.querySelectorAll(".bottom").forEach((element) => {
            element.style.borderTopColor = color;
        }
        );
    }
}
// function to generate tiles 
// optional parameter: array of colors to set color of each tile
function generateTiles(colors = [], rotate = false) {
    // Get the container element where the tiles will be appended
    const container = document.getElementById("container");

    // Clear the container element
    container.innerHTML = "";

    // if colors is empty
    // make all tiles grey
    if (colors.length == 0) {
        colors = ["#808080"];
    }

    tileCount = 0;
    // Create an endless tiling of the .hex class
    for (let i = 0; i < 10; i++) {
        // Create a row element with the .hex and .row classes
        const row = document.createElement("div");
        row.classList.add("hex-row");

        // Check if the row index is even
        const isEvenRow = i % 2 === 0;

        // Add the "even" keyword to every second row
        if (isEvenRow && !rotate) {
            row.classList.add("even");
        }

        // Create the hex elements for the row until width is reached


        for (let j = 0; j < 30; j++) {
            tileColor = colors[tileCount % colors.length];
            const hex = document.createElement("div");
            if (rotate) {
                if (j % 2 == 0) {
                    hex.classList.add("hex-rot");
                    hex.classList.add("even");
                } else {
                    hex.classList.add("hex-rot");
                }
            } else {
                hex.classList.add("hex");
            }

            if (rotate) {
                const left = document.createElement("div");
                left.classList.add("left");
                left.style.borderRightColor = tileColor;
                const right = document.createElement("div");
                right.classList.add("right");
                right.style.borderLeftColor = tileColor;
                const middle = document.createElement("div");
                middle.classList.add("middleRotated");
                middle.style.background = tileColor;
                hex.appendChild(left);
                hex.appendChild(middle);
                hex.appendChild(right);

            } else {
                // Create the top, middle, and bottom elements for the hex element
                const top = document.createElement("div");
                top.classList.add("top");
                top.style.borderBottomColor = tileColor;
                const middle = document.createElement("div");
                middle.classList.add("middle");
                middle.style.background = tileColor;
                const bottom = document.createElement("div");
                bottom.classList.add("bottom");
                bottom.style.borderTopColor = tileColor;

                // Append the top, middle, and bottom elements to the hex element
                hex.appendChild(top);
                hex.appendChild(middle);
                hex.appendChild(bottom);
            }

            // Add a click event listener to each tile
            hex.addEventListener("click", tileClickHandler);

            // Append the hex element to the row element
            row.appendChild(hex);

            tileCount++;
            //break if window width is reached
            if (window.innerWidth <= (j + 1) * 170) {
                break;
            }

        }

        // Add the row element to the container
        container.appendChild(row);
    }
}

// rotate tiles on click
function rotateTiles() {
    // check if rotated 
    rotated = !rotated;
    // get all colors of tiles
    let colors = [];
    if (rotated) {
        // remove all tiles
        document.querySelectorAll(".middleRotated").forEach((element) => {
            colors.push(element.style.background);
        });
    } else {
        document.querySelectorAll(".middle").forEach((element) => {
            colors.push(element.style.background);
        });
    }

    // log colors
    console.log(colors);
    generateTiles(colors, !rotated);
}
