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

export class API {
    static authToken = false;
    static refreshToken = false;

    static rawCall(method, endpoint, headers = {}, data)
    {
       return fetch(`http://${IP}/${endpoint}`, {
            method,
            headers,
            body: data ? JSON.stringify(data) : undefined,
        })
        .then(d => d.json())
        .catch(_ => false);
    }

    static async call(method = "GET", endpoint, data = {})
    {
        const data = await API.rawCall(method, endpoint, {
            Authorization: API.authToken ?? undefined,
        }, data);
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