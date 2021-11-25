import React, {useState} from "react";
import {HashRouter as Router, Switch, Route} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";
import EditModelPage from "./components/EditModelPage";

import {API} from "./helpers";

export default function App()
{
  const [authToken, setAuthTokenState] = useState(true);

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