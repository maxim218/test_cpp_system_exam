/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = makeQuery;


const params = {
    database: "base",
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5432,
};

const pg = __webpack_require__(10);

function createNewClient() {
    return new pg.Client({
        user: params.user,
        host: params.host,
        database: params.database,
        password: params.password,
        port: params.port,
    });
}

function makeQuery(query, arr, callbackGood, callbackBad) {
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



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runServer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routeQueries__ = __webpack_require__(5);





function start() {
    const app = Object(__WEBPACK_IMPORTED_MODULE_0__runServer__["a" /* default */])();
    Object(__WEBPACK_IMPORTED_MODULE_1__routeQueries__["a" /* default */])(app);
}

start();


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runServer;


function runServer() {
    const fs = __webpack_require__(0);
    const configString = fs.readFileSync('config.json', 'utf8');
    const configObject = JSON.parse(configString);
    const port = configObject.port;

    const express = __webpack_require__(4);
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

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = routeQueries;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__addAnswer__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__loadBody__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__getPage__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__addUser__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__initDatabase__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__getRecords__ = __webpack_require__(15);









let arr = [];
let free = true;

let inter = setInterval(function() {
    if(arr.length > 0) {
        if(free === true) {
            free = false;
            Object(__WEBPACK_IMPORTED_MODULE_0__addAnswer__["a" /* default */])(arr[0].request, arr[0].response, arr[0].bodyObject);
        } else {
            if(arr[0].response.finished) {
                arr.splice(0, 1);
                free = true;
            }
        }
    }
}, 50);

function routeQueries(app) {
    app.get('/', (request, response) => {
        Object(__WEBPACK_IMPORTED_MODULE_2__getPage__["a" /* default */])(request, response);
    });

    app.get('/api/database/operation/init/tables/ok', (request, response) => {
        Object(__WEBPACK_IMPORTED_MODULE_4__initDatabase__["a" /* default */])(request, response);
    });

    app.get('/api/database/records', (request, response) => {
        Object(__WEBPACK_IMPORTED_MODULE_5__getRecords__["a" /* default */])(request, response);
    });

    app.post('/api/user/add', (request, response) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__loadBody__["a" /* default */])(request, response, (bodyObject) => {
            Object(__WEBPACK_IMPORTED_MODULE_3__addUser__["a" /* default */])(request, response, bodyObject);
        });
    });

    app.post('/api/answer/add', (request, response) => {
        Object(__WEBPACK_IMPORTED_MODULE_1__loadBody__["a" /* default */])(request, response, (bodyObject) => {
            arr.push({
                request: request,
                response: response,
                bodyObject: bodyObject,
            });
        });
    });
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addAnswer;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__runTest__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__saveGood__ = __webpack_require__(9);





//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const inputInfo_1 = "10 20 30";
const outputInfo_1 = "60";

const inputInfo_2 = "15 -8 4";
const outputInfo_2 = "11";

const inputInfo_3 = "-4 -12 -4";
const outputInfo_3 = "-20";

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

function addAnswer(request, response, bodyObject) {
    let man_code = bodyObject.man_code + "";
    let man_id = bodyObject.man_id + "";
    man_id = parseInt(man_id);
    if(!man_id) {
        man_id = -1;
    }

    setTimeout(function() {
        response.end(JSON.stringify({
            result: "ERROR",
            p: "TIME_OUT_ERROR",
        }));
    }, 8000);

    Object(__WEBPACK_IMPORTED_MODULE_0__runTest__["a" /* default */])(inputInfo_1, outputInfo_1, man_code, (objFirst) => {
        if(objFirst.result === "OK") {
            Object(__WEBPACK_IMPORTED_MODULE_0__runTest__["a" /* default */])(inputInfo_2, outputInfo_2, man_code, (objSecond) => {
                if(objSecond.result === "OK") {
                    Object(__WEBPACK_IMPORTED_MODULE_0__runTest__["a" /* default */])(inputInfo_3, outputInfo_3, man_code, (objThird) => {
                        if(objThird.result === "OK") {
                            Object(__WEBPACK_IMPORTED_MODULE_1__saveGood__["a" /* default */])(man_code, man_id);
                            response.end(JSON.stringify(objThird));
                        } else {
                            response.end(JSON.stringify(objThird));
                        }
                    });
                } else {
                    response.end(JSON.stringify(objSecond));
                }
            });
        } else {
            response.end(JSON.stringify(objFirst));
        }
    });
}



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = runTest;


const fs = __webpack_require__(0);
const exec = __webpack_require__(8).exec;

function startConsole(cmd, callbackGood, callbackBad) {
    exec(cmd, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            callbackBad(stderr);
        } else {
            callbackGood(stdout);
        }
    });
}

