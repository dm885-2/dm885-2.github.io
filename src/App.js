import React, {useState} from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import UserListPage from "./components/UserListPage";
import SolversPage from "./components/SolversPage";
import SignUpPage from "./components/SignUpPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";
import EditModelPage from "./components/EditModelPage";
import EditDataPage from "./components/EditDataPage";
import LogPage from "./components/LogPage";

import {API} from "./helpers"

export default function App()
{
  const [refreshToken, setRefreshTokenState] = useState(false);
  const [userRank, setUserRank] = useState(1);

  /**
   * Sets the RefreshToken.
   * @param string token the authToken
   */
  const setRefreshToken = (token) => {
    API.refreshToken = token;
    setRefreshTokenState(token);
  };

  return (<Router>
        {
          refreshToken ?
            <>
              {
                userRank > 0 && <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light">
                  <Link className="navbar-brand" to="/">MiniZinc</Link>

                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                      <li className="nav-item active">
                        <Link className="nav-link" to="/">Jobs</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/users">Users</Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/solvers">Solvers</Link>
                      </li>

                      <li className="nav-item">
                        <Link className="nav-link" to="/log">Logs</Link>
                      </li>
                    </ul>
                  </div>
                </nav>
              }

              <Switch>
              <Route path="/" exact={true}>
                <HistoryPage />
              </Route>
              <Route exact={true} path="/newRun">
                <NewRunPage/>
              </Route>
              {
                userRank > 0 && <>
                  <Route exact={true} path="/users">
                    <UserListPage/>
                  </Route>
                  <Route exact={true} path="/solvers">
                    <SolversPage/>
                  </Route>
                </>
              }
              <Route exact={true} path="/model/:id">
                <EditModelPage/>
              </Route>
              <Route exact={true} path="/data/:id">
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
                <LoginPage setRefreshToken={(t, rank = 0) => {
                  setUserRank(rank);
                  setRefreshToken(t);
                }} />
              </Route>
            </Switch>
      }
      </Router>);
}
