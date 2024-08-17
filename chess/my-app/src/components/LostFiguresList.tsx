import { Colors } from "../models/Colors"
import { Figure, FigureNames } from "../models/figures/Figure"
import { getFigureName } from "./getFigureName"

interface LostListElement {
    name: FigureNames,
    count: number,
    all: Figure[]
}

interface LostFiguresProps {
    color: Colors
    figures: Figure[]
}


function getList(figures: Figure[]) {

        const counter = figures.reduce((acc, figure) => {
        if (acc.hasOwnProperty(figure.name)) {
            acc[figure.name] += 1;
        } else {
            acc[figure.name] = 1;
        }
        return acc;
        }, {} as Record<FigureNames, number>)

        const res: LostListElement[] = []
        for(const key of Object.keys(counter)) {
            const figure_name = getFigureName(key) //blyat' nu ya ego vse ebal
            const el: LostListElement = {
                name: figure_name,
                count: counter[figure_name],
                all: figures.filter(figure => figure.name === key)
            }
            res.push(el)
        }
        return res
}
const LostFiguresList: React.FC<LostFiguresProps> = ({color, figures}) => {
    return <div className={["lostFigures", `${color}`].join(' ')}> 
    <h3>{color === Colors.WHITE ? "Белые" : "Черные"} фигуры: </h3>
        <div className="lostFigures-list">
        {
            getList(figures).map(el => 
                <div key={el.name}>
                    {el.name} {el.all[0].logo && <img src={el.all[0].logo} alt=""></img>} {`x${el.count}`}
                </div>
            )
        }
        </div>
    </div>
}

export default LostFiguresList