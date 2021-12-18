import React from "react";
import {withRouter} from "react-router";

import {API, getInputValues} from "../helpers";

const names = ["model", "data"];
class EditModelPage extends React.Component {
    state = {
        name: "",
        content: "",
    };

    async componentDidMount()
    {
        if(this.props.match.params.id !== "new")
        {
            const data = await API.call("GET", `files/${this.props.match.params.id}`);
            if(data && !data.error)
            {
                this.setState({
                    name: data.filename,
                    content: data.data,
                });
            }
        }
    }
  
    /**
     * Validates, and saves the form data.
     */
    async save(e)
    {
        e.preventDefault();
        const inputData = getInputValues(e.target.elements);

        if(inputData.filename.length === 0)
        {
            alert("The name input is required for the " + names[this.props.type]);
        }else if(inputData.data.length === 0)
        {
            alert("The content input is required for the " + names[this.props.type]);
        }else{
            const IS_EDITING = this.props.match.params.id !== "new";
            const route = IS_EDITING ? "files/" + this.props.match.params.id : "files";
            const method = IS_EDITING ? "PUT" : "POST";

            const data = await API.call(method, route, {
                ...inputData,
                filetype: this.props.type,
            });
            if(data && !data.error)
            {
                alert("The " + names[this.props.type] + " has been saved!");
                this.props.history.push("/");
            }else{
                alert("Something went wrong, try again");
            }
        }
    }

    render()
    {
        const typeName = names[this.props.type];
        const IS_EDITING = this.props.match.params.id !== "new";
        return (<div className="container pt-4">
                    <form onSubmit={e => this.save(e)}>
                        <h1>{IS_EDITING ? "Edit " + typeName : "New " + typeName}</h1>
                        <div className="form-group">
                            <label for="nameInp">Name</label>
                            <input type="input" disabled={IS_EDITING} defaultValue={this.state.name} className="form-control" id="nameInp" name="filename" placeholder={`${typeName} name`}/>
                        </div>
                        <div className="form-group">
                            <label for="contentInp">Model</label>
                            <textarea type="input" defaultValue={this.state.content} placeholder={`Contents of ${typeName} itself..`} className="form-control" id="contentInp" name="data"/>
                        </div>
                        <button className="btn btn-primary mt-2">Save</button>
                    </form>
            </div>);
    }
}

export default withRouter(EditModelPage);