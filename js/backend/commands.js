/**
 * Created by ytl on 2017/6/2.
 */

const AddCommandNeedTime = 3;
const SubCommandNeedTime = 3;
const MulCommandNeedTime = 10;
const DivCommandNeedTime = 40;
const LoadCommandNeedTime = 2;
const StoreCommandNeedTime = 2;

class Command_ {
    //type = Add/Div/Mul/Div/Load/Store
    constructor(reads, write, write_obj, write_id) {
        this.reads = reads;
        // this.write = write;
        this.write = NULL_VALUE;
        this.write_obj = write_obj;
        this.write_id = write_id;
        this.typeName = "none";
        this.timer = 0;
        this.location = "InstructionQueue";
        this.name = "none";
    }

    toString() {
        return this.name + " " + this.getWriteName() + " " + getNames(this.reads);
    }

    getWriteName() {
        if (hasValue(this.write) && this.write.name !== "null") {
            return this.write.name;
        } else {
            return this.write_obj.name + this.write_id.toString();
        }
    }

    initCallBack() {
        console.log("[ADD COMMAND] " + this.toString());
    }

    calcFinishCallBack() {
        CDB_broadcast(this.write);
    }

}
class AddCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "AddSub";
        this.name = "ADDD";
        this.initCallBack();
        this.timer = AddCommandNeedTime;
    }

    calc() {
        this.write.val = this.reads[0].val + this.reads[1].val;
        this.calcFinishCallBack();
    }
}
class SubCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "AddSub";
        this.name = "SUBD";
        this.initCallBack();
        this.timer = SubCommandNeedTime;
    }

    calc() {
        this.write.val = this.reads[0].val - this.reads[1].val;
        this.calcFinishCallBack();
    }
}
class MulCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "MulDiv";
        this.name = "MULD";
        this.initCallBack();
        this.timer = MulCommandNeedTime;
    }

    calc() {
        this.write.val = this.reads[0].val * this.reads[1].val;
        this.calcFinishCallBack();
    }

}
class DivCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "MulDiv";
        this.name = "DIVD";
        this.initCallBack();
        this.timer = DivCommandNeedTime;
    }

    calc() {
        this.write.val = this.reads[0].val / this.reads[1].val;
        this.calcFinishCallBack();
    }

}

class LoadCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "Load";
        this.name = "LD";
        this.initCallBack();
        this.timer = LoadCommandNeedTime;
    }

    calc() {
        console.log("call2");

        this.write.val = this.reads[0].val;
        this.calcFinishCallBack();
    }

}

class StoreCommand extends Command_ {
    constructor(reads, write, write_obj, write_id) {
        super(reads, write, write_obj, write_id);
        this.typeName = "Store";
        this.name = "ST";
        this.initCallBack();
        this.timer = StoreCommandNeedTime;
    }

    calc() {
        console.log("call1");

        this.write.val = this.reads[0].val;
        this.calcFinishCallBack();
    }

}