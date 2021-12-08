import './App.css';
import { Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import GraphVolatility from './components/graphVolatility';

function App() {
  const [name, setName] = useState("Niall");
  const [value, setValue] = useState("one");

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
            lol1
          </p>
        }
        {value === "two" &&
          <p>
            lol2
          </p>
        }
        {value === "three" &&
          <p>
            lol3
          </p>
        }
        {value === "four" &&
          <GraphVolatility />
        }
      </div>
    </div>
  );
}

export default App;
