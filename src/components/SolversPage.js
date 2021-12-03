import React from "react";

import {API} from "../helpers.js";

export default class SolversPage extends React.Component {
    state = {
        solvers: [{
            id: 10,
            name: "test",

        }],

        editing: 0,
    };

    componentDidMount()
    {
        this.getData();
    }

    async getData()
    {
        const data = await API.call("GET", "/solvers");
        if(data && !data.error)
        {
            this.setState({
                data: data.data,
            });
        }
    }

    async delete(id)
    {
        const check = window.confirm("Are you sure you want to delete it?");
        if(check)
        {
            await API.call("DELETE", "/solvers/" + id);
            await this.getData();
        }
    }

    async upload(e)
    {
        const file = e.target.files[0];
        let data = new FormData();
        data.append('file', file);

        const resp = await API.call("PUT", "/solvers/" + this.state.editing + "/image", data, {
            "Content-Type": "application/x-www-form-urlencoded",
        });
        if(resp && !resp.error)
        {
            alert("The file has been uploaded!");
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
                    <div className="row">
                        <div className="col-sm-2">
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="col-sm-10 pb-1">
                            <input className="form-control" name="name" defaultValue={editingData.name} />
                        </div>
                        <div className="col-sm-2">
                            <label htmlFor="name">Image</label>
                        </div>
                        <div className="col-sm-10">
                            <input className="form-control" type="file" name="name" disabled={isNew} accept=".png,.jpg" onChange={(e) => this.upload(e)} />
                        </div>
                    </div>
                    <button onClick={() => this.setState({editing: "new"})} className="btn btn-light">Save</button>
                </div>
            }
            <h1>Solvers</h1>
            <button onClick={() => this.setState({editing: "new"})} className="btn btn-primary">New solver</button>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.solvers.map((data, key) => <tr key={data.id}>
                            <th scope="row">{data.id}</th>
                            <td>{data.name}</td>
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