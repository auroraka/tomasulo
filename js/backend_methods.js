/**
 * Created by ytl on 2017/6/8.
 */


function _parse_three_params(name, params) {
    console.log("_parse_three_params");
    let result = Object();
    if (!hasValue(params) || (params.length < 3)) {
        result.error = "params invalid";
        return result;
    }
    let v = Object();
    v.a = params[0].slice(1);
    v.b = params[1].slice(1);
    v.c = params[2].slice(1);
    let x = (!isNaN(v.a) && !isNaN(v.b) && !isNaN(v.c) && v.a < FloatPointRegisterTotal && v.b < FloatPointRegisterTotal && v.c < FloatPointRegisterTotal);
    if (x) {
        result.error = true;
        result.inst = new Instruction(name, params[0], params[1], params[2]);
        return result;
    } else {
        result.error = "instruction invalid";
        return result;
    }
}
function _parse_addr_params(name, params) {
    console.log("_parse_addr_params");
    let result = Object();
    if (!hasValue(params) || (params.length < 2)) {
        console.log(params.length);
        console.log(params);
        result.error = "params invalid";
        return result;
    }
    let v = Object();
    v.a = params[0].slice(1);
    v.b = params[1];
    let x = (!isNaN(v.a) && !isNaN(v.b) && v.a < FloatPointRegisterTotal && v.b < MemTotal);
    if (x) {
        result.error = true;
        if (name == "LD") {
            result.inst = new Instruction(name, params[0], params[1], null);
        } else {
            result.inst = new Instruction(name, params[1], params[0], null);
        }
        return result;
    } else {
        result.error = "instruction invalid";
        return result;
    }

}
function _str2inst(text) {
    console.log("str2insts");

    let result = Object();
    if (!hasValue(text)) {
        result.error = "input is empty";
        return result;
    }
    let ls = text.split(" ");
    let name = ls[0];
    let params = ls[1].split(",");
    console.log(name);
    console.log(params);
    switch (name) {
        case "ADDD":
            return _parse_three_params(name, params);
            break;
        case "SUBD":
            return _parse_three_params(name, params);
            break;
        case "MULD":
            return _parse_three_params(name, params);
            break;
        case "DIVD":
            return _parse_three_params(name, params);
            break;
        case "LD":
            return _parse_addr_params(name, params);
            break;
        case "ST":
            return _parse_addr_params(name, params);
            break;
        default:
            result.error = "command invalid";
            return result;
            break;
    }
}

function loadInstructionsFromString(text) {
    let lines = text.split("\n");
    let insts = [];
    for (let i in lines) {
        let result = _str2inst(lines[i]);
        if (result.error === true) {
            insts.push(result.inst);
        } else {
            return "Error on line " + i.toString() + ", [" + lines[i] + "] :" + result.error;
        }
    }
    for (let i in insts) {
        instructions.push(insts[i]);
    }
    return true;
}

function loadInstructionsFromFile(file_name) {
    $.get(file_name, loadInstructionsFromString, 'text');
}


function clearInstructions() {
    instructions = [];
    _INST_ID = 1;
    return true;
}

function _checkGlobalComplete() {
    if (COMPLETE === true) {
        return true;
    }
    if (instructions.length > 0) {
        return false;
    }
    for (let i in rs) {
        if (rs[i].Ins_Id !== null) {
            return false;
        }
    }
    for (let i in calc) {
        if (calc[i].Ins_Id !== null) {
            return false;
        }
    }
    COMPLETE = true;
    return true;
}
function _op2Type(op) {
    switch (op) {
        case "ADDD":
            return "Add";
        case "SUBD":
            return "Add";
        case "MULD":
            return "Mult";
        case "DIVD":
            return "Mult";
        case "LD":
            return "Load";
        case "ST":
            return "Store";
        default:
            return null;
    }
}
function _opSameAsType(op, type) {
    switch (op) {
        case "ADDD":
            return type === "Add";
        case "SUBD":
            return type === "Add";
        case "MULD":
            return type === "Mult";
        case "DIVD":
            return type === "Mult";
        case "LD":
            return type === "Load";
        case "ST":
            return type === "Load";
        default:
            return false;
    }
}

