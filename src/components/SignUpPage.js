import React from "react";
import {withRouter} from "react-router";
import {Link} from "react-router-dom";

import Spinner from "./UI/Spinner";

import {API, getInputValues} from "../helpers";

class SignUpPage extends React.Component {
    state = {
        loading: false,
    };

    /**
     * Checks the userdata, and signs the user up if correct.
     * @param SubmitEvent e 
     */
    async signUp(e)
    {
        e.preventDefault();
        this.setState({
            loading: true,
        });
        const userInput = getInputValues(e.target.elements);
        
        if(userInput.username.length === 0)
        {
            alert("A username is required");
        }else if(userInput.password.length === 0)
        {
            alert("A password is required");
        }else if(userInput.password !== userInput.passwordRepeat){
            alert("The two given password are not the same");
        }else{
            const data = await API.call("POST", "auth/login", userInput);
            this.setState({
                loading: false,
            });
            if((data && !data.error)) // TODO: remove after servercheck
            {
                // this.props.setAuthtoken(data.accessToken ?? 1); // TODO: remove after servercheck
                alert("Your user has been created!");
                this.props.history.push("/");
            }else{
                alert("A unkown error orcurred, try again");
            }
        }
    }

    render(){
        return (<div className="d-flex justify-content-center align-items-center vh-100">
            <Spinner visible={this.state.loading} />
            <form onSubmit={e => this.signUp(e)} className="d-flex flex-column align-self-center w-25">
                <label>Username:</label>
                <input name="username" required className="form-control" type="input"/>
                <label>Password:</label>
                <input name="password" required className="form-control" type="password"/>
                <label>Repeat password:</label>
                <input name="passwordRepeat" required className="form-control" type="password"/>
                <button className="btn btn-primary mt-3">
                    Create account
                </button>
                <div className="d-flex justify-content-center pt-2">
                    <Link to="/">Go back</Link>
                </div>
            </form>
        </div>);
    }
}

export default withRouter(SignUpPage);