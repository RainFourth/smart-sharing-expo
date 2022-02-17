function prettyPrint(json, type = 'log', replacer = '*', space = 2) {
    json = JSON.stringify(json, replacer, space);

    if (type === 'log')
        console.log(json);
    if (type === 'str')
        return json;
}

export { prettyPrint };