function _fpReady(t) {
    return !hasValue(fp[_getFPId(t)].Qi);
}
function _sendInstructionToRS(inst, rss) {
    Info("[send inst]", inst.toString());
    console.log(inst);
    if (_op2Type(inst.Op) === "Add" || _op2Type(inst.Op) === "Mult") {
        rss.Ins_Id = inst.Ins_Id;
        rss.Busy = true;
        rss.Op = inst.Op;
        if (_fpReady(inst.SrcJ)) {
            rss.Vj = getFP(inst.SrcJ).Value;
            rss.Qj = null;
        } else {
            rss.Vj = null;
            rss.Qj = getFP(inst.SrcJ).Qi;
        }
        if (_fpReady(inst.SrcK)) {
            rss.Vk = getFP(inst.SrcK).Value;
            rss.Qk = null;
        } else {
            rss.Vk = null;
            rss.Qk = getFP(inst.SrcK).Qk;
        }
        getFP(inst.Dst).Qi = rss.Name;
    } else if (_op2Type(inst.Op) === "Load") {
        rss.Ins_Id = inst.Ins_Id;
        rss.LDST_Id = LDST_ID_BASE++;
        rss.Busy = true;
        rss.Addr = inst.SrcJ;
        getFP(inst.Dst).Qi = rss.Name;
    } else if (_op2Type(inst.Op) === "Store") {
        rss.Ins_Id = inst.Ins_Id;
        rss.LDST_Id = LDST_ID_BASE++;
        rss.Busy = true;
        rss.Addr = inst.Dst;
        if (_fpReady(inst.SrcJ)) {
            rss.Vj = getFP(inst.SrcJ).Value;
            rss.Qj = null;
        } else {
            rss.Vj = null;
            rss.Qj = getFP(inst.SrcJ).Qi;
        }
    }
    outInstruction(inst.Ins_Id);
}
function _extraSendInstCheck(inst, rss) {
    if (_op2Type(inst.Out) === "Add") {
        return rss._id === 0;
    }
}
function timerStepOne() {
    if (_checkGlobalComplete()) {
        console.log("finish");
        return false;
    }
    if (instructions.length > 0) {
        let inst = null;
        for (let i in instructions) {
            if (instructions[i].Out === false) {
                inst = instructions[i];
                break;
            }
        }
        if (inst) {
            Info("[try send inst]", inst.toString());
            for (let i in rs) {
                if (_opSameAsType(inst.Op, rs[i].Type) && (!rs[i].Busy)) {
                    if (_extraSendInstCheck(inst, rs[i])) {
                        _sendInstructionToRS(inst, rs[i]);
                        break;
                    }
                }
            }
        }
        for (let i in calc) {
            calc[i].tic();
        }
        cdb.tic();
    }
    CUR_TIC += 1;
    return true;
}

function timerStepN(n = 1) {
    for (let i = 0; i < n; i++) {
        timerStepOne();
    }
}

function timerStepContinue() {
    while (_checkGlobalComplete()) {
        if (!timerStepOne()) {
            return;
        }
    }
}
function _getFPId(t) {
    if (typeof(t) === "number") {
        return t;
    } else if (typeof(t) === "string") {
        return parseInt(t.slice(1));
    }
}

// accept format: 'F0',0
function getFP(id) {
    return fp[_getFPId(id)];
}

function setFP(id, x) {
    fp[_getFPId(id)].Value = x;
    return true;
}

function _getMemId(t) {
    if (typeof(t) === "string") {
        return parseInt(t);
    } else {
        return t;
    }
}

// accsept format: '123',123
function getMem(id) {
    return memory[_getMemId(id)];
}


function setMem(id, x) {
    memory[_getMemId(id)] = x;
    return true;
}