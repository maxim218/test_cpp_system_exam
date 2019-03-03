"use strict";

const fs = require("fs");
const exec = require('child_process').exec;

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
    s = s.split("\u0000").join("");
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

export default function runTest(inputTextParam, outputTextParam, codeParam, callback) {
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
