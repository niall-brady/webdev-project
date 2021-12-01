import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import axios from 'axios';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

  /*
axios.post("https://localhost:4024/executeQuery",
  {
    'query': 'select sym,price from t',
    'response': 'true',
    'type': 'sync'
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
*/