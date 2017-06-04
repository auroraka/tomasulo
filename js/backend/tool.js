/**
 * Created by ytl on 2017/6/2.
 */

function hasValue(data) {
    return (data !== undefined) && (data !== null) && (data !== "");
}

function newList(count, data) {
    x = [];
    for (let i = 0; i < count; i++) {
        // x.push(data);
        x.push(Object.create(data))
    }
    return x;
}

function assert(result) {
    if (result !== true) {
        console.log('something wrong!')
    }
}

function getNames(vals) {
    let x = "";
    for (var i in vals) {
        x += vals[i].name + " ";
    }
    return x;
}

function Message(key, text) {
    console.log("[" + key + "] " + text);
}
function Info(text) {
    console.log("[Info] " + text);
}
function Error(text) {
    console.log("[Error] " + text);
}


// -------------- tomasulo backend function -----------
function backend_init() {
    for (let i in register_) {
        register_[i].ready = true;
        register_[i].name = "F" + i.toString();
    }
    for (let i in addr_) {
        addr_[i].ready = true;
        addr_[i].name = i.toString();
    }
    let x = "";
    let count = 0;
    for (let i in allRS) {
        let rs = allRS[i];
        if (x != rs.typeName) {
            count = 0;
        } else {
            count = count + 1;
        }
        rs.name = rs.typeName + count.toString();
    }
}


