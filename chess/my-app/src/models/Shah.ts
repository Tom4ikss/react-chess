import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Figure, FigureNames } from "./figures/Figure";

export class Shah {
    color: Colors
    kingCell: Cell
    shahFigire: Figure
    cells: Cell[][]
    constructor(color: Colors, kingCell: Cell, figure: Figure, cells: Cell[][]) {
        this.color = color
        this.kingCell = kingCell
        this.shahFigire = figure
        this.cells = cells
    }

    public movementModificator(figure: Figure, target: Cell): boolean {
        if(figure.color !== this.color) return true
        if(target.figure === this.shahFigire) return true
        if(figure.name === FigureNames.KING) return true
        
        return false
    }
}

/*
2. Закрыть короля другой фигурой
*/