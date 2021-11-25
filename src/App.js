import React, {useState} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";
import EditModelPage from "./components/EditModelPage";
import EditDataPage from "./components/EditDataPage";

import {API} from "./helpers";

export default function App()
{
  const [authToken, setAuthTokenState] = useState(false);

  /**
   * Sets the AuthToken.
   * @param string token the authToken
   */
  const setAuthToken = (token) => {
    API.authToken = token;
    setAuthTokenState(token);
  };

  return (<Router>
        {
          authToken ?
            <Switch>
              <Route path="/newRun">
                <NewRunPage/>
              </Route>
              <Route path="/model/:id">
                <EditModelPage/>
              </Route>
              <Route path="/data/:id">
                <EditDataPage/>
              </Route>
              <Route path="*">
                <HistoryPage />
              </Route>
            </Switch>
            : <Switch>
              <Route path="*">
                <LoginPage setAuthtoken={t => setAuthToken(t)} />
              </Route>
            </Switch>
      }
      </Router>);
}