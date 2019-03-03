"use strict";

import runTest from "./runTest";
import saveGood from "./saveGood";

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

const inputInfo_1 = "5 4 W W W W W W A A A W W A W A W W W W W W 1 2 3 2";
const outputInfo_1 = "W W W W W W A A A W W A W A W W W W W W YES 5 1 2 1 1 2 1 3 1 3 2";

const inputInfo_2 = "6 6 W W W W W W W A A A A W W A W W A W W A W W W W W A A A A W W W W W W W 4 4 4 2";
const outputInfo_2 = "W W W W W W W A A A A W W A W W A W W A W W W W W A A A A W W W W W W W YES 11 4 4 3 4 2 4 1 4 1 3 1 2 1 1 2 1 3 1 4 1 4 2";

const inputInfo_3 = "3 5 W W W W A W W A W W A W W W W 1 1 1 3";
const outputInfo_3 = "W W W W A W W A W W A W W W W YES 3 1 1 1 2 1 3";

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

export default function addAnswer(request, response, bodyObject) {
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

    runTest(inputInfo_1, outputInfo_1, man_code, (objFirst) => {
        if(objFirst.result === "OK") {
            runTest(inputInfo_2, outputInfo_2, man_code, (objSecond) => {
                if(objSecond.result === "OK") {
                    runTest(inputInfo_3, outputInfo_3, man_code, (objThird) => {
                        if(objThird.result === "OK") {
                            saveGood(man_code, man_id);
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

