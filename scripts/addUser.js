"use strict";

import makeQuery from "./makeQuery";

export default function addUser(request, response, bodyObject) {
    const fio = bodyObject.fio + "";
    const school = bodyObject.school + "";

    const query = " INSERT INTO man (man_fio, man_school) VALUES ($1, $2) RETURNING *; ";

    makeQuery(query, [fio, school], (arr) => {
        const man = arr[0];
        response.end(JSON.stringify(man));
    }, () => {
        response.end(JSON.stringify({
            result: "ERROR_OF_ADDING_MAN"
        }));
    });
}