function oneSpace(s) {
    s = s.trim();
    return s.replace(/\s+/g, ' ');
}

function modifyString(s) {
    let resultString = "";
    for(let i = 0; i < s.length; i++) {
        const c = s.charAt(i);
        if(c === '\n' || c === '\t' || c === '\r') {
            resultString += ' ';
        } else {
            resultString += c;
        }
    }
    return resultString;
}

function getNormalString(s) {
    s = modifyString(s);
    s = s.trim();
    s = oneSpace(s);
    s = s.trim();
    s = oneSpace(s);
    return s;
}

function runTest(inputTextParam, outputTextParam, codeParam, callback) {
    let inputText = getNormalString(inputTextParam + "");
    let outputText = getNormalString(outputTextParam + "");
    
    const fileCodeSrc = "cpp/main.cpp";
    fs.writeFileSync(fileCodeSrc, codeParam + "");

    const fileInputSrc = "cpp/input.txt";
    fs.writeFileSync(fileInputSrc, inputText + "");

    startConsole("cd cpp && make main && ./main < input.txt", (programOutParam) => {
        programOutParam = programOutParam + "";
        
        let buffer = "";
        let flag = false;
        for(let i = 0; i < programOutParam.length; i++) {
            const c = programOutParam.charAt(i);
            if(c === '\n') {
                flag = true;
            }
            if(flag == true) {
                buffer += c;
            }
        }

        programOutParam = buffer;

        let programOut = getNormalString(programOutParam + "");

        if(getNormalString(outputText) === getNormalString(programOut)) {
            callback({
                result: "OK"
            });
        } else {
            callback({
                result: "ERROR",
                a: getNormalString(programOut),
                b: getNormalString(outputText),
            });
        }
    }, () => {
        callback({
            result: "ERROR",
        });
    });
}


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("child_process");

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = saveGood;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__makeQuery__ = __webpack_require__(1);




function saveGood(man_code, man_id) {
    const query = " INSERT INTO ans (ans_creator, ans_content, ans_status) VALUES ($1, $2, $3); ";
    const arr = [
        parseInt(man_id),
        man_code + "",
        "OK",
    ];
    Object(__WEBPACK_IMPORTED_MODULE_0__makeQuery__["a" /* default */])(query, arr, () => {}, () => {});
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("pg");

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = loadBody;


function loadBody(request, response, callback) {
    const buffer = [];
    request.on('data', (data) => {
        buffer.push(data);
    }).on('end', () => {
        const bodyString = buffer.join("");
        try {
            const bodyObject = JSON.parse(bodyString);
            callback(bodyObject);
        } catch (err) {
            response.end(JSON.stringify({
                result: "BODY_LOADING_ERROR"
            }));
        }
    });
}


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getPage;


const fs = __webpack_require__(0);

function getPage(request, response) {
    const pageName = 'index.html';
    fs.readFile(pageName, 'utf8', function(err, result) {
        response.end(result);
    });
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = addUser;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__makeQuery__ = __webpack_require__(1);




function addUser(request, response, bodyObject) {
    const fio = bodyObject.fio + "";
    const school = bodyObject.school + "";

    const query = " INSERT INTO man (man_fio, man_school) VALUES ($1, $2) RETURNING *; ";

    Object(__WEBPACK_IMPORTED_MODULE_0__makeQuery__["a" /* default */])(query, [fio, school], (arr) => {
        const man = arr[0];
        response.end(JSON.stringify(man));
    }, () => {
        response.end(JSON.stringify({
            result: "ERROR_OF_ADDING_MAN"
        }));
    });
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = initDatabase;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__makeQuery__ = __webpack_require__(1);




const fs = __webpack_require__(0);

function initDatabase(request, response) {
    const fileName = 'code.sql';
    fs.readFile(fileName, 'utf8', function(err, result) {
        const sqlCode = result;
        Object(__WEBPACK_IMPORTED_MODULE_0__makeQuery__["a" /* default */])(sqlCode, [], () => {
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


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getRecords;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__makeQuery__ = __webpack_require__(1);




function getRecords(request, response) {
    const q = " SELECT man_id, ans_creator, man_fio, man_school, ans_id, ans_status FROM ans INNER JOIN man ON (man_id = ans_creator) ORDER BY ans_id DESC; ";
    const a = [];
    Object(__WEBPACK_IMPORTED_MODULE_0__makeQuery__["a" /* default */])(q, a, (arr) => {
        response.end(JSON.stringify(arr, null, 4));
    }, () => {
        response.end(JSON.stringify({
            result: "ERROR"
        }));
    });
}


/***/ })
/******/ ]);