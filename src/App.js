import React from "react";
import {HashRouter, Routes, Route} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";

import {API} from "./helpers";

export default class App extends React.Component {
  state = {
    authToken: false,
  };

  /**
   * Sets the AuthToken.
   * @param string token the authToken
   */
  setAuthtoken(token)
  {
    API.authToken = token;
    this.setState({
      authToken: token
    });
  }

  render()
  {
    return (<HashRouter>
    {
      this.state.authToken ?
      <Routes>
        <Route path="/" element={<HistoryPage />}/>
        <Route path="/newRun" element={<NewRunPage />}/>
      </Routes>
      : <Routes>
        <Route path="*" element={<LoginPage setAuthtoken={t => this.setAuthtoken(t)} />}/>
      </Routes>
    }
</HashRouter>);
  }
}
