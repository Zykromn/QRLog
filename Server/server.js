// Libs
var http = require('http');
var fs = require("fs");



// Consts and vars
const SERVER_Port = 1337;



// Initializings
const server = http.createServer();
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("SERVER LAUNCHED");
console.log(`Port - ${SERVER_Port}`)
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");




// Main functions
server.listen(SERVER_Port);
server.on("request", (HTTP_Request, HTTP_Response) => {
    HTTP_RequestProcessing(HTTP_Request, HTTP_Response);
})

function HTTP_RequestProcessing(HTTP_Request, HTTP_Response) {
    console.log("\n\n")
    console.log("===========================================================");
    console.log("HTTP REQUEST HAS BEEN RECEIVED");

    let HTTP_EncodePayloadRequest = HTTP_Request.url.replace("/", "");
    let HTTP_PayloadRequest = decodeURIComponent(HTTP_EncodePayloadRequest);
    let JSON_PayloadRequest = JSON.parse(HTTP_PayloadRequest);

    console.log();
    console.log("--------------------------------------------------");
    console.log(`System request - ${HTTP_EncodePayloadRequest}`);
    console.log(`Payload request - ${HTTP_PayloadRequest}`);
    console.log("--------------------------------------------------");
    console.log(`Type - ${JSON_PayloadRequest["type"]}`);

    let HTTP_RequestWorkingFLAG;
    if (JSON_PayloadRequest["type"] === "checking"){
        HTTP_RequestWorkingFLAG = JSON_RequestMemberCheck(JSON_PayloadRequest);
    } else if (JSON_PayloadRequest["type"] === "checkrelnum") {
        HTTP_RequestWorkingFLAG = JSON_RequestRelevant();
    } else if (JSON_PayloadRequest["type"] === "setrelnum") {
        HTTP_RequestWorkingFLAG = JSON_RequestSetrelnum(JSON_PayloadRequest);
    } else if ((JSON_PayloadRequest["type"] === "entrance") || (JSON_PayloadRequest["type"] === "exit") || (JSON_PayloadRequest["type"] === "breakent") || (JSON_PayloadRequest["type"] === "breakend")) {
        HTTP_RequestWorkingFLAG = JSON_RequestWorking(JSON_PayloadRequest);
    }

    HTTP_Response.setHeader('Access-Control-Allow-Origin', '*');
    HTTP_Response.end(HTTP_RequestWorkingFLAG)

    console.log("===========================================================");
}

function JSON_RequestMemberCheck(JSON_PayloadRequest) {
    let JSON_PayloadRequestORGANID = JSON_PayloadRequest["organid"];
    let JSON_PayloadRequestMEMBERID = JSON_PayloadRequest["memberid"];
    console.log(`Organization - ${JSON_PayloadRequestORGANID}`);

    try {
        let DOC_Data = fs.readFileSync('./db/organizationslist-db.json', 'utf8');
        let JSON_DataBaseORGLIST = JSON.parse(DOC_Data);

        if (JSON_PayloadRequestORGANID in JSON_DataBaseORGLIST) {
            console.log("Registered. Data base control access is allowed");
            console.log("--------------------------------------------------");

            if (JSON_PayloadRequestMEMBERID in JSON_DataBaseORGLIST[JSON_PayloadRequestORGANID]["members"]) {
                return ("1");
            } else {
                return ("0");
            }
        } else {
            console.log("Not registered. Data base control access is blocked");
            console.log("--------------------------------------------------");

            return ("0");
        }
    } catch (err) {
        console.log(`Error reading file - ${err}`);
        console.log("--------------------------------------------------");
        return ("-1")
    }
}

