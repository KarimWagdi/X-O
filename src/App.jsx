import Header from "./components/Header/Header"
import Player from "./components/Player/Player"
import GameBoard from "./components/GameBoard/GameBoard"
import { useState } from "react"

function App() {
  const [activePlayer, setActivePlayer] = useState('X')
  function handelSelectSquare(){
    setActivePlayer((curActivePlayer) => curActivePlayer === 'X' ? 'O' : 'X' )
  }
  return (
    <main>
      {/* <Header /> */}
      <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player initialName="Player 1" symbol = 'X'/>
        <Player initialName="Player 2" symbol = 'O'/>
      </ol>
      <GameBoard />
      </div>

      log
    </main>
  )
}

export default App
