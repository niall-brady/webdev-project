import './App.css';
import { Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import GraphVolatility from './components/graphVolatility';
import Graph from './components/graph';
import QuestionFourPlot from './components/QuestionFourPlot';

function App() {
  const [name, setName] = useState("!");
  const [value, setValue] = useState("one");

  function changeName() {
    if (name==="!") {
      setName(", General Kenobi");
    } else {
      setName("!");
      console.log((new Date()).toDateString())
    }
  }

  return (
    <div className="App">
      <div className="content">
        <h1>Hello There{name}</h1>
        <Button onClick={changeName}>Change Title</Button>
        <Tabs
          value={value}
          onChange={(event, newValue) => {setValue(newValue)}}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab value="one" label="Current Prices" />
          <Tab value="two" label="Running Average Price" />
          <Tab value="three" label="Last Value Cache" />
          <Tab value="four" label="Volatility Graph" />
        </Tabs>
        {value === "one" && 
          <p>
            Much empty
          </p>
        }
        {value === "two" &&
          <Graph />
        }
        {value === "three" &&
          <QuestionFourPlot />
        }
        {value === "four" &&
          <GraphVolatility />
        }
      </div>
    </div>
  );
}

export default App;
