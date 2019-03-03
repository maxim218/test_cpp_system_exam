"use strict";

import makeQuery from "./makeQuery";

export default function saveGood(man_code, man_id) {
    const query = " INSERT INTO ans (ans_creator, ans_content, ans_status) VALUES ($1, $2, $3); ";
    const arr = [
        parseInt(man_id),
        man_code + "",
        "OK",
    ];
    makeQuery(query, arr, () => {}, () => {});
}