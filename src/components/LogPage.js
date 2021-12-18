


// React component for the log page. The pages should call api /logs and then pass the data to this component.
// The component will then render the log data into a table with the following columns:
// -`userId` 
// -`sessionId`
// -`requestId`
// - `logPath`


import React from "react";
// import {Link} from "react-router-dom";

import {API} from "../helpers";



export default class HistoryPage extends React.Component {
    state = {
        logs: []
    };

    componentDidMount()
    {
        this.getData();
    }

    /**
     * Gets the data and model data.
     */
    getData()
    {
        API.call("GET", "/logs").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    logs: resp.data,
                });
            }
        });
        
      
    }

    render()
    {
        return (
            

            <div className="container pt-4">
                <div className="row align-items-start">
                    <div className="col-md-12">
                        <div className="card card-body">
                            <h3 className="text-center">Logs</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>id</th>
                                        <th>Session</th>
                                        <th>Request</th>
                                        <th>Path</th>
            
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.logs.map(log => (
                                        <tr key={log.id}>
                                            <td>{log.id}</td>
                                            <td>{log.userId}</td>
                                            <td>{log.sessionId}</td>
                                            <td>{log.requestId}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}