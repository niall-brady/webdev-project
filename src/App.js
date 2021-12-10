import './App.css';
import { Button, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import GraphVolatility from './components/graphVolatility';
import Graph from './components/graph';
import QuestionFourPlot from './components/QuestionFourPlot';
import PostRequest from "./components/PostRequest";
import QuestionFiveGet from "./components/QuestionFiveGet"
import { StylesProvider } from '@material-ui/core/styles';

function App() {
  const [value, setValue] = useState("one");

  return (
    <StylesProvider injectFirst> 
    <div className="App">
      <div className="content">
        <h1 className="Title">Market Data Stats</h1>
        <Tabs
          value={value}
          onChange={(event, newValue) => {setValue(newValue)}}
          textColor="secondary"
          indicatorColor="secondary"
          aria-label="secondary tabs example"
          centered
          variant='fullWidth'
        >
          <Tab value="one" label="Current Prices" wrapped={true}/>
          <Tab value="two" label="Running Average Price" wrapped={true} />
          <Tab value="three" label="Last Value Cache" wrapped={true}/>
          <Tab value="four" label="Highest Traded" wrapped={true}/>
          <Tab value="five" label="Volatility Graph" wrapped={true} />
        </Tabs>
        {value === "one" && 
          <PostRequest />
        }
        {value === "two" &&
          <Graph />
        }
        {value === "three" &&
          <QuestionFourPlot />
        }
        {value === "four" &&
          <QuestionFiveGet />
        }
        {value === "five" &&
          <GraphVolatility />
        }
      </div>
    </div>
    </StylesProvider>
  );
}

export default App;
