import { Tab, Tabs } from "@mui/material";
import { useState } from "react";
import Price from "./Price";
import YtdPrice from "./YtdPrice";
import Ytd2Price from "./Ytd2Price";
import { StylesProvider } from "@material-ui/core/styles";
import QuestionOneFourPlot from "./QuestionOneFourPlot";

function FinalPrice() {
  const [value, setValue] = useState("one");

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <div className="content">
          <h2 className="Heading">Prices by Sym</h2>
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
            <Tab value="one" label="Current" wrapped={true} />
            <Tab value="two" label="1 Day Ago" wrapped={true} />
            <Tab value="three" label="2 Days Ago" wrapped={true} />
          </Tabs>
          {/* {value === "one" && <Price />} */}
          {value === "one" && <QuestionOneFourPlot />}
          {value === "two" && <YtdPrice />}
          {value === "three" && <Ytd2Price />}
        </div>
      </div>
    </StylesProvider>
  );
}

export default FinalPrice;
