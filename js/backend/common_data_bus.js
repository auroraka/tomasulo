/**
 * Created by ytl on 2017/6/8.
 */

function CDB_broadcast(obj) {
    for (let i in register_) {
        if (register_[i].val === obj) {
            register_[i].val = obj.val;
        }
    }
    for (let i in addr_) {
        if (addr_[i].val === obj) {
            addr_[i].val = obj.val;
        }
    }
    for (let i in allRS[T]) {
        if (allRS[T][i].command.write.val === obj) {
            allRS[T][i].command.write = obj;
        }
    }
}