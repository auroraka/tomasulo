/**
 * Created by ytl on 2017/6/2.
 */

const RegisterTotal = 11;
const AddrTotal = 4096;
class Value_ {
    constructor(val = 0) {
        this.val = val;
        this.ready = true;
        this.name = null;
    }
}

let register_ = newList(RegisterTotal, new Value_());
let addr_ = newList(AddrTotal, new Value_());

