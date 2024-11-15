import Header from "./components/Header/Header"
import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import Log from "./components/Log/Log"
import { useState } from "react"
import { WINNING_COMBINATIONS } from "./winning-combinations"
import GameOver from "./components/GameOver/GameOver"
const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

function driveActivePlayer(gameTurns){
  let currentPlayer = 'X';
  if(gameTurns.length> 0 && gameTurns[0].player === 'X'){
    currentPlayer = 'O'
  }
  return currentPlayer
}

function App() {
  const [players, setPlayers]= useState({
    X:'Player 1',
    O: 'Player 2'
  })
  const [gameTurns, setGameTurns] = useState([])
  // const [hasWinner, setHasWinner]= useState(false)
  // const [activePlayer, setActivePlayer] = useState('X')

  const activePlayer = driveActivePlayer(gameTurns)

  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns){
      const {square, player} = turn;
      const {row, col} = square;

      gameBoard [row] [col] = player
  }
  
  let winner =null

  for(const combination of WINNING_COMBINATIONS){
    const firstSquare = gameBoard[combination[0].row][combination[0].column];
    const secondSquare = gameBoard[combination[1].row][combination[1].column];
    const thirdSquare = gameBoard[combination[2].row][combination[2].column];

    if(firstSquare && firstSquare === secondSquare && firstSquare === thirdSquare){
      winner = players[firstSquare]
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner
  function handelSelectSquare(rowIndex, colIndex){
    // setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' );
    setGameTurns(prevTurns => {
      const currentPlayer = driveActivePlayer(prevTurns)
        const updatedTurns = [
          {square:{row: rowIndex, col: colIndex}, player: currentPlayer},
          ...prevTurns
        ];
      return updatedTurns;
    });
  }
  function handelRestart(){
    setGameTurns([])
  }

  function handelPlayerNameChange(symbol, newName){
    setPlayers(prevPlayers => {
      return{
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }
  return (
    <main>
      {/* <Header /> */}
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player 
            initialName="Player 1" 
            symbol = 'X' 
            isActive={activePlayer === 'X'} 
            onChangeName={handelPlayerNameChange}
          />
          <Player 
            initialName="Player 2" 
            symbol = 'O' 
            isActive={activePlayer === 'O'}
            onChangeName={handelPlayerNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handelRestart}/>}
        <GameBoard 
          onSelectSquare={handelSelectSquare} 
          board= {gameBoard}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
