function secondPart(num, size) {
    var s = num + '';
    while (s.length < size) {
       s = '0' + s;
    }
    return s;
}

function convertTime(secs) {
    return Math.floor(secs / 60) + ':' + (secondPart(secs % 60, 2));
}

export default convertTime;