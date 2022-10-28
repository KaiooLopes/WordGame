import styles from "./EndGame.module.css"

import { Link, useLocation } from "react-router-dom"
import Footer from "../components/Footer";


const EndGame = () => {

  const location = useLocation();
  const score = location.state?.score;
  const word = location.state?.word;

  return (
    <div className={styles.end}>
        <h1 className={styles.logo}>Wordlol</h1>
        <h2>Fim de jogo</h2>
        <p className={styles.score}>A sua pontuação foi <span>{score}</span></p>
        <p className={styles.champ}>O campeão era <span>{word && word.replace(" ", "-").toUpperCase()}</span></p>
        <Link to="/" className="btn">Reiniciar</Link>
        <Footer />
    </div>
  )
}

export {EndGame}