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


function ReservationStation(id) {
    this.id = id;
    this.Op = null;
    this.Qj = 0;
    this.Qk = 0;
    this.Vj = null;
    this.Vk = null;
    this.Busy = false;
    this.A = null;
}


function init() {
    let RSNum = 11;

    let RS = new Array(RSNum);
    for (let i = 0; i < RSNum; ++i) {
        RS[i] = new ReservationStation(i);
    }


    alert('Done!');
}