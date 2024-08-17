import { Colors } from "../models/Colors"
import { Player } from "../models/Player"
import { useState, useEffect, useRef } from "react"

interface TImerProps {
    currentPlayer: Player | null,
    restartGame: () => void,
    endGame: (color: Colors) => void
}

const Timer: React.FC<TImerProps> = ({currentPlayer, restartGame, endGame}) => {

    const [time, setTimer] = useState<number>(300)
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    function restart() {
        console.clear()
        restartGame()
    }

    useEffect(() => {
        if(time === 0 && currentPlayer) {
            setTimer(300)
            endGame(currentPlayer.color === Colors.WHITE ? Colors.BLACK : Colors.WHITE)
        }
    }, [time]) //dev
  
    function decrementTimer() {
        setTimer(prev => prev - 1)
    }

    function startTimer() {
        if(timer.current) {
            clearInterval(timer.current)
        }

        setTimer(300)

        timer.current = setInterval(() => {
            decrementTimer()
        }, 1000)
    }

    useEffect(() => {
        startTimer()
    }, [currentPlayer]) //callback

    return <div className="timer">
        <div>
            <h3>Время хода - {currentPlayer?.color === Colors.WHITE ? "белые" : "черные"}: {time}</h3>
            <button onClick={() => restart()}>Restart game</button>
        </div>
    </div>
}

export default Timer