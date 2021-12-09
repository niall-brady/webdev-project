import axios from "axios";
import {useState, useEffect} from "react";

function GetResult() {
  /*
    This function executes a query through qRest and returns the result
    (Conor's Volatility Graph Results)
  */

  const url = 'https://localhost:8091/executeFunction'; // Url and port of qRest server
  const [result, setResult] = useState(null);           // Initialising result
  const [loading, setLoading] = useState(true);         // Initialising loading boolean
  const [error, setError] = useState(null);             // Initialising error variable

  useEffect(() => {
    var presentToday = new Date()

    var DD = ("0"+presentToday.getDay()).slice(-2) // 2 digit Day
    var MM = ("0"+presentToday.getMonth()).slice(-2) // 2 digit month
    var YYYY = presentToday.getFullYear() // 4 digit year
    var startToday = YYYY+"."+MM+"."+DD

    var hh = ("0"+presentToday.getHours()).slice(-2) // 2 digit hour
    var mm = ("0"+presentToday.getMinutes()).slice(-2) // 2 digit minute
    var ss = ("0"+presentToday.getSeconds()).slice(-2) // 2 digit second
    presentToday = startToday+"D"+hh+":"+mm+":"+ss+".0000000"

    axios.post(url,
      {
        // Query
        "function_name": ".dataaccess.qrest",
        "arguments":{
          "db":"rdb, hdb",
          "query":"select avgsPrice: last avgs price by 0D00:30 xbar time, sym from trade where time within (.z.P-.z.N;.z.P)"
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
      })// setResult(res.data.result)})  // This is the output if there's no errors
      .catch(err => {setError(err)})              // This is the output if there is a error
      .finally(() => {setLoading(false)})         // This is outputted no matter what
  }, []) // This useEffect is only ran when the page starts

  // Returning result, loading and error variables as an object
  return {result, loading, error};

}

export default GetResult;
