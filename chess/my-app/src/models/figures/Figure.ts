import { Colors } from "../Colors";
import logo from "../../assets/black-king.png"
import { Cell } from "../Cell";
import { King } from "./King";


export type FigureLogo = typeof logo | null

export enum FigureNames {
    FIGURE = "Фигура",
    KING = "Король",
    KNIGHT = "Конь",
    PAWN = "Пешка",
    QUEEN = "Ферзь",
    ROOK = "Ладья",
    BISHOP = "Слон"
}

export abstract class Figure {
    color: Colors
    logo: FigureLogo
    cell: Cell
    name: FigureNames
    id: number
    
    static shah: Colors | null = null //dev
    static whiteKing: King
    static blackKing: King

    constructor(cell: Cell, color: Colors) {
        this.cell = cell
        this.cell.figure = this
        this.color = color
        this.name = FigureNames.FIGURE
        this.logo = null
        this.id = Math.random()
    }
    public haveLost() {} //to do

    public canMove(target: Cell): boolean {

        if(target.figure?.color === this.color) {
            return false
        }
        if(this.cell.board.Shah) if(!this.cell.board.Shah.movementModificator(this, target)) return false

        return true
    }


    public moveFigure(target: Cell) {
        console.log(["Figure", this.color,  this.name, "moved from", this.cell.x, this.cell.y, "cell to", target.x, target.y, "cell"].join(' '), target.figure ? ["killed", target.figure.color, target.figure.name].join(' ') : "")
    }
}