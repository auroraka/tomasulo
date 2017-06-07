/**
 * Created by ytl on 2017/6/8.
 */

function hasValue(data) {
    return (data !== undefined) && (data !== null) && (data !== "");
}


function assert(result) {
    if (result !== true) {
        console.log('something wrong!')
    }
}

function Message(key, text) {
    console.log("[" + key + "] " + text);
}

function Info(text) {
    console.log("[Info] " + text);
}

function Error(text) {
    console.log("[Error] " + text);
}

function cloneObject(obj) {
    return $.extend([], [obj])[0];
}
