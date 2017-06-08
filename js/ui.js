function refreshFPRegisters(fp_reg_tbody) {
    let values = '<tr><td>Value</td>';
    let qis = '<tr><td>Qi</td>';
    for (let i in fp) {
        values += fp[i].to_html_tbody_value();
        qis += fp[i].to_html_tbody_qi();
    }
    values += '</tr>';
    qis += '</tr>';
    fp_reg_tbody.text(values + qis);
}

function refreshCDB(cdb_tbody) {
    cdb_tbody.text(cdb.to_html_tbody());
}

function refreshReservationStations(rs_tbody) {
    let rs = '';
    for (let i in addRS) {
        rs += addRS[i].to_html_tbody();
    }
    for (let i in multRS) {
        rs += multRS[i].to_html_tbody();
    }
    rs_tbody.text(rs);
}

function refreshCalculator(cal_tbody) {
    let cal = '';
    for (let i in adder) {
        cal += '<tr><td>Add / Sub</td>' + adder[i].to_html_tbody_tds() + '</tr>';
    }
    cal += '<tr><td>Mul / Div</td>' + multiplier.to_html_tbody_tds() + '</tr>';
    cal += '<tr><td>Load</td>' + lder.to_html_tbody_tds() + '</tr>';
    cal += '<tr><td>Store</td>' + ster.to_html_tbody_tds() + '</tr>';
    cal_tbody.text(cal);
}

function refreshLoadQueue(lq_tbody) {
    let load = '';
    for (let i in LQ) {
        load += LQ[i].to_html_tbody_lq();
    }
    lq_tbody.text(load);
}

function refreshStoreQueue(sq_tbody) {
    let store = '';
    for (let i in SQ) {
        store += SQ[i].to_html_tbody_sq();
    }
    sq_tbody.text(store);
}

function refreshInstructions(ins_tbody) {
    let ins = '';
    for (let i in instructions) {
        ins += instructions[i].to_html_tbody();
    }
    ins_tbody.text(ins);
}

function refreshMemories(mem_tbody) {

}
