// Create a click callback function for the tiles
function tileClickHandler() {
    let tile = this;
    let color = "#000000"; //Set the default color
    document.getElementById("colorDialogID").onchange = function () {
        setTileColor(tile, document.getElementById("colorDialogID").value);
    };
    document.getElementById("colorDialogID").focus();
    document.getElementById("colorDialogID").value = "#FFCC00"; //Set the default color  NOTE: Remove the line to get the default of #000000

    document.getElementById("colorDialogID").click();

    // set color of all children of the clicked tile
    // this refers to the clicked tile
    this.querySelectorAll(".middle").forEach((element) => {
        element.style.background = document.getElementById("colorDialogID").value;
    });
    this.querySelectorAll(".top").forEach((element) => {
        element.style.borderBottomColor = document.getElementById("colorDialogID").value;
    }
    );
    this.querySelectorAll(".bottom").forEach((element) => {
        element.style.borderTopColor = document.getElementById("colorDialogID").value;
    }
    );
}

// set color of a tile 
function setTileColor(tile, color) {
    // log tile
    console.log(tile);
    console.log("setTileColor: " + color);
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

function generateTiles() {
    // Get the container element where the tiles will be appended
    const container = document.getElementById("container");

    // Clear the container element
    container.innerHTML = "";

    // Create an endless tiling of the .hex class
    for (let i = 0; i < 10; i++) {
        // Create a row element with the .hex and .row classes
        const row = document.createElement("div");
        row.classList.add("hex-row");

        // Check if the row index is even
        const isEvenRow = i % 2 === 0;

        // Add the "even" keyword to every second row
        if (isEvenRow) {
            row.classList.add("even");
        }

        // Create the hex elements for the row until width is reached


        for (let j = 0; j < 30; j++) {
            const hex = document.createElement("div");
            hex.classList.add("hex");

            // Create the top, middle, and bottom elements for the hex element
            const top = document.createElement("div");
            top.classList.add("top");
            const middle = document.createElement("div");
            middle.classList.add("middle");
            const bottom = document.createElement("div");
            bottom.classList.add("bottom");

            // Append the top, middle, and bottom elements to the hex element
            hex.appendChild(top);
            hex.appendChild(middle);
            hex.appendChild(bottom);
            // Add a click event listener to each tile
            hex.addEventListener("click", tileClickHandler);

            // Append the hex element to the row element
            row.appendChild(hex);
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
    // log
    console.log("rotateTiles");
    // Apply second orientation margins
    const tiles = document.querySelectorAll('.hex');
    tiles.forEach((tile, index) => {
        const isEvenColumn = index % 2 === 0;
        if (tile.style.marginRight == '-26px') {
            tile.style.marginRight = '0px';
            tile.style.marginLeft = '3px';
        }
        else {
            tile.style.marginLeft = '0px';
            tile.style.marginRight = '-26px';
        }
        if (tile.style.marginBottom == '-50px') {
            tile.style.marginBottom = '-26px';
        }
        else {
            tile.style.marginBottom = '-50px';
        }
    });



}
