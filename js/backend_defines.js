/**
 * Created by ytl on 2017/6/8.
 */
let COMPLETE = false;
let CUR_TIC = 1;
const FloatPointRegisterTotal = 11;
const MemTotal = 4096;
const AddRSTotal = 3;
const MulDivRsTotal = 2;
const LoadQueueTotal = 3;
const StoreQueueTotal = 3;
const AdderTotal = 2;
const MultiplierTotal = 1;
const MultCalcTime = 10;
const DivCalcTime = 40;
const LoadCalcTime = 2;
const StoreCalcTime = 2;
const CDB_BAND_WITH = INF;
let _INST_ID = 1;
class Instructions {
    constructor(Op, Dst, SrcJ, SrcK) {
        this.Ins_Id = _INST_ID++;
        this.Op = Op;
        this.Dst = Dst;
        this.SrcJ = SrcJ;
        this.SrcK = SrcK;
        this.Out = false;
        this.Exe = false;
        this.WB = false;
    }
}

let instructions = [];

function delInstruction(Inst_Id) {
    for (let i in instructions) {
        if (instructions[i].Ins_Id === Inst_Id) {
            instructions.splice(i, 1);
            break;
        }
    }
}
function outInstruction(Inst_Id) {
    for (let i in instructions) {
        if (instructions[i].Ins_Id === Inst_Id) {
            instructions[i].Out = true;
            break;
        }
    }
}
function exeInstruction(Inst_Id) {
    for (let i in instructions) {
        if (instructions[i].Ins_Id === Inst_Id) {
            instructions[i].Exe = true;
            break;
        }
    }
}

function wbInstruction(Inst_Id) {
    for (let i in instructions) {
        if (instructions[i].Ins_Id === Inst_Id) {
            instructions[i].WB = true;
            break;
        }
    }
}

class FP {
    constructor() {
        this.FP_ID = null;
        this.Value = null;
        this.Qi = null;
    }

    _receiveResult(name, val) {
        if (this.Qi === name) {
            this.Value = val;
        }
    }
}

let fp = FP[FloatPointRegisterTotal];
for (let i in fp) {
    fp[i].FP_ID = i;
    // ToDo: error here?
}

let memory = newList(MemTotal, 0);

class ReservationStation {
    constructor(Name = null, Type = null, Ins_Id = null, Op = null, Qj = null, Qk = null, Vj = null, Vk = null, Busy = null, Addr = null, LDST_Id = null) {
        this.Name = Name;
        this.Type = Type;
        this.Ins_Id = Ins_Id;
        this.Op = Op;
        this.Qj = Qj;
        this.Qk = Qk;
        this.Vj = Vj;
        this.Vk = Vk;
        this.Busy = Busy;
        this.Addr = Addr;
        this.LDST_Id = LDST_Id;
    }

    _clean() {
        this.constructor();
    }


    _receiveResult(name, val) {
        if (this.Qj === name) {
            this.Qj = null;
            this.Vj = val;
        } else if (this.Qk === name) {
            this.Qk = null;
            this.Vk = val;
        }
    }

    _finish() {
        for (let i in calc) {
            if (calc[i].Ins_Id === this.Ins_Id) {
                calc[i]._clean();
            }
        }
        delInstruction(this.Ins_Id);
    }

    ready() {
        return (this.Qk === null) && (this.Qj === null);
    }

    canLDST() {
        let x = INF;
        for (let i in rs) {
            if ((rs[i].Type === "Load") || (rs[i].Type === "Store")) {
                if (rs[i].LDST_Id < x) {
                    x = rs[i].LDST_Id;
                }
            }
        }
        return x === this.LDST_Id;
    }

}

let LQ = [];
for (let i = 0; i < LoadQueueTotal; i++) {
    LQ.push(new ReservationStation("Load" + i.toString(), "Load"));
}
let SQ = [];
for (let i = 0; i < StoreQueueTotal; i++) {
    SQ.push(new ReservationStation("Store" + i.toString(), "Store"));
}
let addRS = [];
for (let i = 0; i < AddRSTotal; i++) {
    addRS.push(new ReservationStation("Add" + i.toString(), "Add"));
}
let multRS = [];
for (let i = 0; i < MulDivRsTotal; i++) {
    multRS.push(new ReservationStation("Mult" + i.toString(), "Mult"));
}
let rs = [].concat(LQ, SQ, addRS, multRS);

class Adder {
    constructor(_id) {
        this._id = _id;
        this.Ins_Id = null;
        this.Op = null;
        this.Dst = null;
        this.Vj = null;
        this.Vk = null;
        this.Progress = null;
        this._stall = null;
    }

    _clean() {
        this.constructor();
    }

    tic() {
        if (adder[1]._stall) {
            return;
        }
        if (this._id == 1) {
            if (hasValue(adder[0].Ins_Id)) {
                this.Ins_Id = adder[0].Ins_Id;
                this.Op = adder[0].Op;
                this.Dst = adder[0].Dst;
                this.Vj = adder[0].Vj;
                this.Vk = adder[0].Vk;
                this.Progress = "2/2";
                cdb._receiveValue(this.Dst, this.Vj + this.Vk);
                wbInstruction(this.Ins_Id);
            }
        } else {
            for (let i in rs) {
                if ((rs[i].Type === "Add") && (rs[i].ready())) {
                    this.Ins_Id = rs[i].Ins_Id;
                    this.Op = rs[i].Op;
                    this.Dst = rs[i].name;
                    this.Vj = rs[i].Vj;
                    this.Vk = rs[i].Vk;
                    this.Progress = "1/2";
                    exeInstruction(this.Ins_Id);
                }
            }
        }
    }
}
assert(AdderTotal == 2);
let adder = [new Adder(0), new Adder(1)];

