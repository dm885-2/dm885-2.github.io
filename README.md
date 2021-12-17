# Website

## Endpoints used

### Runs
#### GET `/run` - Gets the runs from the user
Response:
```
{
    data: [{
        id: Number,
        time: Unix,
        status: Number
    }]
}
```

#### POST `/run` - Adds a run to the DB
Body:
```
{
    model: Number,
    dataset: Number,
    solvers: [{
        solver: String,
        flagA: Boolean,
        flagF: Boolean,
        flagP: Number,
    }],
}
```
Response:
```
{
    error: Boolean
}
```

### Models
#### GET `/model` - Gets all models-metadata
Response:
```
{
    data: [{
        name: string,
        id: number,
    }]
}
```

#### POST `/model` - Adds the given model
Body:
```
{
    name: string,
    content: string,
}
```
Response:
```
{
    error: Boolean
}
```
#### PUT `/model/:id` - Updates the given model
Body:
```
{
    name: string,
    content: string,
}
```
Response:
```
{
    error: Boolean
}
```

#### DELETE `/model/:id` - Deletes the model

#### GET `/model/:id` - Gets the model
Response:
```
{
    name: string,
    content: string,
    id: number,
}
```

### Data
#### GET `/data` - Gets all datas-metadata
Response:
```
{
    data: [{
        name: string,
        id: number,
    }]
}
```

#### POST `/data` - Adds the given data
Body:
```
{
    name: string,
    content: string,
}
```
Response:
```
{
    error: Boolean
}
```
#### PUT `/data/:id` - Updates the given data
Body:
```
{
    name: string,
    content: string,
}
```
Response:
```
{
    error: Boolean
}
```

#### DELETE `/data/:id` - Deletes the data

#### GET `/data/:id` - Gets the data
Response:
```
{
    name: string,
    content: string,
    id: number,
}
```


### Solvers
#### GET `/solvers` - Gets all solvers-metadata
Response:
```
{
    data: [{
        name: string,
        id: number,
        docker_image: string,
    }]
}
```

#### POST `/solvers` - Adds the given solver
Body:
```
{
    name: string,
    docker_image: string,
}
```
Response:
```
{
    error: Boolean
}
```
#### PUT `/solvers/:id` - Updates the given solver
Body:
```
{
    name: string,
    docker_image: string,
}
```
Response:
```
{
    error: Boolean
}
```

#### DELETE `/solvers/:id` - Deletes the solver


### Authentication

#### POST `/auth/login` - Signs in the user
Body:
```
{
    username: string,
    password: string,
}
```
Response:
```
{
    error: Boolean,
    accessToken?: String,
    userRank?: Number,
}
```

#### POST `/auth/signup` - Signs up the user
Body:
```
{
    username: string,
    password: string,
}
```
Response:
```
{
    error: Boolean,
}
```
