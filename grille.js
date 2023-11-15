class Grille {
    constructor(height, width) {
        this.height = height;
        this.width = width;
        this.matrix = this.createMatrix();
        this.initializeGrid();
    }

    createMatrix() {
        return Array.from({ length: this.height }, () =>
            Array.from({ length: this.width }, () => new Cellule())
        );
    }

    initializeGrid() {
        this.gridContainer = document.getElementById("grid-container");
        this.gridContainer.style.gridTemplateColumns = `repeat(${this.width}, 20px)`;
        this.gridContainer.style.gridTemplateRows = `repeat(${this.height}, 20px)`;

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cellule");
                cell.addEventListener("click", () => this.toggleCellState(i, j));
                this.gridContainer.appendChild(cell);
            }
        }
    }

    toggleCellState(row, col) {
        if (this.isInsideGrid(row, col)) {
            const cell = this.matrix[row][col];
            cell.alive = !cell.alive;
            const cellElement = this.gridContainer.children[row * this.width + col];
            cellElement.classList.toggle("alive", cell.alive);
        }
    }

    setNeighbors() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.matrix[i][j];
                const neighbors = [];

                for (let ni = i - 1; ni <= i + 1; ni++) {
                    for (let nj = j - 1; nj <= j + 1; nj++) {
                        if (this.isInsideGrid(ni, nj) && !(ni === i && nj === j)) {
                            neighbors.push(this.matrix[ni][nj]);
                        }
                    }
                }

                cell.setNeighbors(neighbors);
            }
        }
    }

    isInsideGrid(row, col) {
        return row >= 0 && row < this.height && col >= 0 && col < this.width;
    }

    updateGrid() {
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.matrix[i][j];
                cell.calculateFutureState();
            }
        }

        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                const cell = this.matrix[i][j];
                cell.updateState();
                const cellElement = this.gridContainer.children[i * this.width + j];
                cellElement.classList.toggle("alive", cell.isAlive());
            }
        }
    }

    toString() {
        let result = "";
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                result += this.matrix[i][j].isAlive() ? "X" : "-";
            }
            result += "\n";
        }
        return result;
    }
}
