// mode is for switching between tests. Default value is "visMem"
let mode = "visMem";

// Accesses the buttons on the header
let visMemButton = document.getElementById("visual-memory");
let numMemButton = document.getElementById("number-memory");

// Accesses the empty html div, where the JS generated content will be shown
let contentArea = document.getElementById("content");

// loadVisMemContent(number, dimension) : returns contents for visual memory page
// @param number {int}: integer, which corresponds to the number of tiles the user has to click for the game
// @param dimension {int}: integer, which decides the number of total tiles 
// @param accessHTML {DOM}: DOM at which JS generated content will be shown
function loadVisMemContent(number, dimension, accessHTML) {
    let content = `<div class="visMem" id="visMem">`;
    let takenNumber = [];

    // Adds dimension * dimension number of grid-child, each with unique ID
    for (let i = 0; i < dimension * dimension; i++) {
        content += `<div class="grid-item" id="grid-${i + 1}"></div>`
    }

    // Closes off the HTML div
    content += "</div>"

    // Adds the content to the accessHTML
    accessHTML.insertAdjacentHTML('beforeend', content);

    let id;

    // Changes inner HTML of random grid-child of the content
    for (let j = 0; j < number; j++) {
        while (true) {
            // random id for accessing that specific DOM
            id = Math.floor(Math.random() * dimension * dimension) + 1;

            // boolean for if the randomly generated id above is already taken
            let idIsTaken = takenNumber.some(function(item) {
                return item === id;
            })

            // if the generated id was already taken, loop again.
            if (idIsTaken) { continue; }

            // pushes the id to the takenNumber, of which array will be used to avoid duplicated IDs
            takenNumber.push(id);

            break;
        }

        // 
        let grid_child = document.getElementById(`grid-${id}`);
        console.log(id);

        grid_child.innerHTML = `${j + 1}`;
    }

}

let number = 5;
let dimension = 6;

if (mode === "visMem") {
    loadVisMemContent(number, dimension, contentArea);
}

// reload button
let reloadButton = document.getElementById("reload");

// when the reload button is clicked, it calls the anonymous function below
reloadButton.addEventListener("click", function() {
    // if the current mode is visMem, it will reload the content for visMem
    if (mode === "visMem") {
        document.getElementById("visMem").remove();
        loadVisMemContent(number, dimension, contentArea);
    }
})


visMemButton.addEventListener("click", function () {
    mode = "visMem"; // visMem stands for visual memory
})

numMemButton.addEventListener("click", function () {
    mode = "numMem"; // numMem stands for number memory
})

console.log(mode);