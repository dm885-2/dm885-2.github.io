import React from "react";

import {API, getInputValues} from "../helpers.js";

export default class SolversPage extends React.Component {
    state = {
        solvers: [],
        editing: false,
    };

    componentDidMount()
    {
        this.getData();
    }

    async getData()
    {
        const data = await API.call("GET", "solvers");
        if(data && !data.error)
        {
            this.setState({
                solvers: data.data,
            });
        }
    }

    async delete(id)
    {
        const check = window.confirm("Are you sure you want to delete it?");
        if(check)
        {
            await API.call("DELETE", "solvers/" + id);
            await this.getData();
        }
    }

    async save(e)
    {
        e.preventDefault();
        const data = getInputValues(e.target.elements);
        const isEditing = typeof this.state.editing === "number";
        const resp = await (isEditing ? API.call("PUT", "solvers/" + this.state.editing, data) : API.call("POST", "solvers", data));
        if(resp && !resp.error)
        {
            this.setState({
                editing: false,
            });
            this.getData();
        }else{
            alert("A unkown error happened, try again");
        }
    }

    render()
    {
        const isEditing = typeof this.state.editing === "number";
        const isNew = this.state.editing === "new";
        const editingData = isEditing ? this.state.solvers[this.state.editing] : {};

        return <div className="container-fluid">
            {
                (isEditing || isNew) && <div className="pb-2 mb-2 border-bottom">
                    <h1>{isEditing ? "Editing solver" : "New solver"}</h1>
                    <form onSubmit={e => this.save(e)}>
                        <div className="row">
                            <div className="col-sm-2">
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="col-sm-10 pb-1">
                                <input className="form-control" name="name" required={true} defaultValue={editingData?.name} />
                            </div>
                            <div className="col-sm-2">
                                <label htmlFor="name">Image</label>
                            </div>
                            <div className="col-sm-10">
                                <input className="form-control" name="docker_image" required={true} defaultValue={editingData?.docker_image} />
                            </div>
                        </div>
                        <button className="btn btn-light">Save</button>
                    </form>
                </div>
            }
            <h1>Solvers</h1>
            <button onClick={() => this.setState({editing: "new"})} className="btn btn-primary">New solver</button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.solvers.map((data, key) => <tr key={data.id}>
                            <th scope="row">{data.id}</th>
                            <td>{data.name}</td>
                            <td>{data.docker_image}</td>
                            <td>
                                <button onClick={() => this.setState({editing: key})} className="btn m-1 mt-0 mb-0 btn-secondary">Edit</button>
                                <button onClick={() => this.delete(data.id)} className="btn btn-danger">Delete</button>
                            </td>
                        </tr>)
                    }
                </tbody>
                </table>
        </div>
    }
}