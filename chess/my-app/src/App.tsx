import React, {useState, useEffect} from 'react';
import BoardComponent from './components/BoardComponent';
import "./App.css"
import { Board } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFiguresList from './components/LostFiguresList';
import Timer from './components/Timer';
import ChangeFigureModal from './components/ChangeFigureModal';
import { Cell } from './models/Cell';

function App() {

  const [whitePlayer, setWhitePlayer] = useState<Player>(new Player(Colors.WHITE))  //unnecessary
  const [blackPlayer, setBlackPlayer] = useState<Player>(new Player(Colors.BLACK)) //unnecessary
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [activeWhiteModal, setActiveWhiteModal] = useState<boolean>(false)
  const [activeBlackModal, setActiveBlackModal] = useState<boolean>(false)
  const [modalCell, setModalCell] = useState<Cell | null>(null)
  const [board, setBoard] = useState<Board>(new Board(setActiveModal, endGame))



  useEffect(() => {restartGame()}, [])

  function endGame(color: Colors) {
    alert(["Game over", color, "player wins"].join(' '))
    restartGame()
  }

  function restartGame() {
    const newBoard = new Board(setActiveModal, endGame)
    newBoard.initCells()
    newBoard.addFigures()
    // setWhitePlayer(new Player(Colors.WHITE)) //unnecessary
    // setBlackPlayer(new Player(Colors.BLACK)) //unnecessary
    setBoard(newBoard)
    setCurrentPlayer(whitePlayer)
  }

  function setActiveModal(active: Colors | null, cell: Cell | null) {
    setModalCell(cell) //black and white
    
    if(!active) {
      setActiveWhiteModal(false)
      setActiveBlackModal(false)
    }
    if(active === Colors.WHITE) {
      setActiveWhiteModal(true)
    }
    if(active === Colors.BLACK) {
      setActiveBlackModal(true)
    }
    
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  // useEffect(() => {
  //   if(board.Mate) {
  //     endGame(board.Mate)
  //   }
  // }, [board.Mate])

  return (
    <div className='app'>

      <div>
        <Timer currentPlayer={currentPlayer} restartGame={restartGame} endGame={endGame}/>
      </div>

      <BoardComponent board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer}/>

      <div>
        <LostFiguresList color={Colors.WHITE} figures={board.lostWhiteFigures}/>
        <LostFiguresList color={Colors.BLACK} figures={board.lostBlackFigures}/>
      </div>
      
      <ChangeFigureModal cell={modalCell} color={Colors.WHITE} board={board} active={activeWhiteModal}/>
      <ChangeFigureModal cell={modalCell} color={Colors.BLACK} board={board} active={activeBlackModal}/>
    </div>
  );
}

export default App;
