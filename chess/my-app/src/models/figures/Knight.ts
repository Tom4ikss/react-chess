import { Figure, FigureNames } from "./Figure";
import { Cell } from "../Cell";
import { Colors } from "../Colors";
import blackLogo from "../../assets/black-knight.png"
import whiteLogo from "../../assets/white-knight.png"

export class Knight extends Figure {
    constructor(cell: Cell, color: Colors) {
        super(cell, color)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KNIGHT
    }

    public canMove(target: Cell): boolean {
        if(!super.canMove(target)) {
            return false
        }

        const dx = Math.abs(this.cell.x - target.x)
        const dy = Math.abs(this.cell.y - target.y)

        return (dx === 2 && dy === 1) || (dx === 1 && dy === 2)
    }
}