import { Cell } from "../models/Cell"
import { Figure, FigureNames } from "../models/figures/Figure"

interface CellProps {
    cell: Cell
    selected: boolean
    selectCell: (cell: Cell) => void
}

const CellComponent: React.FC<CellProps> = ({cell, selectCell, selected}) => {
    return(<div onClick={() => selectCell(cell)} className={["cell", `cell_${cell.color}`, selected ? "selected" : "", cell.figure && cell.available ? 'availableToAttack' : '', cell.board?.Shah?.kingCell === cell ? "shah" : ""].join(' ')}>
        {!cell.figure && cell.available && <div className="availableToMove"></div>}
        {cell.figure?.logo && <img src={cell.figure.logo} alt=""></img>} {/*как работает && */}
    </div>)
}

export default CellComponent