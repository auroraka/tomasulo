/**
 * Created by ytl on 2017/6/4.
 */


// ---------------- API for fore-end use ----------------
// ---------------- If need any new api, please write it here, backend will fill it soon ------------


function getInstructions() {
    let instructions = new Array(insQueue.commands.length);
    for (var i in insQueue.commands) {
        // console.log(insQueue.commands);
        let cmd = insQueue.commands[i];
        if (cmd.reads.length >= 2) {
            // console.log(cmd.write);
            instructions[i] = new Instruction(cmd.name, cmd.write.name, cmd.reads[0].name, cmd.reads[1].name);
        } else {
            instructions[i] = new Instruction(cmd.name, cmd.write.name, cmd.reads[0].name, "");
        }
    }
    return instructions;
}
function getReservationStations() {
    let rss = [];
    for (var i in allRS) {
        let rs = allRS[i];
        if (rs.busy() && rs.command.location === "ReservationStation") {
            rss.push(new ReservationStation(null, rs.name, rs.busy(), rs.command.name, null, null, null, null));
        } else {
            rss.push(new ReservationStation(null, rs.name, rs.busy(), "", null, null, null, null));
        }
    }
    return rss;
}

function run_step_one(callback) {
    Info("one step");
    insQueue.tic();
    for (let i in allCalc) {
        allCalc[i].tic();
    }
    let flag = true;
    while (flag) {
        flag = false;
        for (let i in allRS) {
            rs = allRS[i];
            if (rs.checkReady()) {
                flag = true;
            }
        }
    }

    if (hasValue(callback)) {
        callback();
    }

}

function setRegisterValue(id, val) {
    register_[id].val = val;
}
function getRegisterValue(id) {
    return register_[id].val;
}

function setMemValue(id, val) {
    addr_[id].val = val;
}
function getMemValue(id) {
    return addr_[id].val;
}


