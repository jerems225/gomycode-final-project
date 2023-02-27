
 
const fetch = require('node-fetch');

async function postRequest(prefix, params, headers) {
    const URL = `${process.env.REACT_APP_API_BASE_URL}${prefix}`;
    const request = await fetch(URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(params),
    });
    const data = await request.json();

    return data;
}

async function getRequest(prefix, params, headers) {
    const URL = `${process.env.REACT_APP_API_BASE_URL}${prefix}${params}`;
    const request = await fetch(URL, {
        method: 'GET',
        headers: headers,
    });
    const data = await request.json();

    return data;
}

export { postRequest, getRequest };