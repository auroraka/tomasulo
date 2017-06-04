/**
 * Created by ytl on 2017/6/4.
 */
function main() {
    backend_init();
    for (var i = 0; i <= 10; i++) {
        setRegisterValue(i, i);
    }
    insQueue.addCommandsText(
        'ADDD F1,F2,F3\n' +
        'SUBD F1,F2,F3\n');

    refreshAllInstructions();
    refreshAllRegisters();
}
