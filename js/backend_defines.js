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
let _INST_ID = 1;
class Instructions {
    constructor(Op, Dst, SrcJ, SrcK) {
        this.Ins_Id = _INST_ID++;
        this.Op = Op;
        this.Dst = Dst;
        this.SrcJ = SrcJ;
        this.SrcK = SrcK;
    }
}

let instructions = [];

class FP {
    constructor() {
        this.FP_ID = null;
        this.Value = null;
        this.Qi = null;
    }
}

let fp = FP[FloatPointRegisterTotal];
for (let i in fp) {
    fp[i].FP_ID = i;
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
}

let LQ = [];
for (let i = 0; i < LoadQueueTotal; i++) {
    LQ.push(new ReservationStation("Load" + i.toString(), "Load"));
}
let SQ = [];
for (let i = 0; i < LoadQueueTotal; i++) {
    SQ.push(new ReservationStation("Store" + i.toString(), "Store"));
}
let addRS = [];
for (let i = 0; i < LoadQueueTotal; i++) {
    addRS.push(new ReservationStation("Add" + i.toString(), "Add"));
}
let multRS = [];
for (let i = 0; i < LoadQueueTotal; i++) {
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
                cdb.receiveValue(this.Dst, this.Vj + this.Vk);
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

}
function _progressFinish(progress) {

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

    tic() {
        if (this._stall) {
            return;
        }
        if (hasValue(this.Ins_Id)) {
            this.Progress = _addProgress(this.Progress);
            if (_progressFinish(this.Progress)) {
                cdb.receiveValue(this.Dst, this._result);
                this._stall = true;
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
    }

    tic() {
        console.log("not finish");
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
    }

    tic() {
        console.log("not finish");
    }
}

let ster = new STer();


let calc = [].concat(multiplier, lder, ster, adder);

class CDB {
    constructor() {
        this.RS_Name = null;
        this.Value = null;
    }

    receiveValue() {
        console.log("not finish");
    }

    tic() {
        console.log("not finish");
    }
}

let cdb = new CDB();