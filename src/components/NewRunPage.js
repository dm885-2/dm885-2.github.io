import React from "react";
import {API, solvers} from "../helpers";

export default class NewRunPage extends React.Component {
    newSolver = {
        solver: solvers[0],
        flagA: false,
        flagF: false,
        flagP: 1,
    };

    state = {
        models: [{
            key: 2132,
            name: "solveExam",
            size: 13132
        },{
            key: 2133,
            name: "solveExam1",
            size: 13133,
        }],
        data: [{
            key: 2132,
            name: "data",
            size: 13132
        },{
            key: 2133,
            name: "data1",
            size: 13133,
        }],

        currentModel: 0,
        currentDataset: 0,
        solvers: [],
    };

    updateSolver(key, value, i)
    {
        const solvers = [...this.state.solvers];
        const data = {...solvers[i]};
        data[key] = value;
        solvers[i] = data;
        this.setState({
            solvers,
        });
    }

    addSolver()
    {
        this.setState({
            solvers: [
                ...this.state.solvers,
                {
                    ...this.newSolver
                }
            ]
        });
    }

    async save()
    {
        const data = {
            model: this.state.currentModel,
            dataset: this.state.currentDataset,
            solvers: [...this.state.solvers],
        };
        if(data.model === 0)
        {
            alert("A valid model needs to be choosen");
        }else if(data.dataset === 0)
        {
            alert("A valid dataset needs to be choosen");
        }else if(data.solvers.length === 0)
        {
            alert("You need atleast one solver");
        }else{
            const resp = await API.call("POST", "run", data);
            if(resp && !resp.error)
            {
                alert("Your run has been saved!");
                this.props.navigate("/");
            }else{
                alert("Something went wrong, try again.");
            }
        }
    }

    render()
    {
        return (<div className="container pt-4">
                    <h1>New run</h1>
                    <label>Model:</label>
                    <div className="dropdown">
                        <select className="form-select form-select-lg mb-2" onChange={(e) => this.setState({currentModel: Number(e.target.value)})} defaultValue={this.state.currentModel} aria-label=".form-select-lg" style={{ width: '40%' }}>
                            <option value="0">Choose a model</option>
                            {this.state.models.map(model => (
                                <option value={model.key}>{model.name}</option>
                            ))}
                        </select>
                    </div>
                    <label>Dataset:</label>
                    <div className="dropdown">
                        <select className="form-select form-select-lg mb-2" onChange={(e) => this.setState({currentDataset: Number(e.target.value)})} defaultValue={this.state.currentDataset} aria-label=".form-select-lg" style={{ width: '40%' }}>
                            <option value="0">Choose a dataset</option>
                            {this.state.data.map(data => (
                                <option value={data.key}>{data.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    {
                        this.state.solvers.map((solver, key) => <div className="pt-4 pb-4 border-top" key={key}>
                        <label htmlFor="solver">
                            <h5>Solver #{key + 1}</h5>
                        </label>
                        <select onChange={(e) => this.updateSolver("solver", e.target.value, key)} className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" id="solver">
                            {
                                solvers.map(solver => <option value={solver}>{solver}</option>)
                            }
                        </select>
                        <h6>Flags</h6>
                        <div className="row">
                            <div className="col-sm-4">
                                <label htmlFor="flagA">All solutions?</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="checkbox" id="flagA" onChange={(e) => this.updateSolver("flagA", e.target.checked, key)} defaultChecked={solver.flagA} name="flagA"/>
                            </div>

                            <div className="col-sm-4">
                                <label htmlFor="flagF">Free search?</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="checkbox" onChange={(e) => this.updateSolver("flagF", e.target.checked, key)} id="flagF" defaultChecked={solver.flagF} name="flagF"/>
                            </div>

                            <div className="col-sm-4">
                                <label htmlFor="flagP">Threads</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number" onChange={(e) => this.updateSolver("solver", Number(e.target.value), key)} min="0" defaultValue={solver.flagP} id="flagP" name="flagP"/>
                            </div>
                        </div>
                    </div>)
                    }
                <button onClick={() => this.save()}>Save</button>
                <button onClick={() => this.addSolver()}>New solver</button>
            </div>);
    }
}


// Create a new component that will produce some HTML where a user can choose multiple Solver from a dropdown and also give a text input for some flags to set.


// const NewRunPagex = () => {
//     const [inputFields, setInputField] = useState([
//         {id:uuidv4(),solver:'', flag:''},
//     ]);

//     const [models, setModels] = useState([
        // {
        //     key: 2132,
        //     name: "solveExam",
        //     size: 13132}, 
        // {
        //     key: 2133,
        //     name: "solveExam1",
        //     size: 13133,
        // }
//     ]);

//     const [data, setData] = useState([
//         {
//             key: 2132,
//             name: "data",
//             size: 13132}, 
//         {
//             key: 2133,
//             name: "data1",
//             size: 13133,
//         }
//     ]);
  

//     const setSolver = (id, e) => {
//         e.preventDefault();
//         const newInputFields = inputFields.map(i => {
//             if(id === i.id) {
//               i[e.target.solver] = e.target.value
//             }
//             return i;
//           })
          
//           setInputField(newInputFields);

//         }

//     const setFlags= (id, e) => {
//         e.preventDefault();
//         const newInputFields = inputFields.map(i => {
//             if(id === i.id) {
//               i[e.target.flag] = e.target.value
//             }
//             return i;
//           })
              
//           setInputField(newInputFields);
    
//         }


//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log(inputFields.solver, inputFields.flag);
//     }
//     const removeFields = (id) => {
//         const list  = [...inputFields];
//         list.splice(list.findIndex(v => v.id === id), 1);
//         setInputField(list);
//     }
//     const addFields = () => {
//         setInputField([...inputFields, {id:uuidv4(),solver:'', flag:''}]);
//     }

//     return (
//     <div className="container pt-4">
//         <form onSubmit={handleSubmit}>
//             <h1>New run</h1>
//             <h4>Please choose the model the solvers should work with </h4>
//             <div className="dropdown">
//                 <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" style={{ width: '40%' }}>
//                     {this.state.models.map(model => (
//                         <option value={model.name}>{model.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <h4>Please choose the data the solvers should work with </h4>
//             <div className="dropdown">
//                 <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" style={{ width: '40%' }}>
//                     {this.state.data.map(data => (
//                         <option value={data.name}>{data.name}</option>
//                     ))}
//                 </select>
//             </div>
//             <br></br>
//             {[].map(inputField => (
//                 <div key={inputField.id}>
//                     <label>
//                         <h5>Choose solver:</h5>
//                         <select className="form-select form-select-lg mb-2" aria-label=".form-select-lg example" id="solver" value={inputFields.solver} onChange={e => setSolver(inputField.id, e)}>
//                             <option value="">Select solver</option>
//                             <option value="solver1">Solver 1</option>
//                             <option value="solver2">Solver 2</option>
//                             <option value="solver3">Solver 3</option>
//                         </select>
//                     </label>
//                     <label>
//                         Set flags:
//                         <input id="flags" value={inputFields.flags} onChange={e => setFlags(inputField.id, e)} />
//                     </label>
//                     <label>
//                         <i className="bi bi-plus" onClick={addFields}></i>
//                         <i className="bi bi-x" onClick={() => removeFields(inputField.id)}></i>
//                     </label>

//                 </div>

//             ), this)}
//             <input type="submit" value="Submit" />
//         </form>
//     </div>
//     );
// }

// // export default NewRunPage;
