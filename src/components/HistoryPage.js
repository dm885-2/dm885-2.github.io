import React from "react";
import {Link} from "react-router-dom";

import {API, statuses} from "../helpers";

export default class HistoryPage extends React.Component {
    state = {
        history: [],
        models: [],
        data: []
    };
    shouldGetData = true;

    componentDidMount()
    {
        this.getData();
        setTimeout(() => this.getInt(), 3000);
    }

    componentWillUnmount()
    {
        this.shouldGetData = false;
    }

    getInt()
    {
        if(this.shouldGetData)
        {
            this.getData(0).then(d => {
                console.log("Resolved!!");
                setTimeout(() => this.getInt(), 3000);
            });
        }
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
    async getData(everything = 1)
    {
        const resp = await API.call("GET", "jobs");
        if(resp && !resp.error)
        {
            this.setState({
                history: resp.data.map(d => {
                    d.timeRunning = 0;
                    if(d.status === 1)
                    {
                        console.log(Date.now(), Number(d.startTime));
                        d.timeRunning = Date.now() - Number(d.startTime);
                    }else if(d.status === 2)
                    {
                        d.timeRunning = Number(d.endTime) - Number(d.startTime);
                    }
                    return d;
                }),
            });
        }
        
        if(everything === 1)
        {
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
        console.log("Doone!");
    }

    async loadOutput(id)
    {
        const out = await API.call("GET", "jobs/" + id);
        if(out && !out.error)
        {
            const index = this.state.history.findIndex(d => d.id === id);
            let history = [...this.state.history];
            history[index].output = out.data;
            history[index].opened = true;
            this.setState({
                history
            });
        }
    }

    toMinutes(diff)
    {
        const diffDays = Math.floor(diff / 86400000); // days
        const diffHrs = Math.floor((diff % 86400000) / 3600000); // hours
        const diffMins = Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
        const diffSec = Math.round((((diff % 86400000) % 3600000) % 60000) / 1000); // minutes
        return diffDays + "d " + diffHrs + "h " + diffMins + "m " + diffSec + "s";
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
                                        <th>Running time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.history.map(history => (
                                        <tr key={history.id}>
                                            <td>{history.id}</td>
                                            <td>{history.status !== 0 && this.toMinutes(history.timeRunning)}</td>
                                            <td>
                                                {
                                                    history.status === 1 ? <div className="spinner-border text-primary" role="status"/> : statuses[history.status]
                                                }
                                            </td>
                                            {
                                                history.status === 2 ? <td>
                                                    <button className="btn btn-secondary" onClick={() => this.loadOutput(history.id)}>Output</button>
                                                </td> : <td/>
                                            }
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


