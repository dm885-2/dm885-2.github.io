import React, {useState} from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import SignUpPage from "./components/SignUpPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";
import EditModelPage from "./components/EditModelPage";
import EditDataPage from "./components/EditDataPage";

import {API} from "./helpers";

export default function App()
{
  const [authToken, setAuthTokenState] = useState(true);
  const [userRank, setuserRankState] = useState(1);

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
            <>
              {
                userRank > 0 && <nav class="container-fluid navbar navbar-expand-lg navbar-light bg-light">
                  <Link class="navbar-brand" to="/">Minisinc</Link>

                  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                  </button>
                  <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">
                      <li class="nav-item active">
                        <Link class="nav-link" to="/">Jobs</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/users">Users</Link>
                      </li>
                      <li class="nav-item">
                        <Link class="nav-link" to="/solvers">Solvers</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              }

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
            </>
            : <Switch>
              <Route path="/signup">
                <SignUpPage />
              </Route>
              <Route path="*">
                <LoginPage setAuthtoken={t => setAuthToken(t)} />
              </Route>
            </Switch>
      }
      </Router>);
}