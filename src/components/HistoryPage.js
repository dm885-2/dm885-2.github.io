import React from "react";
import {Link} from "react-router-dom";

import {API, statuses} from "../helpers";

export default class HistoryPage extends React.Component {
    state = {
        history: [],
        models: [],
        data: []
    };

    componentDidMount()
    {
        this.getData();
    }

    /**
     * Makes a DELETE call for the given type and id.
     * @param {*} type 
     * @param {*} id 
     */
    async delete(id)
    {
        const check = window.confirm("Are you sure you want to delete it?");
        if(check)
        {
            const data = await API.call("DELETE", `files/${id}`);
            if(data)
            {
                this.getData();
            }
        }
    }

    /**
     * Gets the data and model data.
     */
    getData()
    {
        API.call("GET", "jobs").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    history: resp.data,
                });
            }
        });
        
        API.call("GET", "files/all/0").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    models: resp.results,
                });
            }
        });
        
        API.call("GET", "files/all/1").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    data: resp.results,
                });
            }
        });
    }
    
    render()
    {
        return (
            //Move table to only  tage 2/3 of the left part of the page
            <div className="container pt-4">
                <div className="row align-items-start">
                    <div className="col-md-12">
                        <div className="card card-body">
                            <h3 className="text-center">History</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.history.map(history => (
                                        <tr key={history.id}>
                                            <td>{history.id}</td>
                                            <td>{new Date(history.timestamp).toLocaleString()}</td>
                                            <td>{statuses[history.status]}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row pt-1">
                    <Link to="/newRun" className="d-grid gap-2">
                        <button type="button" className="btn btn-primary" >
                            Start new run!
                        </button>
                    </Link>
                </div>

                <div className="row pt-4">
                    <div className="col-md-6">
                    <div className="card card-body">
                        <h3 className="text-center">Models</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.models.map(model => (
                                    <tr key={model.id}>
                                        <td>{model.fileId}</td>
                                        <td>{model.filename}</td>
                                        <td>
                                            <Link to={`/model/${model.id}`} className="text-dark">
                                                <i className="bi bi-pencil-square"/>
                                            </Link>
                                        </td>
                                        <td>
                                            <i onClick={() => this.delete(model.fileId)} role="button" className="bi bi-trash"></i>
                                        </td>
                                        <td>
                                            <i className="bi bi-cloud-arrow-up"></i>    
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/model/new">
                        <button type="button" className="btn btn-primary mt-1 w-100">
                            Create new model!
                        </button>
                    </Link>
                </div>
                    
                <div className="col-md-6">
                    <div className="card card-body">
                        <h3 className="text-center">Data</h3>
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map(data => (
                                    <tr key={data.id}>
                                        <td>{data.fileId}</td>
                                        <td>{data.filename}</td>
                                        <td>
                                            <Link to={`/data/${data.fileId}`} className="text-dark">
                                                <i className="bi bi-pencil-square"/>
                                            </Link>
                                        </td>
                                        <td>
                                            <i onClick={() => this.delete(data.fileId)} role="button" className="bi bi-trash"/>
                                        </td>
                                        <td>
                                            <i className="bi bi-cloud-arrow-up"/>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/data/new">
                        <button type="button" className="btn btn-primary mt-1 w-100">
                            Create new dataset!
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        );
    }
                
           
    
    
}


