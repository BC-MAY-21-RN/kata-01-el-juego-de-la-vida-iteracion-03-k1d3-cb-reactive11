class Board {
    constructor(x, y) {
        this.x = x
        this.y = y
        this.table = this.initializeBoard()
    }

    initializeBoard() {
        let array1 = [];
        let array2 = [];
        for (let i = 0; i < this.y; i++) {
            for (let j = 0; j < this.x; j++) {
                let x = Math.floor(Math.random() * 2);
                array2.push(x);
            }
            array1.push(array2);
            array2 = [];
        }
        return array1
    }

    scanBoard() {
        let cellsToKill = []
        let cellsToRevive = []

        for (let i = 0; i < this.x; i++) {
            for (let j = 0; j < this.y; j++) {
                let currentCell = new Cell(i, j)
                if (this.table[i][j] == 1) {
                    let count = currentCell.getNeighbour(this.table, this.x, this.y)
                    if (count < 2 || count > 3)
                        cellsToKill.push([i, j])
                }
                else {
                    if (currentCell.getNeighbour(this.table, this.x, this.y) == 3) {
                        cellsToRevive.push([i, j])
                    }
                }
            }
        }
        return { cellsToKill, cellsToRevive }
    }

    calcNextGen() {
        let life = this.scanBoard()

        life.cellsToKill.forEach(cell => {
            const [x, y] = cell
            this.table[x][y] = 0
        })

        life.cellsToRevive.forEach(cell => {
            const [x, y] = cell
            this.table[x][y] = 1
        })
    }
}

class Cell {
    //posición de la celula
    constructor(x, y) {
        this.x = x
        this.y = y
    }

    getNeighbour(board, width, heigth) {
        let neighbours = 0
        for (let i = this.x - 1; i <= this.x + 1; i++) {
            for (let j = this.y - 1; j <= this.y + 1; j++) {
                if (i < 0) i = 0
                if (j < 0) j = 0
                if (i > width - 1) break
                if (j > heigth - 1) break

                if (board[i][j] == 1) {
                    if (i != this.x || j != this.y)
                        neighbours++
                }
            }
        }
        return neighbours
    }
}

let tabla = new Board(4, 4)
console.table(tabla.table)

tabla.calcNextGen()

console.table(tabla.table)