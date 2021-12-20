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
            <iframe
              src="http://34.88.95.145/d/Kn5xm-gZk/rabbitmq-overview?orgId=1&refresh=15s&from=1639999832287&to=1640000732287&theme=light"
              title="RabbitMQ Grafana Dashboard"
              width="100%"
              height="100%"/>
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
