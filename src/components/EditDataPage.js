import React from "react";
import {withRouter} from "react-router";

import {API, solvers} from "../helpers";

// Create a new component that will produce some HTML where a user can choose multiple Solver from a dropdown and also give a text input for some flags to set.
class EditDataPage extends React.Component {

    state = {
        name: "",
        content: "",
    };

    async componentDidMount()
    {
        if(this.props.match.params.id !== "new")
        {
            const data = await API.call("GET", `/data/${this.props.match.params.id}`);
            if(data && !data.error)
            {
                this.setState({
                    name: data.name,
                    content: data.content,
                });
            }
        }
    }

  

    async save(e)
    {
        e.preventDefault();
        const inputData = [...e.target.elements].reduce((obj, curr) => {
            if(curr.name)
            {
                obj[curr.name] = curr.value;
            }
            return obj;
        }, {});

        if(inputData.name.length === 0)
        {
            alert("The name input is required for the model");
        }else if(inputData.content.length === 0)
        {
            alert("The content input is required for the model");
        }else{
            const IS_EDITING = this.props.match.params.id !== "new";
            const route = IS_EDITING ? "/data/" + this.props.match.params.id : "/data";
            const method = IS_EDITING ? "PUT" : "POST";
            
            const data = await API.call(method, route, inputData);
            if(data && !data.error)
            {
                alert("The model has been saved!");
                this.props.history.push("/");
            }else{
                alert("Something went wrong, try again");
            }
        }
    }

    render()
    {
        const IS_EDITING = this.props.match.params.id !== "new";
        return (<div className="container pt-4">
                    <form onSubmit={e => this.save(e)}>
                        <h1>{IS_EDITING ? "Edit dataset" : "New dataset"}</h1>
                        <div className="form-group">
                            <label for="nameInp">Name</label>
                            <input type="input" defaultValue={this.state.name} className="form-control" id="nameInp" name="name" placeholder="Dataset name"/>
                        </div>
                        <div className="form-group">
                            <label for="contentInp">Data</label>
                            <textarea type="input" defaultValue={this.state.content} placeholder="Contents of data itself.." className="form-control" id="contentInp" name="content"/>
                        </div>
                        <button className="btn btn-primary mt-2">Save</button>
                    </form>
            </div>);
    }
}

export default withRouter(EditDataPage);