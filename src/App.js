import React, {useState} from "react";
import {HashRouter as Router, Routes, Route, useNavigate} from "react-router-dom";

import LoginPage from "./components/LoginPage";
import HistoryPage from "./components/HistoryPage";
import NewRunPage from "./components/NewRunPage";

import {API} from "./helpers";

const withNavigate = WrappedComponent => (props = {}) => {
  const navigate = useNavigate();

  return <WrappedComponent {...props} navigate={navigate} />;
};

export default function App()
{
  return (<Router>
              <AllRoutes/>
        </Router>);
}

function AllRoutes()
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
  return (<>
    {
        authToken ?
        <Routes>
          <Route path="/" element={<HistoryPage />}/>
          <Route path="/newRun" element={withNavigate(NewRunPage)({})}/>
        </Routes>
        : <Routes>
          <Route path="*" element={<LoginPage setAuthtoken={t => setAuthToken(t)} />}/>
        </Routes>
      }
  </>);
}