"use strict";

const params = {
    database: "base",
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
};

const pg = require("pg");

function createNewClient() {
    return new pg.Client({
        user: params.user,
        host: params.host,
        database: params.database,
        password: params.password,
        port: params.port,
    });
}

export default function makeQuery(query, arr, callbackGood, callbackBad) {
    const client = createNewClient();
    client.connect();

    client.query(query, arr, (err, res) => {
        client.end();

        if(!err) {
            callbackGood(res.rows);
        } else {
            callbackBad();
        }
    });
}

