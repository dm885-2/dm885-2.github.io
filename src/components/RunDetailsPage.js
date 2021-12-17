import React from "react";
import {withRouter} from "react-router";
//import {API} from "../helpers";



class UserListPage extends React.Component {
    
    state = {
        results: [{id: 1, run: 4, solver: "geCode", status: "Stoped", model: "model1", data: "data1", result: "===========\n x = 100"}, {id: 2, run: 4, solver: "Chuff", status: "running", model: "model1", data: "data1", result: "===========\n x = 200"}],
        choosen: 0
       
    };

 //   componentDidMount()
 //  {
 //       this.getData();
 //   }

    /**
     * Gets the data and model data.
     */
 //   getData()
 //   {
 //       API.call("GET", "/users").then(resp => {
 //           if(resp && !resp.error)
 //           {
 //               this.setState({
 //                   results: resp.data,
 //               });
 //           }
  //      });
  //  }
   
    render()
    {
        return (
           // Create a table that shows all data expect the result. When you click on a row, the result is shown below the table.
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Run</th>
                            <th>Solver</th>
                            <th>Status</th>
                            <th>Model</th>
                            <th>Data</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.results.map(result => {
                                return (
                                    <tr key={result.id} onClick={() => {
                                        this.setState({
                                            choosen: result.id
                                        });
                                    }}>
                                        <td>{result.id}</td>
                                        <td>{result.run}</td>
                                        <td>{result.solver}</td>
                                        <td>{result.status}</td>
                                        <td>{result.model}</td>
                                        <td>{result.data}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                {
                    // Show the result when you click on a row. If no row is choosen, show nothing. Make a border aound the result.
                    this.state.choosen > 0 && <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Result</h5>
                            <p className="card-text">{this.state.results[this.state.choosen - 1].result}</p>
                        </div>
                    </div>
                }
            </div>
        )
    }
          
    
}export default withRouter(UserListPage);