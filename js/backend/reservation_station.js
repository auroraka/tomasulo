/**
 * Created by ytl on 2017/6/2.
 */

const AddSubRSTotal = 3;
const MulDivRSTotal = 2;
const LoadRSTotal = 3;
const StoreRSTotal = 3;

class ReservationStation_ {
    constructor() {
        this.command = null;//has command means busy
        // this.ready = false;
        this.typeName = "none";
    }

    busy() {
        return hasValue(this.command);
    }

    isReady() {
        // console.log(this);
        // console.log(this.busy());
        if ((this.busy()) && (this.command.location === "ReservationStation")) {
            for (let i in this.command.reads) {
                let v = this.command.reads[i];
                if (!v.ready) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }

}
class AddSubReservationStation extends ReservationStation_ {
    constructor() {
        super();
        this.typeName = "AddSub";
    }


}

class MulDivReservationStation extends ReservationStation_ {
    constructor() {
        super();
        this.typeName = "MulDiv";
    }
}


class LoadReservationStation extends ReservationStation_ {
    constructor() {
        super();
        this.typeName = "Load";
    }


}

class StoreReservationStation extends ReservationStation_ {
    constructor() {
        super();
        this.typeName = "Store";
    }
}

let addSubRS = newList(AddSubRSTotal, new AddSubReservationStation());
let mulDivRS = newList(MulDivRSTotal, new MulDivReservationStation());
let loadRS = newList(LoadRSTotal, new LoadReservationStation());
let storeRS = newList(StoreRSTotal, new StoreReservationStation());

let allRS = [].concat(addSubRS, mulDivRS, loadRS, storeRS);
