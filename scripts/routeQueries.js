"use strict";

import addAnswer from "./addAnswer";
import loadBody from "./loadBody";
import getPage from "./getPage";
import addUser from "./addUser";
import initDatabase from "./initDatabase";
import getRecords from "./getRecords";

let arr = [];
let free = true;

let inter = setInterval(function() {
    if(arr.length > 0) {
        if(free === true) {
            free = false;
            addAnswer(arr[0].request, arr[0].response, arr[0].bodyObject);
        } else {
            if(arr[0].response.finished) {
                arr.splice(0, 1);
                free = true;
            }
        }
    }
}, 50);

export default function routeQueries(app) {
    app.get('/', (request, response) => {
        getPage(request, response);
    });

    app.get('/api/database/operation/init/tables/ok', (request, response) => {
        initDatabase(request, response);
    });

    app.get('/api/database/records', (request, response) => {
        getRecords(request, response);
    });

    app.post('/api/user/add', (request, response) => {
        loadBody(request, response, (bodyObject) => {
            addUser(request, response, bodyObject);
        });
    });

    app.post('/api/answer/add', (request, response) => {
        loadBody(request, response, (bodyObject) => {
            arr.push({
                request: request,
                response: response,
                bodyObject: bodyObject,
            });
        });
    });
}
