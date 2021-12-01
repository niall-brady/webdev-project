import React from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const getData = () => {
    axios.post("https://localhost:4024/executeQuery",
        {
            'query': '1000#t',
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
        .then(res => {
            console.log(res.data.result);
            // return res.data.result;
        })
        .catch(err => {
            console.error(err);
            // return null;
        })
}

const Graph = () => {
    return (
        <div>
            <h2>Line Graph</h2>
            {/* <Line data: */}
        </div>
    );
}
 
export default Graph;