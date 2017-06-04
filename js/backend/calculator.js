/**
 * Created by ytl on 2017/6/2.
 */

const AddTime = 2;
const SubTime = 2;
const MulTime = 10;
const DivTime = 40;
const LoadTime = 2;
const StoreTime = 2;

class Calculator_ {
    constructor() {
        this.command = null;// has command means busy
        this.typeName = "none";
    }

    busy() {
        return hasValue(this.command);
    }

    feedCommand() {
        // console.log(allRS);
        for (let i in allRS) {
            let rs = allRS[i];
            // console.log(rs);
            if ((this.typeName === rs.typeName) && (rs.ready)) {
                rs.location = "Calculator_";
                this.command = rs.command;
            }
        }
    }

    tic() {
        if (!this.busy()) {
            this.feedCommand();
        }
        if (this.busy() && (this.command.timer > 0)) {
            this.command.timer = this.command.timer - 1;
        }
        if (this.busy() && (this.timer <= 0)) {
            this.command.calc();
            this.command = null;
        }
        if (!this.busy()) {
            this.feedCommand();
        }
    }
}

class AddCalculator extends Calculator_ {
    constructor() {
        super();
        this.typeName = "AddSub";
    }

    calc() {

    }
}

class MulDivCalculator extends Calculator_ {

    constructor() {
        super();
        this.typeName = "MulDiv";
    }
}

class LoadCalculator extends Calculator_ {
    constructor() {
        super();
        this.typeName = "Load";
    }

}

class StoreCalculator extends Calculator_ {
    constructor() {
        super();
        this.typeName = "Store";
    }
}

let addCalc = new AddCalculator();
let mulDivCalc = new MulDivCalculator();
let loadCalc = new LoadCalculator();
let storeCalc = new StoreCalculator();
let allCalc = [addCalc, mulDivCalc, loadCalc, storeCalc];