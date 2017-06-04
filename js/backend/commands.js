/**
 * Created by ytl on 2017/6/2.
 */

const AddCommandNeedTime = 3;
const SubCommandNeedTime = 3;
const MulCommandNeedTime = 10;
const DivCommandNeedTime = 40;
const LoadCommandNeedTime = 2;
const SaveCommandNeedTime = 2;

class Command_ {
    //type = Add/Div/Mul/Div/Load/Store
    constructor(reads, write) {
        this.reads = reads;
        this.write = write;
        this.typeName = "none";
        this.timer = 0;
        this.location = "InstructionQueue";
        this.inputReady = false;
        this.name = "none";
    }

    toString() {
        return this.name + " " + this.write.name + " " + getNames(this.reads);
    }

    initCallBack() {
        console.log("[ADD COMMAND] " + this.toString());
    }

}
class AddCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "AddSub";
        this.name = "ADDD";
        this.initCallBack();
    }

    calc() {
        this.write.val = this.reads[0].val + this.reads[1].val;
        this.write.ready = true;
    }
}
class SubCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "AddSub";
        this.name = "SUBD";
        this.initCallBack();
    }

    calc() {
        this.write.val = this.reads[0].val - this.reads[1].val;
        this.write.ready = true;

    }
}
class MulCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "MulDiv";
        this.name = "MULD";
        this.initCallBack();

    }

    calc() {
        this.write.val = this.reads[0].val * this.reads[1].val;
        this.write.ready = true;
    }

}
class DivCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "MulDiv";
        this.name = "DIVD";
        this.initCallBack();

    }

    calc() {
        this.write.val = this.reads[0].val / this.reads[1].val;
        this.write.ready = true;
    }

}

class LoadCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "Load";
        this.name = "LD";
        this.initCallBack();

    }

    calc() {
        this.write.val = this.reads[0].val;
        this.write.ready = true;
    }

}

class StoreCommand extends Command_ {
    constructor(reads, write) {
        super(reads, write);
        this.typeName = "Store";
        this.name = "ST";
        this.initCallBack();

    }

    calc() {
        this.write.val = this.reads[0].val;
        this.write.ready = true;
    }

}