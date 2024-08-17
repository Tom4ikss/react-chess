import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-pawn.png"
import whiteLogo from "../../assets/white-pawn.png"

type direction = -1 | 1

export class Pawn extends Figure {

    isFirstStep: boolean = true
    direction: direction

    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.PAWN
        this.direction = this.cell.figure?.color === Colors.WHITE ? -1 : 1
    }

    private changeFigure(target: Cell) {
        this.cell.board.setActiveModal(this.color, target)
    }

    public moveFigure(target: Cell) {
        super.moveFigure(target)
        this.isFirstStep = false
        if(target.y === 3.5 + this.direction * 3.5) {
            this.changeFigure(target)
        }
    }


    public canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }

        const firstStepDirection = this.direction * 2

        if((target.y === this.cell.y + this.direction) && this.cell.x === target.x && this.cell.board.getCell(target.x, target.y).isEmpty()) {
            return true
        }

        if(this.isFirstStep && target.y === this.cell.y + firstStepDirection && this.cell.x === target.x) {
            for(let i = this.cell.y+this.direction; i !== target.y + this.direction; i += this.direction) {
                if(!this.cell.board.getCell(this.cell.x, i).isEmpty() || target.figure) {
                    return false
                }
            }
            return true
        }

        if(Math.abs(target.x - this.cell.x) === 1 && target.y === this.cell.y + this.direction && target.figure && target.figure.color !== this.color) {
            return true
        }
        return false
    }
}