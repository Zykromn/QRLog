let LNCH_Flag = LNCH_Preapare();
if (LNCH_flag === -2) {
    window.location.href = './registration.html';
} else if (LNCH_Flag === 0) {
    window.location.href = './invalid-cookie.html';
} else if (LNCH_Flag === 1) {
    window.location.href = './system.html';
} else if (LNCH_Flag === 2) {
    window.location.href = './success sopryajeniyw.html';
}
setTimeout(LNCH_Ready, 2000);


function LNCH_Ready() {

}

function LNCH_Preapare() {
    document.cookie = `inform=${encodeURIComponent('{"type":"devicecheck","systemid":"000000002","password":"123456"}')}`;

    let APP_Cookie = document.cookie;
    if (APP_Cookie) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', `http://192.168.0.138:1337/${APP_Cookie.replace("inform=", "")}`, false);
        xhr.send();

        return xhr.status;
    } else {
        return -2;
    }


}

