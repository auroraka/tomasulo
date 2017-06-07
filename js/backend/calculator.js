/**
 * Created by ytl on 2017/6/2.
 */


class Calculator_ {
    constructor() {
        this.rs = null;// has rs means busy
        this.typeName = "none";
    }

    busy() {
        return hasValue(this.rs);
    }

    feedCommand() {
        for (let i in allRS[T ^ 1]) {
            let rs = allRS[T ^ 1][i];
            if ((this.typeName === rs.typeName) && (rs.isReady())) {
                rs.command.location = "Calculator";
                this.rs = rs;
                Message("LOAD COMMAND", this.rs.command.toString());
                break;
            }
        }
    }

    // run one tic
    runCommand() {
        if (this.rs.command.timer > 0) {
            this.rs.command.timer -= 1;
        } else {
            this.rs.command.calc();
            Message("FIN COMMAND", this.rs.command.toString());
            this.rs.command = null;
            this.rs = null;
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
