/**
 * Created by ytl on 2017/6/4.
 */


// ---------------- API for fore-end use ----------------
// ---------------- If need any new api, please write it here, backend will fill it soon ------------

function run_step_one(callback) {
    Info("one step");

    T = T ^ 1;

    insQueue[T] = cloneObject(insQueue[T ^ 1])
    allCalc[T] = cloneObject(allCalc[T ^ 1]);

    insQueue[T].tic();
    for (let i in allCalc[T]) {
        allCalc[T][i].tic();
    }

    if (hasValue(callback)) {
        callback();
    }
}

function run_steps(n, callback) {
    for (var i = 0; i < n; i++) {
        run_step_one(callback);
    }

}

//add command(s) split with '\n'
function addCommandText(text) {
    insQueue[T].addCommandsText(text);
}


// ---------- Instructions ----------
function getInstructions() {
    let instructions = new Array(insQueue[T].commands.length);
    for (var i in insQueue[T].commands) {
        // console.log(insQueue.commands);
        let cmd = insQueue[T].commands[i];
        if (cmd.reads.length >= 2) {
            // console.log(cmd.write);
            instructions[i] = new Instruction(cmd.name, cmd.getWriteName(), cmd.reads[0].name, cmd.reads[1].name);
        } else {
            instructions[i] = new Instruction(cmd.name, cmd.getWriteName(), cmd.reads[0].name, "");
        }
    }
    return instructions;
}


// ---------- ReservationStation -----------
function getReservationStations() {
    let rss = [];
    for (var i in allRS[T]) {
        let rs = allRS[T][i];
        if (rs.busy() && rs.command.location === "ReservationStation") {
            rss.push(new ReservationStation(null, rs.name, rs.busy(), rs.command.name, rs.command.reads[0].name, rs.command.reads[1].name, rs.command.getWriteName()));
        } else {
            rss.push(new ReservationStation(null, rs.name, rs.busy(), "", null, null, null, null));
        }
    }
    return rss;
}

// -------------- registers -------------------

function setRegisterValue(id, val) {
    register_[id].val = val;
}
function getRegisterValue(id) {
    return register_[id].val;
}

function addRegisterValue(id, val) {
    register_[id].val += val;
}


// ----------------- memory ---------------

function setMemValue(id, val) {
    addr_[id].val = val;
}
function getMemValue(id) {
    return addr_[id].val;
}

function addMemValue(id, val) {
    addr_[id].val += val;
}


// ----------------- calcs ----------------
function getCalculators() {
    let cas = [];
    for (var i in allCalc[T]) {
        let calc = allCalc[T][i];
        if (calc.busy() && calc.command.location === "Calculator") {
            cas.push(new Calculator(calc.typeName, calc.command.toString(), calc.command.timer.toString()));
        } else {
            cas.push(new Calculator(calc.typeName, null, null));
        }
    }
    return cas;

}