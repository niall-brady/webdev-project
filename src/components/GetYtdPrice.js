import { useState, useEffect } from "react";
import axios from "axios";
//import { DataGrid } from '@mui/x-data-grid'; // unmute if doing plotting in here

export default function GetYtdPrice() {
  // define constants. Hardcode for each sym -------------------------------------

  const [outId, setOutId] = useState([]);
  const [loading, setLoading] = useState(true);

  // set up UseEffect/React Hook to perform an async axios post request
  useEffect(() => {
    let interval; // set up the refresh interval
    const fetchData = async () => {
      // try {
      const response = await axios.post(
        "https://localhost:8091/executeFunction",
        {
          function_name: "string",
          arguments: {
            db: "hdb",
            query:
              "select current_price: last price, min_price: min price, max_price: max price by sym from trade where date=(`date$.z.p)-1",
          },
        },
        {
          auth: {
            username: "user",
            password: "pass",
          },
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "BASIC dXNlcjpwYXNz",
          },
        }
      );

      // console log --------
      //console.log(response.data.result);

      // define variables ------------------------------------------//
      setOutId(response.data.result);
      setLoading(false);
    };
    fetchData(); // calls the async axios post

    // defines in ms when the data will refresh
    interval = setInterval(() => {
      fetchData();
    }, 3 * 1000); // time is in miliseconds
    return () => {
      clearInterval(interval);
    };
  }, []);

  //console.log(outId); // log the data to the console
  return { outId, loading }; //return the outputs, mute if plotting
}