function _getInstructionById(id) {
    for (let i in instructions) {
        if (instructions[i].Ins_Id === id) {
            return instructions[i];
        }
    }
}

function _progressAdd(progress) {
    ab = progress.split("/");
    let a = parseInt(ab[0]);
    let b = parseInt(ab[1]);
    if (a < b) {
        a += 1;
    }
    return a.toString() + "/" + b.toString();
}
function _progressFinish(progress) {
    ab = progress.split("/");
    let a = parseInt(ab[0]);
    let b = parseInt(ab[1]);
    return a >= b;
}
class Multiplier {
    constructor() {
        this.Ins_Id = null;
        this.Op = null;
        this.Dst = null;
        this.Vj = null;
        this.Vk = null;
        this.Progress = null;
        this._result = null;
        this._stall = false;
    }

    _clean() {
        this.constructor();
    }

    tic() {
        if (this._stall) {
            return;
        }
        if (hasValue(this.Ins_Id)) {
            this.Progress = _addProgress(this.Progress);
            if (_progressFinish(this.Progress)) {
                cdb._receiveValue(this.Dst, this._result);
                this._stall = true;
                wbInstruction(this.Ins_Id);
            }
        } else {
            for (let i in rs) {
                if ((rs[i].Type === "Mult") && (rs[i].ready())) {
                    this.Ins_Id = rs[i].Ins_Id;
                    this.Op = rs[i].Op;
                    this.Dst = rs[i].name;
                    this.Vj = rs[i].Vj;
                    this.Vk = rs[i].Vk;
                    if (rs[i].Op === "MULD") {
                        this.Progress = "1/" + MultCalcTime.toString();
                        this._result = this.Vj * this.Vk;
                    } else if (rs[i].Op === "DIVD") {
                        this.Progress = "1/" + DivCalcTime.toString();
                        if (this.Vk) {
                            alert("div by zero!!!");
                        }
                        this._result = this.Vj / this.Vk;
                        exeInstruction(this.Ins_Id);
                    }
                }
            }
        }
    }
}

assert(MultiplierTotal === 1);
let multiplier = new Multiplier();


class LDer {
    constructor() {
        this.Ins_Id = null;
        this.Op = null;
        this.Addr = null;
        this.Progress = null;
        this._stall = null;
    }

    _clean() {
        this.constructor();
    }

    tic() {
        if (this._stall) {
            return;
        }
        if (hasValue(this.Ins_Id)) {
            _progressAdd(this.Progress);
            if (_progressFinish(this.Progress)) {
                cdb._receiveValue(this.Dst, getMem(this.Addr));
                this._stall = true;
                wbInstruction(this.Ins_Id);
            }
        } else {
            for (let i in rs) {
                if ((rs[i].Type === "Load") && (rs[i].ready()) && (rs[i].canLDST())) {
                    this.Ins_Id = rs[i].Ins_Id;
                    this.Op = rs[i].Op;
                    this.Addr = rs[i].Addr;
                    this.Progress = "1/" + LoadCalcTime.toString();
                    exeInstruction(this.Ins_Id);
                }
            }
        }
    }
}

let lder = new LDer();

class STer {
    constructor() {
        this.Ins_Id = null;
        this.Op = null;
        this.Addr = null;
        this.FP_Value = null;
        this.Progress = null;
        // this._stall = null;
    }

    _clean() {
        this.constructor();
    }

    tic() {
        // if (this._stall) {
        //     return;
        // }
        if (hasValue(this.Ins_Id)) {
            _progressAdd(this.Progress);
            if (_progressFinish(this.Progress)) {
                setMem(this.Addr, this.FP_Value);
                for (let i in SQ) {
                    if (SQ[i].Ins_Id === this.Ins_Id) {
                        SQ[i]._finish();
                    }
                }
                wbInstruction(this.Ins_Id);
                delInstruction(this.Ins_Id);
            }
        } else {
            for (let i in rs) {
                if ((rs[i].Type === "Store") && (rs[i].ready()) && (rs[i].canLDST())) {
                    this.Ins_Id = rs[i].Ins_Id;
                    this.Op = rs[i].Op;
                    this.Addr = rs[i].Addr;
                    this.FP_Value = getFP(rs[i].SrcJ);
                    this.Progress = "1/" + StoreCalcTime.toString();
                    exeInstruction(this.Ins_Id);
                }
            }
        }
    }
}

let ster = new STer();


let calc = [].concat(multiplier, lder, ster, adder);

class CDB {
    constructor() {
        this.RS_Name = null;
        this.Value = null;
        this._signalQueue = [];
    }

    _receiveValue(name, val) {
        let obj = Object();
        obj.name = name.toString();
        obj.val = val;
        this._signalQueue.push(obj);
    }

    _writeResult(obj) {
        for (let i in fp) {
            if (hasValue(fp.Qi) && (fp[i].Qi === obj.name)) {
                fp[i]._receiveResult(obj.name, obj.val);
            }
        }
        for (let i in rs) {
            if (hasValue(rs[i].Qj) && (rs[i].Qj === obj.name)) {
                rs[i]._receiveResult(obj.name, obj.val);
            }
        }
        for (let i in rs) {
            if (rs[i].name === name) {
                rs[i]._finish();
            }
        }
    }

    tic() {
        for (let i = 0; i < CDB_BAND_WITH; i++) {
            if (this._signalQueue <= 0) {
                break;
            }
            this._writeResult(this._signalQueue[0]);
            this._signalQueue.shift();
        }
    }
}

let cdb = new CDB();