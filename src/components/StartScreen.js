import "../components/StartScreen.css";

const startscreen = ({startGame}) => {
  return (
    <div className="start">
      <h1>Secrets Word</h1>
      <p>Click on the button to start the game!</p>
      <button onClick={startGame}>Start Game</button>
    </div>
    )
}

export default startscreen;