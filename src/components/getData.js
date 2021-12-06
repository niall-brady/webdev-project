import axios from "axios";
import {useState, useEffect} from "react";

function GetResult() {

  const url = 'https://localhost:4024/executeFunction';
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.post(url,
      {
        // select 
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
        auth: {
          username: "user",
          password: "pass"
        },
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": "BASIC dXNlcjpwYXNz"
        }
      }
    )
      .then(res => {setResult(res.data.result)}) // This is the output if there's no errors
      .catch(err => {setError(err)}) // This is the output if there is a error
      .finally(() => {setLoading(false)})
  }, [])

  return {result, loading, error};

}

export default GetResult;