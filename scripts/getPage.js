"use strict";

const fs = require("fs");

export default function getPage(request, response) {
    const pageName = 'index.html';
    fs.readFile(pageName, 'utf8', function(err, result) {
        response.end(result);
    });
}
