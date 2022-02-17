function JSONtoFormDataConverter(el) {
    if (el === null || typeof el !== "object" || Array.isArray(el) || el.isFile === false) {
        return JSON.stringify(el);
    }

    delete el.isFile;

    return el;
}

function JSONtoFormData(jsn) {
    const entries = Object.entries(jsn);
    const formData = new FormData();

    for (const [key, value] of entries) {
        if (Array.isArray(value)) {
            for (const el of value) {
                formData.append(key, JSONtoFormDataConverter(el));
            }

            continue;
        }

        formData.append(key, JSONtoFormDataConverter(value));
    }

    return formData;
}

async function fetchh(url, options) {
    const response = await fetch(url, options);

    const { status } = response;
    let payload;
    let error;
    let errors;

    try {
        ({ payload, error, errors } = await response.json());
    } catch (error) { }

    return { status, payload, error, errors };
}

async function post(url, body, { type = "json", options = {} } = {}) {
    options.method = "post";

    if (type === "json") {
        if (!("headers" in options)) {
            options.headers = {};
        }

        options.headers["content-type"] = "application/json";
        body = JSON.stringify(body);
    }
    else if (type === "multipart") {
        body = JSONtoFormData(body);
    }

    return fetchh(url, { ...options, body });
}

async function get(url, { query, options = {} } = {}) {
    if (query) {
        url = `${url}?${(new URLSearchParams(query)).toString()}`;
    }

    return fetchh(url, { ...options });
}

async function del(url, { query = {}, options = {} } = {}) {
    if (query)
        url = `${url}?${new URLSearchParams(query).toString()}`;

    return fetchh(url, { method: 'DELETE', ...options });
}

async function put(url, body, { type = "json", options = {} } = {}) {
    options.method = "put";

    if (type === "json") {
        if (!("headers" in options)) {
            options.headers = {};
        }

        options.headers["content-type"] = "application/json";
        body = JSON.stringify(body);
    }
    else if (type === "multipart") {
        body = JSONtoFormData(body);
    }

    return fetchh(url, { ...options, body });
}

export {
    JSONtoFormData,
    post,
    get,
    del,
    put
};