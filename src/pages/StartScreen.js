import styles from "./StartScreen.module.css"
import { Link } from "react-router-dom"
import Footer from "../components/Footer";

const StartScreen = () => {
  return (
    <div className={styles.start}>
      <h1 className={styles.title}>Wordlol</h1>
      <Link to="/game" className="btn">iniciar jogo</Link>
      <Footer />
    </div>
    )
}

export {StartScreen};