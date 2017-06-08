/**
 * Created by ytl on 2017/6/4.
 */


function debug_run() {
    // timerStepOne();
    // timerStepContinue();
    for (let i = 1; i <= 3; i++) {
        memory_watch_list.push(i);
        memory[i] = i;
    }
    console.log("debug!");
}
