/**
 * Created by ytl on 2017/6/2.
 */

const RegisterTotal = 11;
const AddrTotal = 4096;

class Value_ {
    constructor(val = 0) {
        this.val = val;
        this.name = null;
    }
}

let NULL_VALUE = new Value_();
NULL_VALUE.name = "null";

let register_ = newList(RegisterTotal, new Value_());
register_.name = "F";

let addr_ = newList(AddrTotal, new Value_());
addr_.name = "";
