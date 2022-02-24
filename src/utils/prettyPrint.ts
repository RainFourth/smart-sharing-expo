function prettyPrint(json: any, type = 'log' as 'log'|'str', replacer = undefined, space = 4) {
    json = JSON.stringify(json, replacer, space);

    switch (type){
        case 'log': console.log(json); break
        case 'str': return json
    }
}

export { prettyPrint };