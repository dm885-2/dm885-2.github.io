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