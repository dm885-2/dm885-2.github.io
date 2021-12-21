import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

class GrafanaKubernetesPage extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br/>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link" to="/grafana/RabbitMQ">RabbitMQ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grafana/MySQL">MySQL</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/grafana/Kubernetes">Kubernetes</Link>
              </li>
            </ul>
            <br/>
            <a role="button" target="_blank"
               href="https://grafana.smessie.com/d/6581e46e4e5c7ba40a07646395ef7b23/kubernetes-compute-resources-pod?orgId=1&refresh=10s"
               className="btn btn-primary">Open Kubernetes Grafana Dashboard</a>
          </div>
        </div>
      </div>
    );
  }

  state =
    {}
  ;

  componentDidMount() {
    // Nothing.
  }
  ;

}

export default withRouter(GrafanaKubernetesPage);
