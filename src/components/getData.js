import axios from "axios";
import {useState, useEffect} from "react";

function GetVolResult(days) {
  /*
    This function executes a query through qRest and returns the result
    (Niall's Volatility Graph Results)
  */

  const url = 'https://localhost:8091/executeFunction'; // Url and port of qRest server
  const [result, setResult] = useState(null);           // Initialising result
  const [loading, setLoading] = useState(true);         // Initialising loading boolean
  const [error, setError] = useState(null);             // Initialising error variable
  const [queryTimeFrame, setQueryTimeFrame] = useState("(.z.P-1D;.z.P)");
  const [graphTickValues, setGraphTickValues] = useState("every 4 hours")

  useEffect(() => {
  let interval
  const fetchData = () => {
  
    if (days === 5) {
      setQueryTimeFrame("(.z.P-5D;.z.P)")
      setGraphTickValues("every 24 hours")
    } else if (days === 3) {
      setQueryTimeFrame("(.z.P-3D;.z.P)")
      setGraphTickValues("every 12 hours")
    } else if (days === 1) {
      setQueryTimeFrame("(.z.P-1D;.z.P)")
      setGraphTickValues("every 4 hours")
    }

    axios.post(url,
      {
        "function_name": "string",
        "arguments": {
          "db": "rdb, hdb",
          "query":"select devPrice:dev price by 0D00:30 xbar time,sym from trade where time within "+queryTimeFrame
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
      .then(res => {
        setResult(res.data.result)
      })  // This is the output if there's no errors
      .catch(err => {setError(err)})              // This is the output if there is a error
      .finally(() => {setLoading(false)})         // This is outputted no matter what

    }

    fetchData();

    interval = setInterval(() => {
      fetchData()
      }, 3 * 1000) // time is in miliseconds
      return () => {
      clearInterval(interval)
      }

  }, [queryTimeFrame]) // This useEffect is only ran when the page starts or queryTimeFrame changes

  // Returning result, loading and error variables as an object
  return {result, loading, error, graphTickValues};

}

export default GetVolResult;
