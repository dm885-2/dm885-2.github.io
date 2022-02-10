export const IP = process.env?.apiURL ?? ((!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && 0 ? "http://localhost:8080" : "https://tigris.club/dm885api"); // Gateway IP

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
    static accessToken = false;

    static rawCall(method, endpoint, headers = {}, body)
    {
       return fetch(`${IP}/${endpoint}`, {
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
                "Authorization": API.accessToken ? `Bearer ${API.accessToken}` : undefined,
            },
            body: body ? JSON.stringify(body) : undefined,
        })
        .then(d => d.status === 404 ? {error: true} : d.json()) // Dont try to refresh accessToken on 404
        .catch(e => {
            console.error(`${IP}/${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                    "Authorization": API.accessToken ? `Bearer ${API.accessToken}` : undefined,
                },
                body: body ? JSON.stringify(body) : undefined,
            }, e);
            return false;
        });
    }

    static async call(method = "GET", endpoint, body, headers = {})
    {
        const data = await API.rawCall(method, endpoint, {
            Authorization: API.authToken ?? undefined,
            ...headers,
        }, body);

        if(!data && API.refreshToken) // Auth token expired, refresh it and retry
        {
            await API.getAccessToken();
            return (await API.call(method, endpoint, body, headers));
        }else{
            return data;
        }
    }

    static async getAccessToken()
    {
        const data = await API.rawCall("POST", "auth/accessToken", {}, {
            refreshToken: API.refreshToken,
        });
        if(data && !data.error)
        {
            API.accessToken = data.accessToken;
        }else{
            API.refreshToken = false;
        }
    }
}

export const solvers = ["Gecode", "OR-tool"];
export const statuses = ["In queue", "Computing", "Completed"];