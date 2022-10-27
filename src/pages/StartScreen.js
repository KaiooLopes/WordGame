import styles from "./StartScreen.module.css"
import { Link } from "react-router-dom"

const StartScreen = () => {
  return (
    <div className={styles.start}>
      <h1>lol word</h1>
      <p>clique no botão abaixo para iniciar o jogo!</p>
      <Link to="/game" className="btn">iniciar jogo</Link>
    </div>
    )
}

export {StartScreen};