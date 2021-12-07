import './App.css';
import { Button } from '@mui/material';
// import { LoremIpsum } from "lorem-ipsum";
import { useState/*, useEffect*/} from 'react';
import GraphVolatility from './components/graphVolatility';

// const lorem = new LoremIpsum({
//   sentencesPerParagraph: {
//     max: 8,
//     min: 4
//   },
//   wordsPerSentence: {
//     max: 16,
//     min: 4
//   }
// });

function App() {
  const [name, setName] = useState("Niall");

  function changeName() {
    if (name==="Niall") {
      setName("General Kenobi");
    } else {
      setName("Niall");
    }
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Hello There, {name}</h1>
        <Button onClick={changeName}>Change Name</Button>
        <h2>Volatility Graph</h2>
        <GraphVolatility />
      </div>
    </div>
  );
}

export default App;
