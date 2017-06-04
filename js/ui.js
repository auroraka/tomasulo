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
        x += '<td>' + regs[i].val.toString() + '</td>'
    }
    x += '</tr>';
    // x += '<tr>';
    // for (let i in regs) {
    //     x += '<td>' + objectId(regs[i]) + '</td>'
    // }
    // x += '</tr>';
    return x;
}
function refreshRegisters(regs) {
    let reg_tbody = $('#regs');
    reg_tbody.text('');
    reg_tbody.append(regs_to_html_tbody(regs));
}

function refreshRS(regs) {
    let inst_tbody = $('#rs');
    inst_tbody.text('');
    regs.forEach(function (value) {
        inst_tbody.append(value.to_html_tbody());
    });
}
