const IP = "localhost:8080"; // Gateway IP

export function api(method = "GET", endpoint, data, token = false){
    return fetch(`http://${IP}/${endpoint}`, {
        method,
        headers: {
            // TODO: Token auth headers
        },
        body: data ? JSON.stringify(data) : undefined,
    });
}

export function getInputValues(elements)
{
    return [...elements].reduce((obj, curr) => {
        if(curr.name)
        {
            obj[curr.name] = curr.value;
        }
        return obj;
    }, {});
}

export class API {
    static authToken = false;
    static refreshToken = false;

    static rawCall(method, endpoint, headers = {}, body)
    {
       return fetch(`http://${IP}/${endpoint}`, {
            method,
            headers: {
                ...headers,
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        })
        .then(d => d.json())
        .catch(_ => false);
    }

    static async call(method = "GET", endpoint, body = {})
    {
        const data = await API.rawCall(method, endpoint, {
            Authorization: API.authToken ?? undefined,
        }, body);
        if(!data && API.refreshToken) // Auth token expired, refresh it and retry
        {
            await API.refreshToken();
            return await api(method, endpoint, data);
        }else{
            return data;
        }
    }

    static async refreshToken()
    {
        const data = await API.rawCall("GET", "refreshToken", {}, {
            refreshToken: API.refreshToken,
        });
        if(data)
        {
            API.refreshToken = data.token;
        }else{
            API.refreshToken = false;
        }
    }
}

export const solvers = ["Gecode", "OR-tool"];