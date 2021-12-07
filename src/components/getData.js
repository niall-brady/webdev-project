import axios from "axios";
import {useState, useEffect} from "react";

function GetResult() {
  /*
    This function executes a query through qRest and returns the result
  */

  const url = 'https://localhost:4024/executeFunction'; // Url and port of qRest server
  const [result, setResult] = useState(null);           // Initialising result
  const [loading, setLoading] = useState(true);         // Initialising loading boolean
  const [error, setError] = useState(null);             // Initialising error variable

  useEffect(() => {
    axios.post(url,
      {
        // Query
        "function_name": ".dataaccess.qrest",
        "arguments":{
          "tablename":"trade",
          "starttime":"2021.11.29D00:00:00.000000000",
          "endtime":"2021.11.29D24:00:00.000000000",
          "freeformby":"sym",
          "timebar":"(30;\\\"minute\\\";\\\"time\\\")",
          "aggregations":"(enlist`dev)!(enlist`price)"
        }
      },
      {
        // Username and password for qRest
        auth: {
          username: "user",
          password: "pass"
        },
        // Setting the type of the request to JSON and giving authorisation code
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "BASIC dXNlcjpwYXNz"
        }
      }
    )
      .then(res => {setResult(res.data.result)})  // This is the output if there's no errors
      .catch(err => {setError(err)})              // This is the output if there is a error
      .finally(() => {setLoading(false)})         // This is outputted no matter what
  }, []) // This useEffect is only ran when the page starts

  // Returning result, loading and error variables as an object
  return {result, loading, error};

}

export default GetResult;