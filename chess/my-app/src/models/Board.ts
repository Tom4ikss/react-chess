import CellComponent from "../components/CellComponent";
import { Cell } from "./Cell";
import { Colors } from "./Colors";
import { Shah } from "./Shah";
import { Bishop } from "./figures/Bishop";
import { Figure, FigureNames } from "./figures/Figure";
import { King } from "./figures/King";
import { Knight } from "./figures/Knight";
import { Pawn } from "./figures/Pawn";
import { Queen } from "./figures/Queen";
import { Rook } from "./figures/Rook";
import { memo } from "react";

export class Board {
    readonly cells: Cell[][] = [];

    readonly lostWhiteFigures: Figure[] = []
    readonly lostBlackFigures: Figure[] = []

    public setActiveModal: (active: Colors | null, cell: Cell | null) => void
    public endGame: (color: Colors) => void
    public Shah: Shah|null = null

    constructor(setActiveModal: (active: Colors | null, cell: Cell | null) => void, endGame: (active: Colors) => void) {
        this.setActiveModal = setActiveModal
        this.endGame = endGame
    }

    public addLostFigure(figure:Figure) {
        figure.color === Colors.BLACK ? this.lostBlackFigures.push(figure) : this.lostWhiteFigures.push(figure)
    }

    public initCells(): void {
        for(let i = 0; i < 8; i++) {
            const row: Cell[] = []
            for(let j = 0; j < 8; j++) {
                if((i + j) % 2 === 0) {  //все белые ячейки находятся в клетках сумма ряда и строки которых четная, а черные наооборот
                    row.push(new Cell(this, j, i, Colors.WHITE, null)) //white
                } else {
                    row.push(new Cell(this, j, i, Colors.BLACK, null)) //black
                }
            }
            this.cells.push(row)
        }
    }


    public highlightCells(selectedCell: Cell | null) {
        for(let i = 0; i < this.cells.length; i++) {
            const row = this.cells[i]
            for(let j = 0; j < row.length; j++) {
                const target = row[j]
                target.available = !!selectedCell?.figure?.canMove(target)
            }
        }
    }

    // public shah(figure: Figure) {
    //     this.cells.forEach(cells => cells.forEach(cell => {
    //         if(cell.figure && cell.figure.color !== figure.color && cell.figure.name === FigureNames.KING && figure.canMove(cell)) {
    //             console.log("working")
    //         }
    //     }))    
    // }

    private addKings() {
        new King(this.getCell(4, 0), Colors.BLACK)
        new King(this.getCell(4, 7), Colors.WHITE)
    }

    private addQueens() {
        new Queen(this.getCell(3, 0), Colors.BLACK)
        new Queen(this.getCell(3, 7), Colors.WHITE)
    }

    private addRooks() {
        new Rook(this.getCell(0, 0), Colors.BLACK)
        new Rook(this.getCell(0, 7), Colors.WHITE)
        new Rook(this.getCell(7, 0), Colors.BLACK)
        new Rook(this.getCell(7, 7), Colors.WHITE)
    }

    private addKnights() {
        new Knight(this.getCell(1, 0), Colors.BLACK)
        new Knight(this.getCell(1, 7), Colors.WHITE)
        new Knight(this.getCell(6, 0), Colors.BLACK)
        new Knight(this.getCell(6, 7), Colors.WHITE)
    }

    private addBishops() {
        new Bishop(this.getCell(2, 0), Colors.BLACK)
        new Bishop(this.getCell(2, 7), Colors.WHITE)
        new Bishop(this.getCell(5, 0), Colors.BLACK)
        new Bishop(this.getCell(5, 7), Colors.WHITE)
    }

    private addPawns() {
        for(let i = 0; i < 8; i++) {
            new Pawn(this.getCell(i, 1), Colors.BLACK)
            new Pawn(this.getCell(i, 6), Colors.WHITE)
        }
    }

    public getCell = (x: number, y: number) => this.cells[y][x]

    public addFigures(): void {
        this.addKnights()
        this.addPawns()
        this.addBishops()
        this.addKings()
        this.addQueens()
        this.addRooks()

    }
    public getKing = (color: Colors) => (this.cells.map(row => (row.filter(cell => (cell.figure?.name === FigureNames.KING && cell.figure?.color === color)))).filter(el => (!!el.length))[0][0].figure)

    public shah(cell: Cell, figure: Figure): void {
        this.Shah = cell.figure && figure.canMove(cell) && !this.Shah ? new Shah(cell.figure.color, cell, figure, this.cells) : null
        if(this.Shah) console.warn('SHAH')
        // if(this.Shah) {
        //     const all  = this.cells.map(row => row.filter(cell => cell.figure && cell.figure.color !== figure.color))
        //     let __mate = cell.figure?.color
        //     for(let i = 0; i < this.cells.length; i++) {
        //         const row = this.cells[i]
        //         for(let j = 0; j < row.length; j++) {
        //             const target = row[j]
        //             if(!all.every(r => r.every(c => {
        //                     if(c.figure?.canMove(target)) return false
        //                     return true
        //             }))) {
        //                 __mate = undefined
        //             }
        //         }
        //     }
        //     if(__mate) {
        //         this.Mate = __mate
        //     }
        // }
    }

}


