// Consts and vars
let FORM_ValuesORGANID = $(".FORM-InputORGANID");
let FORM_ValuesMEMBERID = $(".FORM-InputMEMBERID");
let COOKIE_MaxAge = 600;



// Main event listener
$(".FORM-Button").click(FORM_OnHandle);



// Main functions
function FORM_OnHandle() {
    let xhr = new XMLHttpRequest();
    let HTTP_RequestContent = `{"type":"checking","organid":"${FORM_ValuesORGANID.val()}","memberid":"${FORM_ValuesMEMBERID.val()}"}`;
    xhr.open('GET', `https://qrl-server.glitch.me/${encodeURIComponent(HTTP_RequestContent)}`, true);
    xhr.withCredentials = false;
    xhr.send();

    xhr.onload = () => {
        FORM_Working(xhr.responseText);
    };

    xhr.onerror = () => {
        window.location.href = 'server-error.html';
    };

}

function FORM_Working(HTTP_ResponseFlag) {
    if (HTTP_ResponseFlag === "0") {
        $(".REG-InvalidData").css({"display":"block"})
    } else if (HTTP_ResponseFlag === "1") {
        let COOCKIE_Content = encodeURIComponent(`{"organid":"${FORM_ValuesORGANID.val()}","memberid":"${FORM_ValuesMEMBERID.val()}"}`);
        document.cookie = `inform=${COOCKIE_Content}; path=/; max-age=${COOKIE_MaxAge}`;
        window.location.href = "main.html"
    } else {
        window.location.href = 'server-error.html';
    }
}
