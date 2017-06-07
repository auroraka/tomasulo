/**
 * Created by ytl on 2017/6/4.
 */

class InstructionQueue_ {
    constructor(commands = null) {
        if (hasValue(commands)) {
            this.commands = commands;
        } else {
            this.commands = [];
        }
    }

    _get3param(params) {
        if (!hasValue(params) || (params.length < 3)) {
            return false;
        }
        this.a = params[0].slice(1);
        this.b = params[1].slice(1);
        this.c = params[2].slice(1);
        return (!isNaN(this.a) && !isNaN(this.b) && !isNaN(this.c) && this.a < RegisterTotal && this.b < RegisterTotal && this.c < RegisterTotal);
    }

    _getaddrparam(params) {
        if (!hasValue(params) || (params.length < 2)) {
            return false;
        }
        this.a = params[0].slice(1);
        this.b = params[1];
        return (!isNaN(this.a) && !isNaN(this.b) && this.a < RegisterTotal && this.b < AddrTotal);
    }


    str2cmd(text) {
        if (!hasValue(text)) {
            return;
        }
        // console.log("bbb");

        // console.log(text);
        let ls = text.split(" ");
        let name = ls[0];
        let params = ls[1].split(",");
        // console.log("ccc");
        // console.log(ls);
        // console.log(params);
        this.a = null;
        this.b = null;
        this.c = null;
        switch (name) {
            case "ADDD":
                if (this._get3param(params)) {
                    return new AddCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
                }
                break;
            case "SUBD":
                if (this._get3param(params)) {
                    return new SubCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
                }
                break;
            case "MULD":
                if (this._get3param(params)) {
                    return new MulCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
                }
                break;
            case "DIVD":
                if (this._get3param(params)) {
                    return new DivCommand([register_[this.a], register_[this.b]], register_[this.c], register_, this.c);
                }
                break;
            case "LD":
                if (this._getaddrparam()) {
                    return new LoadCommand([addr_[this.b], NULL_VALUE], register_[this.a], register_, this.a);
                }
                break;
            case "ST":
                if (this._getaddrparam()) {
                    return new StoreCommand([register_[this.a], NULL_VALUE], addr_[this.b], addr_, this.b);
                }
                break;
            default:
                break;
        }
    }

    lines2cmd(text) {
        let lines = text.split("\n");
        // console.log("aaa");
        // console.log(lines);
        let cmds = [];
        for (let i in lines) {
            // console.log(lines[i]);
            let cmd = this.str2cmd(lines[i]);
            if (hasValue(cmd)) {
                cmds.push(cmd);
            }
        }
        return cmds;
    }


    //string input
    addCommandsText(text) {
        if (typeof(text) === "string") {
            let cmds = this.lines2cmd(text)
            if (hasValue(cmds)) {
                for (let i in cmds) {
                    this.commands.push(cmds[i]);
                }
            }
        }

    }

    // commman list
    addCommands(commands) {
        for (let i in commands) {
            this.commands.push(cmds[i]);
        }
    }

    canAddRS(rs, command) {
        // console.log(command.location);
        return (command.location === "InstructionQueue") && (rs.typeName === command.typeName) && (!rs.busy())
    }

    addRS(rs, command) {
        Message("ADD CMD TO RS", command.toString());
        rs.command = command;
        command.inputReady = false;
        command.location = "ReservationStation";
        command.write = new Value_();
        command.write.name = rs.name;
        // command.write.name = "#" + command.write.id.toString();
        command.write_obj[command.write_id].val = command.write;
    }

    tic() {
        if (this.commands.length > 0) {
            let command = this.commands[0];
            for (var i in allRS[T ^ 1]) {
                let rs = allRS[T ^ 1][i];
                //move command to ReservationStation
                if (this.canAddRS(rs, command)) {
                    this.addRS(rs, command);
                    this.commands.shift();
                    // console.log(this.commands.length);
                    // console.log(this.commands);
                    break;
                }
            }
        } else {
            Error('command queue empty');
        }
    }
}

let insQueue = makeMirror(new InstructionQueue_());
