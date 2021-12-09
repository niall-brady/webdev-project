import React from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";

// wrap axios command and plot output in a React Component.
// Export the component so can be used in other scripts

export default class PostRequest extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      results: { x: [], y: { x: [], y: [[], [], []] } },
    };
  }

  // get the data using componentDidMount (ie after component is rendered) and a Axios Post Request
  //default to see current time data
  componentDidMount() {
    axios
      .post(
        "https://localhost:8091/executeFunction",
        {
          function_name: "string",
          arguments: {
            db: "rdb",
            query:
              "exec current_price: last price, min_price: min price, max_price: max price by sym from trade",
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
      )
      // save output to a component state property
      .then((response) =>
        this.setState({
          results: response.data.result,
        })
      );
    //.then((res) => console.log(res.data.result.x)); // output to console
  }

  // Formatting for webpage
  render() {
    const outId = this.state;

    const columns = [
      { field: "sym", headerName: "Sym", width: 180 },
      {
        field: "price",
        headerName: "Current_Price",
        type: "number",
        width: 180,
      },
      {
        field: "priceChange",
        headerName: "Min Price",
        type: "number",
        width: 180,
      },
      {
        field: "maxPrice",
        headerName: "Max Price",
        type: "number",
        width: 180,
      },
    ];

    // console.log(outId);

    const rows = [
      {
        id: 1,
        sym: outId.results.x[0],
        price: outId.results.y.y[0][0],
        priceChange: outId.results.y.y[1][0],
        maxPrice: outId.results.y.y[2][0],
      },

      {
        id: 2,
        sym: outId.results.x[1],
        price: outId.results.y.y[0][1],
        priceChange: outId.results.y.y[1][1],
        maxPrice: outId.results.y.y[2][1],
      },
      {
        id: 3,
        sym: outId.results.x[2],
        price: outId.results.y.y[0][2],
        priceChange: outId.results.y.y[1][2],
        maxPrice: outId.results.y.y[2][2],
      },
      {
        id: 4,
        sym: outId.results.x[3],
        price: outId.results.y.y[0][3],
        priceChange: outId.results.y.y[1][3],
        maxPrice: outId.results.y.y[2][3],
      },
      {
        id: 5,
        sym: outId.results.x[4],
        price: outId.results.y.y[0][4],
        priceChange: outId.results.y.y[1][4],
        maxPrice: outId.results.y.y[2][4],
      },
      {
        id: 6,
        sym: outId.results.x[5],
        price: outId.results.y.y[0][5],
        priceChange: outId.results.y.y[1][5],
        maxPrice: outId.results.y.y[2][5],
      },
      {
        id: 7,
        sym: outId.results.x[6],
        price: outId.results.y.y[0][6],
        priceChange: outId.results.y.y[1][6],
        maxPrice: outId.results.y.y[2][6],
      },
      {
        id: 8,
        sym: outId.results.x[7],
        price: outId.results.y.y[0][7],
        priceChange: outId.results.y.y[1][7],
        maxPrice: outId.results.y.y[2][7],
      },
      {
        id: 9,
        sym: outId.results.x[8],
        price: outId.results.y.y[0][8],
        priceChange: outId.results.y.y[1][8],
        maxPrice: outId.results.y.y[2][8],
      },
      {
        id: 10,
        sym: outId.results.x[9],
        price: outId.results.y.y[0][9],
        priceChange: outId.results.y.y[1][9],
        maxPrice: outId.results.y.y[2][9],
      },
    ];

    return (
      <div className="card text-center m-3">
        <h1 className="card-header">Prices</h1>
        <div style={{ height: 3000, width: "100%" }}>
          <DataGrid rows={rows} columns={columns} />{" "}
        </div>
      </div>
    );
  }
}
