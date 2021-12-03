import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


axios.post("https://localhost:4024/executeFunction",
  {
    // select 
    "function_name": ".dataaccess.qrest",
    "arguments":{
      "tablename":"trade",
      "starttime":"2021.11.29D10:00:00.000000000",
      "endtime":"2021.11.29D10:05:00.000000000",
      "columns":'date'
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
  .then(res => console.log(res.data.result)) // This is the output if there's no errors
  .catch(err => console.error(err)) // This is the output if there is a error
