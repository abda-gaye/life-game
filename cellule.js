class Cellule {
    constructor() {
        this.alive = false;
        this.futureState = false;
        this.neighbors = [];
    }

    isAlive() {
        return this.alive;
    }

    setNeighbors(neighbors) {
        this.neighbors = neighbors;
    }

    calculateFutureState() {
        const livingNeighbors = this.neighbors.filter(neighbor => neighbor.isAlive()).length;

        if ((livingNeighbors !== 2 && livingNeighbors !== 3 && this.isAlive()) ||
            (livingNeighbors === 3 && !this.isAlive())) {
            this.futureState = false;
        } else {
            this.futureState = this.alive;
        }
    }

    updateState() {
        this.alive = this.futureState;
    }
}
