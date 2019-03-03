"use strict";

export default function loadBody(request, response, callback) {
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
