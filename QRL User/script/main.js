// Consts and vars
let RELCHC_NumInput = $(".RELCHC-NumInput");
let RELCHC_SuccessStatus = $(".RELCHC-SuccessStatus");
let RELCHC_Button = $(".RELCHC-Button");
let TODO_Content = $(".TODO-Content");
let TODO_ButtonENTR = $(".entr");
let TODO_ButtonEXIT = $(".exit");
let TODO_ButtonBEND = $(".bsta");
let TODO_ButtonBSTA = $(".bend");


// Main functions
RELCHC_Button.click(() => {
    HTTP_RelnumRequest()
    TODO_ButtonENTR.click(() => {
        HTTP_TodoRequest("entrance");
    });
    TODO_ButtonEXIT.click(() => {
        HTTP_TodoRequest("exit");
    });
    TODO_ButtonBSTA.click(() => {
        HTTP_TodoRequest("breakent");
    });
    TODO_ButtonBEND.click(() => {
        HTTP_TodoRequest("breakend");
    });
})



function HTTP_RelnumRequest(){
    let APP_Cookie = APP_GetCookie("inform");
    if (APP_Cookie) {
        let JSON_AppCookie = JSON.parse(APP_Cookie);
        JSON_AppCookie["type"] = "checkrelnum";
        JSON_AppCookie["relnum"] = RELCHC_NumInput.val();

        let xhr = new XMLHttpRequest();
        let HTTP_RequestContent = JSON.stringify(JSON_AppCookie);
        xhr.open('GET', `https://qrl-server.glitch.me/${encodeURIComponent(HTTP_RequestContent)}`, true);
        xhr.withCredentials = false;
        xhr.send();

        xhr.onload = () => {
            let HTTP_ResponseFLAG = xhr.responseText;
            if (HTTP_ResponseFLAG === "1") {
                RELCHC_SuccessStatus.css({"display": "block"});
                RELCHC_Button.css({"opacity": "0"});
                RELCHC_Button.attr({"disabled": "disabled"});
                RELCHC_NumInput.css({"color": "#ffffff"});
                RELCHC_NumInput.attr({"disabled": "disabled"});
                TODO_Content.css({"display": "flex"});
            }
        };

        xhr.onerror = () => {
            window.location.href = 'server-error.html';
        };
    } else {
        window.location.href = 'registration.html';
    }
}

function HTTP_TodoRequest(TODO_Value) {
    let APP_Cookie = APP_GetCookie("inform");
    if (APP_Cookie) {
        let JSON_AppCookie = JSON.parse(APP_Cookie);
        JSON_AppCookie["type"] = TODO_Value;

        let xhr = new XMLHttpRequest();
        let HTTP_RequestContent = JSON.stringify(JSON_AppCookie);
        xhr.open('GET', `https://qrl-server.glitch.me/${encodeURIComponent(HTTP_RequestContent)}`, true);
        xhr.withCredentials = false;
        xhr.send();

        xhr.onload = () => {
            if (xhr.responseText === "1"){
                alert("YEP")
            }
        };

        xhr.onerror = () => {
            window.location.href = 'server-error.html';
        };
    } else {
        window.location.href = 'registration.html';
    }
}

function APP_GetCookie(COOK_NAME) {
    let COOK_Matches = document.cookie.match(new RegExp(
        "(?:^|; )" + COOK_NAME.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return COOK_Matches ? decodeURIComponent(COOK_Matches[1]) : undefined;
}
