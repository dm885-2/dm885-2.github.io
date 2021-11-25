import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

import Spinner from "./UI/Spinner";

import {API} from "../helpers";

class LoginPage extends React.Component {
    state = {
        loading: false,
    };

    /**
     * Checks the credentials, and signs the user in if correct.
     * @param SubmitEvent e 
     */
    async checkLogin(e)
    {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        const values = [...e.target.elements].reduce((obj, curr) => {
            if(curr.name)
            {
                obj[curr.name] = curr.value;
            }
            return obj;
        }, {});

        const data = await API.call("POST", "auth/login", values);
        if((data && !data.error) || 1) // TODO: remove after servercheck
        {
            this.props.history.push("/");
            this.props.setAuthtoken(data.accessToken ?? 1); // TODO: remove after servercheck
        }else{
            this.setState({
                loading: false,
            });
        }
    }

    render(){
        return (<div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner visible={this.state.loading} />
            <form onSubmit={e => this.checkLogin(e)} className="d-flex flex-column align-self-center w-25">
                <label>Username:</label>
                <input name="username" className="form-control" type="input"/>
                <label>Password:</label>
                <input name="password" className="form-control" type="password"/>
                <button className="btn btn-primary mt-3">
                    Sign in
                </button>
                <Link to="/signup">New user</Link>
            </form>
        </div>);
    }
}

export default withRouter(LoginPage);