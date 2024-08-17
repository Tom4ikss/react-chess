import { Board } from "../models/Board"
import React, {useState, useEffect} from "react"
import CellComponent from "./CellComponent"
import { Cell } from "../models/Cell"
import { Player } from "../models/Player"

interface BoardProps {
    board: Board,
    setBoard: (board: Board) => void
    currentPlayer: Player | null
    swapPlayer: () => void
}

const BoardComponent: React.FC<BoardProps> = ({board, setBoard, currentPlayer, swapPlayer}): JSX.Element => {


    const [selectedCell, setSelectedCell] = useState<Cell|null>(null)

    const [key, setKey] = useState<number>(Math.random()) //to update board


    function selectCell(cell: Cell) {
        if(selectedCell && selectedCell !== cell && cell.available) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
            return
        }
        if(!cell.figure) {
            return
        }
        if(cell.figure.color !== currentPlayer?.color) {
            return
        }
        setSelectedCell(cell)
    }
    function highlightCells():void {
        board.highlightCells(selectedCell)
        setKey(Math.random())
    }

    useEffect(() => {
        highlightCells()
    }, [selectedCell]) //may be useCallback
    return (
        <div className="board" key = {key} >
            {board.cells.map((row, i) => 
            <React.Fragment key = {i} >
                {row.map((cell) => <CellComponent cell={cell} selectCell={selectCell} selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y ? true : false } key={cell.id}/>)}
            </React.Fragment>)}
        </div>
    )
}


export default BoardComponent