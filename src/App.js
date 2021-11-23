import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";

export default class App extends React.Component {
  state = {
    authToken: true,
  };

  render()
  {
    return (<Router>
    {
      this.state.authToken ?
      <Routes>
        <Route exact path="/" element={<HistoryPage />}/>
        <Route exact path="/newRun" element={<NewRunPage />}/>
      </Routes>
      : <Routes>
        <Route exact path="/" element={<LoginPage setAuthtoken={authToken => this.setState({authToken})} />}/>
      </Routes>
    }
</Router>);
  }
}
