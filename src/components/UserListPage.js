import React from "react";
import {withRouter} from "react-router";
import {API} from "../helpers";



class UserListPage extends React.Component {
    
    state = {
        user: []
       
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
        API.call("get", "users").then(resp => {
            if(resp && !resp.error)
            {
                this.setState({
                    user: resp.data,
                });
            }
        });
    }
    isInt(str) {
        return /^\+?(0|[1-9]\d*)$/.test(str);
    }
    render()
    {
        return (
            <div className="container pt-4">
                <div className="row">
                    <div className="col-md-12">
                        <h1>User List</h1>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Username</th>
                                    <th>Rank</th>
                                    <th></th>
                                    <th></th>
                                    <th>Resource limit [vCPUs]</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.user.map(user => {
                                        return (
                                            <tr key={user.id}>
                                                <td>{user.id}</td>
                                                <td>{user.email}</td>
                                                <td>{user.rank}</td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        API.call("DELETE", `users/${user.id}`).then(resp => {
                                                            if(resp && !resp.error)
                                                            {
                                                                this.getData();
                                                            }
                                                        });
                                                    }}>Delete</button>
                                                </td>
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => {
                                                        API.call("PUT", `users/${user.id}/stop`).then(resp => {
                                                            if(resp && !resp.error)
                                                            {
                                                                this.getData();
                                                            }
                                                        });
                                                    }}>Stop queue</button>
                                                </td>
                                                <td> 
                                                    <button className="btn btn-secondary" onClick={() => {
                                                        const enteredLimit = prompt('Set recourse limit for user: ' + user.email, user.solverLimit);
                                                        if (this.isInt(enteredLimit) === true){
                                                            API.call("PUT", `/users/${user.id}/recourseLimit/${enteredLimit}`).then(resp => {
                                                                    if(resp && !resp.error)
                                                                    {
                                                                        this.getData();
                                                                        alert(`The recourse limit for user ${user.email} has been updated to ${enteredLimit}.`);
                                                                    }
                                                            })
                                                        
                                                        
                                                        }else{
                                                            alert(`The recourse limit for user ${user.email} has not been updated. Please enter a valid number.`)
                                                        }
                                                    }}>Change ({user.solverLimit})</button></td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    
        

        
    }

}export default withRouter(UserListPage);