function JSON_RequestWorking(JSON_PayloadRequest) {
    let JSON_PayloadRequestORGANID = JSON_PayloadRequest["organid"];
    let JSON_PayloadRequestTYPE = JSON_PayloadRequest["type"];
    let JSON_PayloadRequestMEMBERID = JSON_PayloadRequest["id"];
    console.log(`Organization - ${JSON_PayloadRequestORGAN}`);

    try {
        let DOC_Data = fs.readFileSync('./db/infolist-db.json', 'utf8');
        let JSON_DataBaseORGLIST = JSON.parse(DOC_Data);

        if (JSON_PayloadRequestORGAN in JSON_DataBaseORGLIST) {
            console.log("Registered. Data base control access is allowed");
            console.log("--------------------------------------------------");

            let NOW_Day = `${NOW_TimeData.getDate()}.${NOW_TimeData.getMonth()}.${NOW_TimeData.getFullYear()}`;
            let NOW_TimeData = new Date.now();
            JSON_DataBaseORGLIST[JSON_PayloadRequestORGANID][NOW_Day][JSON_PayloadRequestTYPE][JSON_PayloadRequestMEMBERID] = `${NOW_TimeData.getSeconds()}:${NOW_TimeData.getMinutes()}:${NOW_TimeData.getHours()}`;
            fs.writeFileSync('./db/infolist-db.json', JSON.stringify(JSON_DataBaseORGLIST, null, 4));

            return ("1")
        } else {
            console.log("Not registered. Data base control access is blocked");
            console.log("--------------------------------------------------");

            return ("0");
        }
    } catch (err) {
        console.log(`Error reading file - ${err}`);
        console.log("--------------------------------------------------");
        return ("-1")
    }
}

function JSON_RequestRelevant(JSON_PayloadRequest) {
    let JSON_PayloadRequestORGANID = JSON_PayloadRequest["organid"];
    let JSON_PayloadRequestRELNUM = JSON_PayloadRequest["relnum"];
    console.log(`Organization - ${JSON_PayloadRequestORGANID}`);

    try {
        let DOC_Data = fs.readFileSync('./db/organizationslist-db.json', 'utf8');
        let JSON_DataBaseORGLIST = JSON.parse(DOC_Data);

        if (JSON_PayloadRequestORGANID in JSON_DataBaseORGLIST) {
            console.log("Registered. Data base control access is allowed");
            console.log("--------------------------------------------------");

            if (JSON_DataBaseORGLIST[JSON_PayloadRequestORGANID]["relnum"] === JSON_PayloadRequestRELNUM) {
                return ("1");
            } else {
                return ("0");
            }
        } else {
            console.log("Not registered. Data base control access is blocked");
            console.log("--------------------------------------------------");

            return ("0");
        }
    } catch (err) {
        console.log(`Error reading file - ${err}`);
        console.log("--------------------------------------------------");
        return ("-1")
    }
}

function JSON_RequestSetrelnum(JSON_PayloadRequest) {
    let JSON_PayloadRequestORGANID = JSON_PayloadRequest["organid"];
    let JSON_PayloadRequestRELNUM = JSON_PayloadRequest["relnum"];
    let JSON_PayloadRequestPASSWORD = JSON_PayloadRequest["password"];
    console.log(`Organization - ${JSON_PayloadRequestORGANID}`);

    try {
        let DOC_Data = fs.readFileSync('./db/organizationslist-db.json', 'utf8');
        let JSON_DataBaseORGLIST = JSON.parse(DOC_Data);

        if ((JSON_PayloadRequestORGANID in JSON_DataBaseORGLIST) && (JSON_DataBaseORGLIST[JSON_PayloadRequestORGANID]["password"] === JSON_PayloadRequestPASSWORD)) {
            console.log("Registered. Data base control access is allowed");
            console.log("--------------------------------------------------");
            JSON_DataBaseORGLIST[JSON_PayloadRequestORGANID]["relnum"] = JSON_PayloadRequestRELNUM;
            
            return ("1");
        } else {
            console.log("Not registered. Data base control access is blocked");
            console.log("--------------------------------------------------");

            return ("0");
        }
    } catch (err) {
        console.log(`Error reading file - ${err}`);
        console.log("--------------------------------------------------");
        return ("-1");
    }
}