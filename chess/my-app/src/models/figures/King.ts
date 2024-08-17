import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-king.png"
import whiteLogo from "../../assets/white-king.png"

export class King extends Figure {
    
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING

        color === Colors.BLACK ? Figure.blackKing = this : Figure.whiteKing = this
    }


    public canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }
        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)

        
        if(dx <= 1 && dy <= 1) {

                const __cell = this.cell
                const __figure = target.figure
                target.figure = this // !!! (for Pawn (king cant move on cell which can be attacked but pawn can move on cell in front of it if there is no figure so u need to set a figure on it first))
                __cell.figure = null
                target.figure.cell.board.cells.forEach(el => console.log(el.filter(cell => cell !== target && cell.figure?.color !== this.color && cell.figure?.name !== FigureNames.KING && cell.figure?.canMove(target))))
                const available = !target.figure.cell.board.cells.filter(el => !!el.filter(cell => cell.figure?.color !== this.color && cell.figure?.canMove(target)).length).length
                __cell.figure = target.figure
                target.figure = __figure
                return available
        }

        return false


    }
}