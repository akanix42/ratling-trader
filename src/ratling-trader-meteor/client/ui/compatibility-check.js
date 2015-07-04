function UiLoader() {

}

function checkCompatibility() {
    var ROT = require('rot');

    if (!ROT.isSupported()) {
        alert("The rot.js library isn't supported by your browser.");
        return false;
    }
    return true;
}