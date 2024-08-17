import { Board } from "./Board"
import { Colors } from "./Colors"
import { Figure, FigureNames } from "./figures/Figure"

type CellFigure = Figure | null

export class Cell {
    readonly x: number
    readonly y: number
    readonly color: Colors
    figure: CellFigure
    board: Board
    available: boolean
    id: number

    constructor(board: Board, x:number, y:number, color: Colors, figure: CellFigure) {
        this.board = board
        this.x = x
        this.y = y
        this.color = color
        this.figure =  figure
        this.available = false
        this.id = Math.random()
    }

    public setFigure(figure: Figure) {
        this.figure = figure
        this.figure.cell = this
    }

    public isEmpty() {
        return this.figure === null
    }

    public isEmptyVertical(target: Cell): boolean {
        if(this.x !== target.x) {
            return false
        }

        const min = Math.min(target.y, this.y)
        const max = Math.max(target.y, this.y)

        for(let y = min + 1; y < max; y++) {
            if(!this.board.getCell(this.x, y).isEmpty()) { //!figure = isEmpty() //readable
                return false
            }
        }

        return true
    }


    public isEmptyHorizontal(target: Cell): boolean {
        if(this.y !== target.y) {
            return false
        }

        const min = Math.min(target.x, this.x)
        const max = Math.max(target.x, this.x)

        for(let x = min + 1; x < max; x++) {
            if(!this.board.getCell(x, this.y).isEmpty()) { //!figure = isEmpty() //readable
                return false
            }
        }

        return true
    }

    public isEmptyDiogonal(target: Cell): boolean {
        const absX = Math.abs(target.x - this.x)
        const absY = Math.abs(target.y - this.y)
        if(absX !== absY) {
            return false
        }

        const dy = this.y < target.y ? 1 : -1
        const dx = this.x < target.x ? 1 : -1
        for(let i = 1; i < absY; i++) {
            if(!this.board.getCell(this.x + dx*i, this.y + dy*i).isEmpty()) { //как работает
                return false
            }
        }

        return true
    }


    public moveFigure(target: Cell) {
        if(this.figure && target.available) {
            if(target.figure) {
                this.board.addLostFigure(target.figure)
                target.figure.cell = new Cell(this.board, -Infinity, -Infinity, this.color, target.figure)
            }
            this.figure.moveFigure(target)
            target.setFigure(this.figure)
            this.figure = null
            if(target.figure?.color) {
                const kingCell = this.board.getKing(target.figure.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE)?.cell                
                if(kingCell) {
                    this.board.shah(kingCell, target.figure)
                }
            }
            
        }
    }
}