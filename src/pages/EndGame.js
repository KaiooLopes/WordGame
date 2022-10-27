import styles from "./EndGame.module.css"

import { Link, useLocation } from "react-router-dom"


const EndGame = () => {

  const location = useLocation();
  const score = location.state.score;
  const word = location.state.word;

  return (
    <div className={styles.end}>
        <h2>Fim de jogo</h2>
        <p>a sua pontuação foi {score}</p>
        <p>O campeão era <span>{word.replace(" ", "-").toUpperCase()}</span></p>
        <Link to="/" className="btn">Reiniciar</Link>
    </div>
  )
}

export {EndGame}