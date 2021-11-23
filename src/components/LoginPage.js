import React from "react";

import {API} from "../helpers";

export default class LoginPage extends React.Component {

    async checkLogin(e)
    {
        e.preventDefault();
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
            this.props.setAuthtoken(data.accessToken ?? 1); // TODO: remove after servercheck
        }
    }

    render(){
        console.log("Hey", this.props);
        return (<form onSubmit={e => this.checkLogin(e)}>
            <label>Username:</label>
            <input name="username" type="input"/>
            <label>Password:</label>
            <input name="password" type="password"/>
            <button>Signin</button>
        </form>);
    }
}