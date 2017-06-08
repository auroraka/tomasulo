// // class Instruction {
// //     constructor(Op, Dst, SrcJ, SrcK) {
// //         this.Op = Op;
// //         this.Dst = Dst;
// //         this.SrcJ = SrcJ;
// //         this.SrcK = SrcK;
// //     }
// //
// //     to_html_tbody() {
// //         return ''
// //             + '<tr>'
// //             + '<td>' + this.Op + '</td>'
// //             + '<td>' + this.Dst + '</td>'
// //             + '<td>' + this.SrcJ + '</td>'
// //             + '<td>' + this.SrcK + '</td>'
// //             // + '<td>' + (this.Out ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
// //             // + '<td>' + (this.Exe ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
// //             // + '<td>' + (this.WB ? '<i class="large green checkmark icon"></i>' : '') + '</td>'
// //             + '</tr>';
// //     }
// // }
//
//
// class ReservationStation {
//     constructor(Time, Name, Busy, Op, read1, read2, write) {
//         this.Time = Time;
//         this.Name = Name;
//         this.Busy = Busy;
//         this.Op = Op;
//         this.read1 = read1;
//         this.read2 = read2;
//         this.write = write;
//         this.A = null;
//     }
//
//     to_html_tbody() {
//         return ''
//             + '<tr>'
//             + '<td>' + this.Time + '</td>'
//             + '<td>' + this.Name + '</td>'
//             + '<td>' + this.Busy + '</td>'
//             + '<td>' + this.Op + '</td>'
//             + '<td>' + this.read1 + '</td>'
//             + '<td>' + this.read2 + '</td>'
//             + '<td>' + this.write + '</td>'
//             + '</tr>';
//     }
// }

//
// class Calculator {
//     constructor(name, op, rest_time) {
//         this.name = name;
//         this.op = op;
//         this.rest_time = rest_time;
//     }
//
//     to_html_tbody() {
//         return ''
//             + '<tr>'
//             + '<td>' + this.name + '</td>'
//             + '<td>' + this.op + '</td>'
//             + '<td>' + this.rest_time + '</td>'
//             + '</tr>';
//     }
//
// }

// function init() {
//     let RSNum = 11;
//
//     let RS = new Array(RSNum);
//     for (let i = 0; i < RSNum; ++i) {
//         RS[i] = new ReservationStation(i);
//     }
//
//
//     alert('Done!');
// }