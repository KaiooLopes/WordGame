//CSS
import './App.css';

//PAGES
import { StartScreen } from "./pages/StartScreen"
import { Game } from "./pages/Game"
import { EndGame } from "./pages/EndGame"

//REACT-ROUTER
import {BrowserRouter, Routes, Route} from "react-router-dom"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<StartScreen />}/>
          <Route path="/game" element={<Game />}/>
          <Route path="/end" element={<EndGame />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
