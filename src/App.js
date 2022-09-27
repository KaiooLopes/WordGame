//CSS
import './App.css';

//REACT
import { useCallback, useEffect, useState } from "react";

//DATA
import {wordsList} from "./data/words";

//COMPONENTS
import StartScreen from "./components/StartScreen";
import Game from './components/Game';
import EndGame from './components/EndGame';

const stages = [
  {id: 1, name: "start"},
  {id: 2, name: "game"},
  {id: 3, name: "end"}
];

const guessesQty = 3;

function App() {
  const [ gameStage, setGameStage ] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(50)

  const pickWordAndCategory = useCallback(() => {
    //pick a random category
    const categories = Object.keys(words)
    const category = categories[parseInt(Math.random() * Object.keys(categories).length)]

    //pick a random word
    const word = words[category][parseInt(Math.random() * words[category].length)]

    return {word, category}
  }, [words])

  // starts the secret word game
  const startGame = useCallback(() => {
    //clear all letters
    clearLettersStates();
    // pick word and pick category
    const { word, category } = pickWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("").map(letra => letra.toLowerCase())

    //fill states
    setPickedWord(word)
    setPickedCategory(category)
    setLetters(wordLetters)

    setGameStage(stages[1].name);
  }, [pickWordAndCategory])

  // process the letter input 
  const verifyLetter = (letter, pickedWord) => {
    const normalizedLetter = letter.toLowerCase();
    let normalizedWord = pickedWord.split("").map(letra => letra.toLowerCase())

    // check if letter has already been utilized

    if(guessedLetters.includes(normalizedLetter) || wrongLetters.includes(normalizedLetter)){
      return;
    }

    // push guessed letter or remove a chance

    if(normalizedWord.includes(normalizedLetter)){
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter,
      ]);
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
    } else if(!normalizedWord.includes(normalizedLetter)) {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter,
      ]);
      setGuesses(guesses - 1)
    }
  }

  const clearLettersStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  }

  // check if guesses ended
  useEffect(() => {
    if(guesses <= 0){
      //reset all states
      clearLettersStates();
      setGameStage(stages[2].name)
    }
  }, [guesses])

  //check win condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)]

    //win condition
    if(guessedLetters.length === uniqueLetters.length){
      //add score
      setScore((actualScore) => actualScore += 100);

      //restart game with new word
      startGame();
    }

  }, [guessedLetters, letters, startGame])

  //Restart the game
  const retry = () => {
    setGuesses(guessesQty);
    setScore(0);

    setGameStage(stages[0].name);
  }

  return (
    <div className="App">
      {gameStage === "start" && <StartScreen startGame={startGame} />}
      {gameStage === "game" && <Game
      verifyLetter={verifyLetter} 
      pickedWord={pickedWord}
      pickedCategory={pickedCategory}
      letters={letters}
      guessedLetters={guessedLetters}
      wrongLetters={wrongLetters}
      guesses={guesses}
      score={score}
       />}
      {gameStage === "end" && <EndGame retry={retry} score={score} />}
    </div>
  );
}

export default App;
