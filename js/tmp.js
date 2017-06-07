/**
 * Created by ytl on 2017/6/8.
 */
_get3param(params) {
    if (!hasValue(params) || (params.length < 3)) {
        return false;
    }
    this.a = params[0].slice(1);
    this.b = params[1].slice(1);
    this.c = params[2].slice(1);
    return (!isNaN(this.a) && !isNaN(this.b) && !isNaN(this.c) && this.a < RegisterTotal && this.b < RegisterTotal && this.c < RegisterTotal);
}

_getaddrparam(params) {
    if (!hasValue(params) || (params.length < 2)) {
        return false;
    }
    this.a = params[0].slice(1);
    this.b = params[1];
    return (!isNaN(this.a) && !isNaN(this.b) && this.a < RegisterTotal && this.b < AddrTotal);
}


str2cmd(text) {
    if (!hasValue(text)) {
        return;
    }
    // console.log("bbb");

    // console.log(text);
    let ls = text.split(" ");
    let name = ls[0];
    let params = ls[1].split(",");
    // console.log("ccc");
    // console.log(ls);
    // console.log(params);
    this.a = null;
    this.b = null;
    this.c = null;
    switch (name) {
        case "ADDD":
            if (this._get3param(params)) {
                return new AddCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
            }
            break;
        case "SUBD":
            if (this._get3param(params)) {
                return new SubCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
            }
            break;
        case "MULD":
            if (this._get3param(params)) {
                return new MulCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
            }
            break;
        case "DIVD":
            if (this._get3param(params)) {
                return new DivCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
            }
            break;
        case "LD":
            if (this._getaddrparam()) {
                return new LoadCommand([addr_[this.b], NULL_VALUE], register_[this.a], register_, this.a);
            }
            break;
        case "ST":
            if (this._getaddrparam()) {
                return new StoreCommand([register_[this.a], NULL_VALUE], addr_[this.b], addr_, this.b);
            }
            break;
        default:
            break;
    }
}

lines2cmd(text) {
    let lines = text.split("\n");
    // console.log("aaa");
    // console.log(lines);
    let cmds = [];
    for (let i in lines) {
        // console.log(lines[i]);
        let cmd = this.str2cmd(lines[i]);
        if (hasValue(cmd)) {
            cmds.push(cmd);
        }
    }
    return cmds;
}


//string input
addCommandsText(text) {
    if (typeof(text) === "string") {
        let cmds = this.lines2cmd(text)
        if (hasValue(cmds)) {
            for (let i in cmds) {
                this.commands.push(cmds[i]);
            }
        }
    }
}





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
var __next_objid = 1;

function objectId(obj) {
    if (obj == null) return null;
    if (obj.__obj_id == null) obj.__obj_id = __next_objid++;
    return obj.__obj_id;
}

function makeMirror(obj) {
    return [obj, cloneObject(obj)];
}

function cloneObject(obj) {
    // if (obj instanceof Array) {
    //     return [...obj];
    // } else {
    //     return Object.create(obj);
    // }
    return $.extend([], [obj])[0];
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
    for (let i in allRS[T ^ 1]) {
        let rs = allRS[T ^ 1][i];
        if (x != rs.typeName) {
            count = 0;
        } else {
            count = count + 1;
        }
        rs.name = rs.typeName + count.toString();
    }
}


let T = 0;