class Instruction {
    constructor(Op, Dst, SrcJ, SrcK) {
        this.Op = Op;
        this.Dst = Dst;
        this.SrcJ = SrcJ;
        this.SrcK = SrcK;
        this.Out = false;
        this.Exe = false;
        this.WB = false;
    }

    to_html_tbody() {
        return ''
            + '<tr>'
            + '<td>' + this.Op + '</td>'
            + '<td>' + this.Dst + '</td>'
            + '<td>' + this.SrcJ + '</td>'
            + '<td>' + this.SrcK + '</td>'
            + '<td>' + (this.Out ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
            + '<td>' + (this.Exe ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
            + '<td>' + (this.WB ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
            + '</tr>';
    }
}


class ReservationStation {
    constructor(Time, Name, Busy, Op, Vj, Vk, Qj, Qk) {
        this.Time = Time;
        this.Name = Name;
        this.Busy = Busy;
        this.id = null;
        this.Op = Op;
        this.Qj = Qj;
        this.Qk = Qk;
        this.Vj = Vj;
        this.Vk = Vk;
        this.A = null;
    }

    to_html_tbody() {
        return ''
            + '<tr>'
            + '<td>' + this.Time + '</td>'
            + '<td>' + this.Name + '</td>'
            + '<td>' + this.Busy + '</td>'
            + '<td>' + this.Op + '</td>'
            + '<td>' + this.Vj + '</td>'
            + '<td>' + this.Vk + '</td>'
            + '<td>' + this.Qj + '</td>'
            + '<td>' + this.Qk + '</td>'
            + '</tr>';
    }
}


function init() {
    let RSNum = 11;

    let RS = new Array(RSNum);
    for (let i = 0; i < RSNum; ++i) {
        RS[i] = new ReservationStation(i);
    }


    alert('Done!');
}