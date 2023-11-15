document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("grid-container");
    const height = 30;
    const width = 30;

    const grille = new Grille(height, width);
    grille.setNeighbors();

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            const cell = document.createElement("div");
            cell.classList.add("cellule");
            if (grille.matrix[i][j].isAlive()) {
                cell.classList.add("alive");
            }

            cell.addEventListener("click", () => {
                grille.setCellState(i, j, !grille.matrix[i][j].isAlive());
                cell.classList.toggle("alive");
            });

            gridContainer.appendChild(cell);
        }
    }

    setInterval(() => {
        grille.updateGrid();

        for (let i = 0; i < height; i++) {
            for (let j = 0; j < width; j++) {
                const cell = gridContainer.children[i * width + j];
                if (grille.matrix[i][j].isAlive()) {
                    cell.classList.add("alive");
                } else {
                    cell.classList.remove("alive");
                }
            }
        }
    }, 5000);
});
