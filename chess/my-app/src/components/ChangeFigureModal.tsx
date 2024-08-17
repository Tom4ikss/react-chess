import { Colors } from "../models/Colors"
import { Figure, FigureNames } from "../models/figures/Figure"
import { Cell } from "../models/Cell"
import { Board } from "../models/Board"

interface ChangeFigureModalProps {
    board: Board,
    color: Colors,
    active: boolean,
    cell: Cell | null //cell only
}

const ChangeFigureModal: React.FC<ChangeFigureModalProps> = ({ board, color, active, cell}) => {

    

    function changeFigure(figure: Figure) {
        if(cell && active) { //cant be active without cell and cell.figure
            const arrayName = `lost${color[0].toUpperCase()}${color.slice(1)}Figures`
            //@ts-ignore
            const figureIndex = board[arrayName].findIndex(f => f.name === figure.name ? f : false)
            //@ts-ignore
            board[arrayName].splice(figureIndex, figureIndex, cell.figure)
            console.log(["Figure", color, FigureNames.PAWN, "was changed on", color,  figure.name].join(' '))
            cell.figure = null
            figure.moveFigure(cell)
            cell.setFigure(figure)
            

        }
        board.setActiveModal(null, null)
    }

    function sortLostFigures(figures: Figure[]) {
        const figureNames: string[] = []
        
        return figures.filter(figure => {
            if(figure.name === FigureNames.PAWN) {
                return false
            }
            if(figureNames.indexOf(figure.name) !== -1) {
                return false
            }
            figureNames.push(figure.name)
            return figure
        })

    }

    const figuresToChange = sortLostFigures(color === Colors.WHITE ? board.lostWhiteFigures : board.lostBlackFigures)

    if(figuresToChange.length === 0) {board.setActiveModal(null, null)} //dev


    return <div className={["modal", active ? "modal_active" : "modal_hidden"].join(' ')}>
        <div className={["modal__content", color].join(' ')}>
            {figuresToChange.map(figure => 
                 <div key={figure.id}>
                    <ul className="modal__list">
                        <li onClick={() => changeFigure(figure)} className="">{figure.logo && <img src={figure.logo} alt=""></img>}</li>
                        <li className="">{figure.name} </li>
                    </ul>

                
                </div>
            )}
        </div>
    </div>
}

export default ChangeFigureModal