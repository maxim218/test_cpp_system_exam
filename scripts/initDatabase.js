"use strict";

import makeQuery from "./makeQuery";

const fs = require("fs");

export default function initDatabase(request, response) {
    const fileName = 'code.sql';
    fs.readFile(fileName, 'utf8', function(err, result) {
        const sqlCode = result;
        makeQuery(sqlCode, [], () => {
            response.end(JSON.stringify({
                result: "INIT_DATABASE_OK"
            }));
        }, () => {
            response.end(JSON.stringify({
                result: "ERROR_OF_INITING_DATABASE"
            }));
        });
    });
}
