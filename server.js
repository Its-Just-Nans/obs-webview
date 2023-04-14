const http = require("http");
const fs = require("fs");
const WebSocket = require("ws");

let needReload = false;

const webPORT = 8080;

const server = http
    .createServer(function (request, response) {
        response.writeHead(200, {
            "Content-Type": "text/html; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, PUT, POST",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        });
        if (request.url === "/") {
            const streamer = fs.createReadStream("index.html");
            streamer.pipe(response);
            streamer.on("end", () => {
                response.end();
            });
        } else if (request.url === "/needRefresh") {
            response.end(needReload ? "yes" : "no");
        } else if ("/favicon.ico") {
            // console.log(request.url)
        } else {
            console.log(request.url);
        }
    })
    .listen(webPORT);

const wsServer = new WebSocket.Server({
    server,
});

wsServer.on("connection", function (ws) {
    console.log("webpage connected");
});

console.log(`listenning on http://localhost:${webPORT}`);

const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = async () => {
    return new Promise((res, rej) => {
        readline.question(`[Enter] to reload\n`, (name) => {
            wsServer.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    // check if client is ready
                    client.send("reload");
                }
            });
            res();
        });
    });
};

const reload = async () => {
    question().then(() => {
        reload();
    });
};
reload();
