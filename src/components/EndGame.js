import "./EndGame.css"

const EndGame = ({retry, score}) => {
  return (
    <div>
        <h1>EndGame</h1>
        <h2>A sua pontuação foi: <span>{score}</span></h2>
        <button onClick={retry}>Try Again</button>
    </div>
  )
}

export default EndGame