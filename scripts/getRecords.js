"use strict";

import makeQuery from "./makeQuery";

export default function getRecords(request, response) {
    const q = " SELECT man_id, ans_creator, man_fio, man_school, ans_id, ans_status FROM ans INNER JOIN man ON (man_id = ans_creator) ORDER BY ans_id DESC; ";
    const a = [];
    makeQuery(q, a, (arr) => {
        response.end(JSON.stringify(arr, null, 4));
    }, () => {
        response.end(JSON.stringify({
            result: "ERROR"
        }));
    });
}
