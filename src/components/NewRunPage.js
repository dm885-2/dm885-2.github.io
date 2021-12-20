import React from "react";
import {withRouter} from "react-router";

import {API, solvers} from "../helpers";

// Create a new component that will produce some HTML where a user can choose multiple Solver from a dropdown and also give a text input for some flags to set.
class NewRunPage extends React.Component {
    newSolver = {
        solver: solvers[0],
        flagA: false,
        flagF: false,
        flagP: 1,
        flagM: 100,
        cpuLimit: 1,
        memoryLimit: 0,
        timeLimit: 0,
        // solverID: 1,
    };

    state = {
        models: [],
        data: [],

        currentModel: 0,
        currentDataset: 0,
        solverData: [],
        solvers: [],
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
        API.call("GET", "files/all/0").then(resp => {
            if(resp && !resp.error)
            {
                console.log("Got resp", resp);
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

        API.call("GET", "solvers").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    solverData: resp.data,
                });
            }
        });
    }

    /**
     * Updates the given attribute on the given solver.
     * @param String key 
     * @param String value 
     * @param Number i 
     */
    updateSolver(key, value, i)
    {
        const solvers = [...this.state.solvers];
        const data = {...solvers[i]};
        data[key] = value;
        solvers[i] = data;
        this.setState({
            solvers,
        });
    }

    /**
     * Adds a blank solver to the state.
     */
    addSolver()
    {
        this.setState({
            solvers: [
                ...this.state.solvers,
                {
                    ...this.newSolver
                }
            ]
        });
    }

    /**
     * Validates, and saves the form data.
     */
    async save()
    {
        const data = {
            model: this.state.currentModel,
            dataset: this.state.currentDataset,
            solvers: [...this.state.solvers],
        };
        if(data.model === 0)
        {
            alert("A valid model needs to be choosen");
        }else if(data.solvers.length === 0)
        {
            alert("You need atleast one solver");
        }else{
            const resp = await API.call("POST", "jobs", data);
            if(resp && !resp.error)
            {
                alert("Your run has been saved!");
                this.props.history.push("/");
            }else{
                alert("Something went wrong, try again.");
            }
        }
    }

    render()
    {
        return (<div className="container pt-4">
                    <h1>New run</h1>
                    <label>Model:</label>
                    <div className="dropdown">
                        <select className="form-select form-select-lg mb-2" onChange={(e) => this.setState({currentModel: Number(e.target.value)})} defaultValue={this.state.currentModel} aria-label=".form-select-lg" style={{ width: '40%' }}>
                            <option value="0">Choose a model</option>
                            {this.state.models.map(model => (
                                <option value={model.fileId} key={model.fileId}>{model.filename}</option>
                            ))}
                        </select>
                    </div>
                    <label>Dataset:</label>
                    <div className="dropdown">
                        <select className="form-select form-select-lg mb-2" onChange={(e) => this.setState({currentDataset: Number(e.target.value)})} defaultValue={this.state.currentDataset} aria-label=".form-select-lg" style={{ width: '40%' }}>
                            <option value="0">Choose a dataset</option>
                            {this.state.data.map(data => (
                                <option value={data.fileId} key={data.fileId}>{data.filename}</option>
                            ))}
                        </select>
                    </div>


                    {/* <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1"></input>
                        <label className="custom-control-label" htmlFor="customCheck1"> Parallel run</label>
                    </div> */}

                    {/* <div className="col-sm-4">
                        <label htmlFor="timeLimit">Time limit in seconds</label>
                    </div>
                    <div className="col-sm-8">
                        <input type="number" id="timeLim" name="timeLim"/>
                    </div> */}

                    {
                        this.state.solvers.map((solver, key) => <div className="pt-4 pb-4 border-top" key={key}>
                        <label htmlFor="solver">
                            <h5>Solver #{key + 1}</h5>
                        </label>
                        <select onChange={(e) => this.updateSolver("solver", e.target.value, key)} className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" id="solver">
                            {
                                this.state.solverData.map((solver, i) => <option value={solver.id} key={i}>{solver.name}</option>)
                            }
                        </select>
                        <h6>Flags</h6>
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="flagA">All solutions?</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="checkbox" id="flagA" onChange={(e) => this.updateSolver("flagA", e.target.checked, key)} defaultChecked={solver.flagA} name="flagA"/>
                            </div>

                            <div className="col-sm-4">
                                <label htmlFor="flagF">Free search?</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="checkbox" onChange={(e) => this.updateSolver("flagF", e.target.checked, key)} id="flagF" defaultChecked={solver.flagF} name="flagF"/>
                            </div>

                            <div className="col-sm-4">
                                <label htmlFor="cpuLimit">vCPU's</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number" min="1" onChange={(e) => this.updateSolver("cpuLimit", Number(e.target.value), key)} min="0" defaultValue={solver.cpuLimit} id="cpuLimit" name="cpuLimit"/>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="memoryLimit">Memory [mb] (0 = not set)</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number" onChange={(e) => this.updateSolver("memoryLimit", Number(e.target.value), key)} min="0" defaultValue={solver.memoryLimit} id="memoryLimit" name="memoryLimit"/>
                            </div>
                            <div className="col-sm-4">
                                <label htmlFor="timeLimit">Time limit [ms] (0 = not set)</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number" onChange={(e) => this.updateSolver("timeLimit", Number(e.target.value), key)} min="0" defaultValue={solver.timeLimit} id="timeLimit" name="timeLimit"/>
                            </div>
                        </div>
                    </div>)
                    }
                <div className="btn-group mr-2" role="group">
                    <button onClick={() => this.save()} className="btn btn-primary mt-2">Save</button>
                    <button onClick={() => this.addSolver()} className="btn btn-secondary mt-2">New solver</button>
                </div>
            </div>);
    }
}

export default withRouter(NewRunPage);