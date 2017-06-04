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
    // return ''
    //     +
    //     + '<td>' + this.Op + '</td>'
    //     +
    //     + '<td>' + this.SrcJ + '</td>'
    //     + '<td>' + this.SrcK + '</td>'
    //     + '<td>' + (this.Out ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
    //     + '<td>' + (this.Exe ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
    //     + '<td>' + (this.WB ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
    //     + '</tr>';
    return x;
}
function refreshRegisters(regs) {
    let reg_tbody = $('#regs');
    reg_tbody.text('');
    reg_tbody.append(regs_to_html_tbody(regs));
}
