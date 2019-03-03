"use strict";

export default function runServer() {
    const fs = require("fs");
    const configString = fs.readFileSync('config.json', 'utf8');
    const configObject = JSON.parse(configString);
    const port = configObject.port;

    const express = require("express");
    const app = express();

    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        next();
    });

    app.listen(port);
    console.log("Port: " + port.toString());

    return app;
}