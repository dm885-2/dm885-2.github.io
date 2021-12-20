import React, {useState, useEffect} from "react";
import {HashRouter as Router, Switch, Route, Link} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import UserListPage from "./components/UserListPage";
import SolversPage from "./components/SolversPage";
import SignUpPage from "./components/SignUpPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";
import EditFilePage from "./components/EditFilePage";
// import EditModelPage from "./components/EditModelPage";
// import EditDataPage from "./components/EditDataPage";
import LogPage from "./components/LogPage";

import {API, IP} from "./helpers"
import GrafanaRabbitMQPage from './components/GrafanaRabbitMQPage';
import GrafanaMySQLPage from './components/GrafanaMySQLPage';
import GrafanaKubernetesPage from './components/GrafanaKubernetesPage';

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

  const signOut = () => {
    localStorage.removeItem("token" + IP);
    setUserRank(1);
    setRefreshToken(false);
  };

  useEffect(() => {
    const t = localStorage.getItem("token" + IP);
    const r = localStorage.getItem("rank" + IP);
    if(t && r)
    {
      setUserRank(r);
      setRefreshToken(t);
    }
  }, []);

  const AdminRoute = (props) => userRank > 0 && <Route {...props}>
                                    {props.children}
                                  </Route>

  return (<Router>
        {
          refreshToken ?
            <>
              <nav className="container-fluid navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">MiniZinc</Link>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                  <ul className="navbar-nav">
                    <li className="nav-item active">
                      <Link className="nav-link" to="/">Jobs</Link>
                    </li>
                    {
                      userRank > 0 && <>
                        <li className="nav-item">
                          <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                          <Link className="nav-link" to="/solvers">Solvers</Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/log">Logs</Link>
                        </li>

                        <li className="nav-item">
                          <Link className="nav-link" to="/grafana/RabbitMQ">Grafana</Link>
                        </li>
                      </>
                    }
                    <li className="nav-item">
                      <Link className="nav-link" to="/" onClick={signOut}>Sign out</Link>
                    </li>
                  </ul>
                </div>
              </nav>

              <Switch>
              <Route path="/" exact={true}>
                <HistoryPage />
              </Route>
              <Route exact={true} path="/newRun">
                <NewRunPage/>
              </Route>
              <AdminRoute exact={true} path="/users">
                <UserListPage/>
              </AdminRoute>
              <AdminRoute exact={true} path="/solvers">
                <SolversPage/>
              </AdminRoute>
              <AdminRoute exact={true} path="/log">
                <LogPage/>
              </AdminRoute>
              <AdminRoute exact={true} path="/grafana/RabbitMQ">
                <GrafanaRabbitMQPage/>
              </AdminRoute>
              <AdminRoute exact={true} path="/grafana/MySQL">
                <GrafanaMySQLPage/>
              </AdminRoute>
              <AdminRoute exact={true} path="/grafana/Kubernetes">
                <GrafanaKubernetesPage/>
              </AdminRoute>
              <Route exact={true} path="/model/:id">
                <EditFilePage type={0}/>
              </Route>
              <Route exact={true} path="/data/:id">
                <EditFilePage type={1}/>
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
                  localStorage.setItem("token" + IP, t);
                  localStorage.setItem("rank" + IP, rank);
                }} />
              </Route>
            </Switch>
      }
      </Router>);
}
