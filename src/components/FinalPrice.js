import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Price from "./Price";
import YtdPrice from "./YtdPrice";
import Ytd2Price from "./Ytd2Price";
import { StylesProvider } from "@material-ui/core/styles";

function FinalPrice() {
  const [value, setValue] = useState("one");

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <div className="content">
          <h1 className="Title">Prices by Sym</h1>
          <Tabs
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
            variant="fullWidth"
          >
            <Tab value="one" label="Current Prices" wrapped={true} />
            <Tab value="two" label="Yesterday's Prices" wrapped={true} />
            <Tab value="three" label="Prices 2 Days Before" wrapped={true} />
          </Tabs>
          {value === "one" && <Price />}
          {value === "two" && <YtdPrice />}
          {value === "three" && <Ytd2Price />}
        </div>
      </div>
    </StylesProvider>
  );
}

export default FinalPrice;
