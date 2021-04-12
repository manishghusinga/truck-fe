const GET_HEADER = {
    method: 'GET',
}

const POST_HEADER = {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

const DELETE_HEADER = {
    method: 'DELETE',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

const PUT_HEADER = {
    method: 'PUT',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    },
}

function handleErrors(response) {
    let method = [200, 400, 201, 204]
    console.log("response.status", response.status)
    if (method.includes(response.status)) {
        return response.json() || "success";
    } 
    throw Error(response.statusText);
}

export const apiService = {
    getApiData: (url) => {
        let _url = "https://reqres.in/api" + url;
        return fetch(_url, GET_HEADER)
            .then(handleErrors)
            .catch(error => ({ success: false, data: [] }));
    },
    postApiData: (url, payload) => {
        let _url = "https://reqres.in/api" + url;
        let options = { ...POST_HEADER };
        options.body = JSON.stringify(payload);
        return fetch(_url, options)
            .then(handleErrors)
            .catch(error => ({ success: false, data: [] }));
    },
    deleteApiData: (url) => {
        let _url = "https://reqres.in/api" + url;
        let options = { ...DELETE_HEADER };
        return fetch(_url, options)
            .then(resp => resp)
            .catch(error => ({ success: false, data: [{error: error}] }));
    },
    putApiData: (url, payload) => {
        let _url = "https://reqres.in/api" + url;
        let options = { ...PUT_HEADER };
        options.body = JSON.stringify(payload);
        return fetch(_url, options)
            .then(handleErrors)
            .catch(error => ({ success: false, data: [{error: error}] }));
    },
    handleErrors
}