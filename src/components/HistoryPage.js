import React from "react";

export default class HistoryPage extends React.Component {
    state = {
        history: [{
            status: 1,
            timestamp: 1637064108663,
        }]
    };

    render()
    {
        return (<div className="d-flex justify-content-center">
            Eksempel side! Der er {this.state.history.length} element(er) i historikken!
        </div>);
    }
}