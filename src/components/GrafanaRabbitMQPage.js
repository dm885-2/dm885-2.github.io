import React from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';

class GrafanaRabbitMQPage extends React.Component {

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <br/>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/grafana/RabbitMQ">RabbitMQ</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grafana/MySQL">MySQL</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/grafana/Kubernetes">Kubernetes</Link>
              </li>
            </ul>
            <br/>
            <a role="button" target="_blank"
               href="https://grafana.smessie.com/d/Kn5xm-gZk/rabbitmq-overview?orgId=1&refresh=15s"
               className="btn btn-primary">Open RabbitMQ Grafana Dashboard</a>
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

export default withRouter(GrafanaRabbitMQPage);
