import React from "react";

export default class HistoryPage extends React.Component {
    state = {
        history: [{
            status: 1,
            timestamp: 1637064108663,
            key: 1,
        }],
        models: [{
            key: 2132,
            name: "solveExam",
            size: 13132,
        }],

        data: [{
            key: 132,
            name: "data.dzn",
            size: 13132,
        }]
    };
    
    render()
    
    
    {
        function trash () { 
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>
            }
        function up(){
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"/>
            <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
          </svg>
        }
        
        return (
            //Move table to only  tage 2/3 of the left part of the page
            <div className="container">
                
               
                <div className="row align-items-start">
                    <div className="col-md-12">
                        <div className="card card-body">
                            <h3 className="text-center">History</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Time</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.history.map(history => (
                                        <tr key={history.key}>
                                            <td>{history.key}</td>
                                            <td>{new Date(history.timestamp).toLocaleString()}</td>
                                            <td>{history.status === 0 ? "Closed" : "Open"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div class="d-grid gap-2">
                        <button type="button" className="btn btn-primary" >
                            Start new run!
                        </button>
                    </div>
                </div>
                <br></br>
                <br></br>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card card-body">
                            <h3 className="text-center">Models</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Size</th>
                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.models.map(models => (
                                        <tr key={models.key}>
                                            <td>{models.key}</td>
                                            <td>{(models.name)}</td>
                                            <td>{models.size}</td>
                                            <td>{trash()}</td>
                                            <td>{up()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div class="d-grid gap-2">
                        <button type="button" className="btn btn-primary" >
                            Create new Model! 
                            
                        </button>
                    </div>
                </div>
                    
                    
                <div className="col-md-6">
                    
                    <div className="card card-body">
                        <h3 className="text-center">Data</h3>
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Name</th>
                                        <th>Size</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.data.map(data => (
                                        <tr key={data.key}>
                                            <td>{data.key}</td>
                                            <td>{data.name}</td>
                                            <td>{data.size}</td>
                                            <td>{trash()}</td>
                                            <td>{up()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div class="d-grid gap-2">
                        <button type="button" className="btn btn-primary" >
                            Create new Data!
                        </button>
                    </div>
                    </div>
                    
                    
                </div>
            </div>
        );
    }
                
           
    
    
}


