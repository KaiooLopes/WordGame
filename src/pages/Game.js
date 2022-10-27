import styles from "./Game.module.css";
import { useState, useRef, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useFetchDocument } from "../hooks/useFetchDocument";

const Game = () => {
  const navigate = useNavigate();
  const [ data, setData ] = useState(null);
  const {documents: word, loading, error} = useFetchDocument("champions", data);

  const [ guesses, setGuesses ] = useState(3);
  const [ letters, setLetters ] = useState([]);
  const [ wrongLetters, setWrongLetters ] = useState([]);
  const [ guessedLetters, setGuessedLetters ] = useState([]);
  const [ letter, setLetter ] = useState("");
  const [ score, setScore ] = useState(0);
  const letterInputRef = useRef(null);

  const startGame = () => {
    setWrongLetters([]);
    setGuessedLetters([]);
    setLetters([]);
  }
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    verifyLetter(letter);

    setLetter("");
    letterInputRef.current.focus();
  }

  const verifyLetter = (letter) => {
    if(guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;
    
    if(letters.includes(letter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        letter
      ]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        letter
      ]);
      setGuesses(guesses - 1)
    }
  }
  
  useEffect(() => {
    if(word){
      let wordLetters = word.name.split("")
      wordLetters = wordLetters.map((l) => l.toLowerCase().replaceAll(" ", "-"));
      setLetters(wordLetters);
    }
  }, [word]);

  useEffect(() => {
    if(guesses <= 0){
      navigate("/end", {
        state: {
          score,
          word: word.name
        }
      })
    }
  }, [guesses]);

  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]
    if(guessedLetters.length === uniqueLetters.length && guessedLetters.length !== 0 && uniqueLetters.length !== 0){
      setScore((actualScore) => actualScore + 100);
      setData(Date.now())
      startGame();
    }
  }, [guessedLetters, letters])


  return (
    <div className={styles.game}>
      {word && loading && <h2>Carregando...</h2>}
      {error && <h2>Erro, tente reiniciar a pagina</h2> }
      {!loading && word && (
      <>
        <p className={styles.attention}>Atenção: Palavras compostas são separados por hífen(-)</p>
        <p className={styles.points}>
          <span>Pontuação: {score}</span>
        </p>
        <h2>Adivinhe o campeão</h2>
        <h3 className={styles.tip}>
          Dica sobre o campeão ={">"} <span>{`Função: ${word.occupation} / Rota(s): ${word.role}`}</span>
        </h3>
        <p>Você ainda tem <span>{guesses}</span> tentativas</p>
        <div className={styles.wordContainer}>
          {word && !loading && letters.map((letter, i) => (
            guessedLetters.includes(letter) ? (
              <span key={i} className={styles.letter}>{letter}</span>
            ) : (
              <span key={i} className={styles.blankSquare}></span>
            )
          ))}
        </div>
        <div className={styles.letterContainer}>
          <p>tente adivinhar uma letra do campeão:</p>
          <form onSubmit={handleSubmit}>
            <input 
            type="text" 
            name="letter"
            maxLength="1"
            required
            value={letter}
            onChange={(e) => setLetter(e.target.value)}
            ref={letterInputRef}
            />
            <button className="btn">Jogar!</button>
          </form>
        </div>
        <div className={styles.wrongLettersContainer}>
          <p>letras ja usadas:</p>
          <span>{wrongLetters.join(", ")}</span>
        </div>
      </>)}
    </div>
  )
}

export {Game}