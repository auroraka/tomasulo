function refreshInstructions(instructions) {
    let inst_tbody = $('#instructions');
    inst_tbody.text('');
    instructions.forEach(function (value) {
        inst_tbody.append(value.to_html_tbody());
    });
}
