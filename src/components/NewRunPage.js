import React,   {useState} from "react";
import { v4 as uuidv4 } from 'uuid';



// Create a new component that will produce some HTML where a user can choose multiple Solver from a dropdown and also give a text input for some flags to set.


const NewRunPage = () => {
    const [inputFields, setInputField] = useState([
        {id:uuidv4(),solver:'', flag:''},
    ]);

    const [models, setModels] = useState([
        {
            key: 2132,
            name: "solveExam",
            size: 13132}, 
        {
            key: 2133,
            name: "solveExam1",
            size: 13133,
        }
    ]);

    const [data, setData] = useState([
        {
            key: 2132,
            name: "data",
            size: 13132}, 
        {
            key: 2133,
            name: "data1",
            size: 13133,
        }
    ]);
  

    const setSolver = (id, e) => {
        e.preventDefault();
        const newInputFields = inputFields.map(i => {
            if(id === i.id) {
              i[e.target.solver] = e.target.value
            }
            return i;
          })
          
          setInputField(newInputFields);

        }

    const setFlags= (id, e) => {
        e.preventDefault();
        const newInputFields = inputFields.map(i => {
            if(id === i.id) {
              i[e.target.flag] = e.target.value
            }
            return i;
          })
              
          setInputField(newInputFields);
    
        }


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputFields.solver, inputFields.flag);
    }
    const removeFields = (id) => {
        const list  = [...inputFields];
        list.splice(list.findIndex(v => v.id === id), 1);
        setInputField(list);
    }
    const addFields = () => {
        setInputField([...inputFields, {id:uuidv4(),solver:'', flag:''}]);
    }

    return (
        <form onSubmit={handleSubmit}>
            <h4>Please choose the model the solvers should work with </h4>
            <div class="dropdown">
                <select class="form-select form-select-lg mb-2" aria-label=".form-select-lg example" style={{ width: '40%' }}>
                    {models.map(model => (
                        <option value={model.name}>{model.name}</option>
                    ))}
                </select>
            </div>
            <h4>Please choose the data the solvers should work with </h4>
            <div class="dropdown">
                <select class="form-select form-select-lg mb-2" aria-label=".form-select-lg example" style={{ width: '40%' }}>
                    {data.map(data => (
                        <option value={data.name}>{data.name}</option>
                    ))}
                </select>
            </div>
            <br></br>
                {inputFields.map(inputField => (
                    <div key={inputField.id}>
                        <label>
                            <h5>Choose solver:</h5>
                            <select class="form-select form-select-lg mb-2" aria-label=".form-select-lg example" id="solver" value={inputFields.solver} onChange={e => setSolver(inputField.id, e)}>
                                <option value="">Select solver</option>
                                <option value="solver1">Solver 1</option>
                                <option value="solver2">Solver 2</option>
                                <option value="solver3">Solver 3</option>
                            </select>
                        </label>
                        <label>
                            Set flags:
                            <input id="flags" value={inputFields.flags} onChange={e => setFlags(inputField.id, e)} />
                        </label>
                        <label>
                            <i class="bi bi-plus" onClick={addFields}></i>
                            <i class="bi bi-x" onClick={() => removeFields(inputField.id)}></i>
                        </label>

                    </div>

                ), this)}
                <input type="submit" value="Submit" />
            </form>
    );
}

export default NewRunPage;
