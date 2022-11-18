// Launching
let APP_LangDir = LNCH_LanguageSelect()
if (!APP_LangDir) {
    window.location.href = "language.html"
} else if (APP_LangDir) {
    LNCH_Preapare();
}




// Main functions
function LNCH_LanguageSelect() {
    let APP_Cookie = APP_GetCookie("language")
    if (APP_Cookie) {
        if (APP_Cookie === "kz") {
            return "pages-kz"
        } else if (APP_Cookie === "ru") {
            return "pages-ru"
        }
    } else {
        return undefined;
    }
}

function LNCH_Preapare() {
    let APP_Cookie = APP_GetCookie("inform");
    if (APP_Cookie) {
        let JSON_AppCookie = JSON.parse(APP_Cookie);
        JSON_AppCookie["type"] = "checking";

        let xhr = new XMLHttpRequest();
        let HTTP_RequestContent = JSON.stringify(JSON_AppCookie);
        xhr.open('GET', `https://qrl-server.glitch.me/${encodeURIComponent(HTTP_RequestContent)}`, true);
        xhr.withCredentials = false;
        xhr.send();

        xhr.onload = () => {
            let LNCH_Flag = xhr.responseText;
            if (LNCH_Flag === "0") {
                window.location.href = `${APP_LangDir}/registration.html`;
            } else if (LNCH_Flag === "1") {
                window.location.href = `${APP_LangDir}/main.html`;
            } else {
                window.location.href = `${APP_LangDir}/server-error.html`;
            }
        };

        xhr.onerror = () => {
            window.location.href = `${APP_LangDir}/server-error.html`;
        };
    } else {
        window.location.href = `${APP_LangDir}/registration.html`
    }
}

function APP_GetCookie(COOK_NAME) {
    let COOK_Matches = document.cookie.match(new RegExp(
        "(?:^|; )" + COOK_NAME.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return COOK_Matches ? decodeURIComponent(COOK_Matches[1]) : undefined;
}
