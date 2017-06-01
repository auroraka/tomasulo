/**
 * Created by onionyst on 6/1/17.
 */

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
    var RSNum = 11;

    var RS = new Array(RSNum);
    for (var i = 0; i < RSNum; ++i) {
        RS[i] = new ReservationStation(i);
    }



    alert('Done!');
}