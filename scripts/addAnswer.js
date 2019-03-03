"use strict";

import runTest from "./runTest";
import saveGood from "./saveGood";

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

