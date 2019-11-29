// config().then(init).catch(console.error);

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

async function config(conf = "./config.json") {
    let success = 1;
    window.judge = await fetch(conf)
        .then(r=>r.json())
        .catch(e=>{
            console.error(e);
            success = 0;
        });
    return success;
}

async function list_problem() {
    var list = await fetch("https://raw.githubusercontent.com/"+judge.database.owner+"/"+judge.database.database+"/master/list.json")
        .then(r=>r.json());
    return list;
}
