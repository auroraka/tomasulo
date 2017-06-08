/**
 * Created by ytl on 2017/6/8.
 */


function _parse_three_params(name, params) {
    if (!hasValue(params) || (params.length < 3)) {
        return false;
    }
    let v = Object();
    let result = Object();
    v.a = params[0].slice(1);
    v.b = params[1].slice(1);
    v.c = params[2].slice(1);
    let x = (!isNaN(v.a) && !isNaN(v.b) && !isNaN(v.c) && v.a < FloatPointRegisterTotal && v.b < FloatPointRegisterTotal && v.c < FloatPointRegisterTotal);
    if (x) {
        result.error = true;
        result.inst = Instruction(name, params[0], params[1], params[2]);
        return result;
    } else {
        result.error = "instruction invalid";
        return result;
    }
}
function _parse_addr_params(name, params) {
    if (!hasValue(params) || (params.length < 2)) {
        return false;
    }
    let result = Object();
    let v = Object();
    v.a = params[0].slice(1);
    v.b = params[1];
    let x = (!isNaN(v.a) && !isNaN(v.b) && v.a < FloatPointRegisterTotal && v.b < MemTotal);
    if (x) {
        result.error = true;
        if (name == "LD") {
            result.inst = Instruction(name, params[1], params[0], null);
        } else {
            result.inst = Instruction(name, params[0], params[1], null);
        }
        return result;
    } else {
        result.error = "instruction invalid";
        return result;
    }

}
function _str2inst(text) {
    let result = Object();
    if (!hasValue(text)) {
        result.error = "input is empty";
        return result;
    }
    let ls = text.split(" ");
    let name = ls[0];
    let params = ls[1].split(",");
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
    console.log(text);
    return;
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
    return true;
}

function _checkGlobalComplete() {
    if (COMPLETE === true) {
        return true;
    }
    if (false) {
        COMPLETE = true;
        return true;
    } else {
        return false;
    }
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

function _getFPId(t) {
    if (typeof(t) === "number") {
        return t;
    } else if (typeof(t) === "string") {
        return parseInt(t.slice(1));
    }
}
function _fpReady(t) {
    return hasValue(fp[_getFPId(t)].Qi);
}
function _sendInstructionToRS(inst, rss) {
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
function timerStepOne() {
    if (_checkGlobalComplete()) {
        return false;
    }
    if (instructions.length > 0) {
        let inst = instructions[0];
        for (let i in rs) {
            if (_opSameAsType(inst.Op, rs[i].Type) && (!rs[i].Busy)) {
                _sendInstructionToRS(inst, rs[i]);
                inst.shift();
                break;
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
    while (true) {
        if (!timerStepOne()) {
            return;
        }
    }
}
// accept format: 'F0',0
function getFP(id) {
    return FP[_getFPId(id)];
}

function setFP(id, x) {
    FP[_getFPId(id)].Value = x;
    return true;
}

function _getMemId(t) {
    if (typeof(t) === "sting") {
        return parseInt(t);
    } else {
        return t;
    }

}

// accept format: '123',123
function getMem(id) {
    return memory[_getMemId(ids)];
}

function setMem(id, x) {
    memory[_getMemId(id)] = x;
    return true;
}