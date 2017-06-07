/**
 * Created by ytl on 2017/6/2.
 */


class Calculator_ {
    constructor() {
        this.command = null;// has command means busy
        this.typeName = "none";
    }

    busy() {
        return hasValue(this.command);
    }

    feedCommand() {
        for (let i in allRS[T ^ 1]) {
            let rs = allRS[T ^ 1][i];
            if ((this.typeName === rs.typeName) && (rs.isReady())) {
                rs.command.location = "Calculator";
                this.command = rs.command;
                Message("LOAD COMMAND", this.command.toString());
                break;
            }
        }
    }

    // run one tic
    runCommand() {
        if (this.command.timer > 0) {
            this.command.timer -= 1;
        } else {
            this.command.calc();
            Message("FIN COMMAND", this.command.toString());
            this.command = null;
            this.feedCommand();
        }
    }

    tic() {
        if (!this.busy()) {
            this.feedCommand();
            if (this.busy()) {
                this.runCommand();
            }
        } else {
            this.runCommand();
        }
    }
}

class AddCalculator extends Calculator_ {
    constructor() {
        super();
        this.typeName = "AddSub";
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
let allCalc = makeMirror([addCalc, mulDivCalc, loadCalc, storeCalc]);
