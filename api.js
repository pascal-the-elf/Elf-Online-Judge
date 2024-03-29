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
    if(should_cache("config")) {
        window.judge = await fetch(conf)
            .then(r=>r.json())
            .catch(e=>{
                console.error(e);
                success = 0;
            });
        update_cache("config", window.judge);
    } else
        window.judge = ls("cache").config;
    return success;
}

async function list_problem() {
    var list;
    if(should_cache("problem_list")) {
        list = await fetch("https://raw.githubusercontent.com/"+judge.database.owner+"/"+judge.database.database+"/master/list.json")
            .then(r=>r.json());
        update_cache("problem_list", list);
    } else
        list = ls("cache")["problem_list"];
    return list;
}

async function problem(prefix, id) {
    var p;
    if(should_cache("problem_"+prefix+id)) {
        p = await fetch("https://raw.githubusercontent.com/"+judge.database.owner+"/"+judge.database.database+"/master/problems/"+prefix+"/"+id+"/problem.json")
            .then(r=>r.json());
        update_cache("problem_"+prefix+id, p);
    } else
        p = ls("cache")["problem_"+prefix+id];
    return p;
}

function should_cache(type) {
    if(!ls("cache")) ls("cache", {});
    if(!ls("cache_control")) ls("cache_control", {});
    var c = ls("cache_control");
    if(!c[type]) c[type] = 0;
    return ((Date.now()-c[type])>(window.judge?judge.cycle.interval:60000));
}
function update_cache(type, value) {
    var c = ls("cache"), cc = ls("cache_control");
    c[type] = value;
    cc[type] = Date.now();
    ls("cache", c);
    ls("cache_control", cc);
}
