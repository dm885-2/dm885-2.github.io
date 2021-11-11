import React from "react";

import {api} from "../helpers";

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
        console.log(values);

        const data = await api("POST", "login", values);
        console.log("Login response", data);
    }

    render(){
        return (<form onSubmit={e => this.checkLogin(e)}>
            <label>Username:</label>
            <input name="username" type="input"/>
            <label>Password:</label>
            <input name="password" type="password"/>
            <button>Signin</button>
        </form>);
    }
}