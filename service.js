function ls(key = null, val = null) {
    if(key === null && val === null) {
        return JSON.parse(JSON.stringify(localStorage));
    }
    if(val === null) {
        if(localStorage[key])
            return JSON.parse(localStorage[key]);
        return undefined;
    }
    if(true) {
        if(val || val === null || val === "" || val === 0)
            localStorage[key] = JSON.stringify(val);
        else
            localStorage.removeItem(key);
        return JSON.parse(JSON.stringify(localStorage));
    }
}
