function refreshInstructions(instructions) {
    let inst_tbody = $('#instructions');
    inst_tbody.text('');
    instructions.forEach(function (value) {
        inst_tbody.append(value.to_html_tbody());
    });
}

function regs_to_html_tbody(regs) {
    let x = "";
    x += '<tr>';
    for (let i in regs) {
        x += '<td>' + regs[i].toString() + '</td>'
    }
    x += '</tr>';
    return x;
}

function refreshRegisters(reg_tbody) {
    let regs = [];
    for (let i = 0; i < FloatPointRegisterTotal; i++) {
        regs.push(getRegisterValue(i))
    }
    // let reg_tbody = $('#regs');
    reg_tbody.text('');
    reg_tbody.append(regs_to_html_tbody(regs));

    // ToDo: 1. Value; 2. Qi
}

function refreshMems() {
    let mems = [];
    for (let i = 0; i < 11; i++) {
        mems.push(getMemValue(i))
    }
    let reg_tbody = $('#mems');
    reg_tbody.text('');
    reg_tbody.append(regs_to_html_tbody(mems));
}

function refreshRS(regs) {
    let inst_tbody = $('#rs');
    inst_tbody.text('');
    regs.forEach(function (value) {
        inst_tbody.append(value.to_html_tbody());
    });
}

function refreshCalculators(calcs) {
    let calc_tbody = $('#calculator');
    calc_tbody.text('');
    calcs.forEach(function (value) {
        calc_tbody.append(value.to_html_tbody());
    });
}