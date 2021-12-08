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
                "Content-Type": "application/json",
                ...headers,
            },
            body: body ? JSON.stringify(body) : undefined,
        })
        .then(d => d.json())
        .catch(e => false);
    }

    static async call(method = "GET", endpoint, body = {}, headers = {})
    {
        const data = await API.rawCall(method, endpoint, {
            Authorization: API.authToken ?? undefined,
            ...headers,
        }, body);

        if(!data && API.refreshToken) // Auth token expired, refresh it and retry
        {
            await API.getAccessToken();
            return await api(method, endpoint, data);
        }else{
            return data;
        }
    }

    static async getAccessToken()
    {
        const data = await API.rawCall("POST", "auth/accessToken", {}, {
            token: API.refreshToken,
        });
        if(data)
        {
            API.accessToken = data.token;
        }else{
            API.refreshToken = false;
        }
    }
}

export const solvers = ["Gecode", "OR-tool"];