DROP TABLE IF EXISTS man;
DROP TABLE IF EXISTS ans;

CREATE TABLE man (
    man_id SERIAL PRIMARY KEY,
    man_fio TEXT,
    man_school TEXT
);

CREATE TABLE ans (
    ans_id SERIAL PRIMARY KEY,
    ans_creator INTEGER,
    ans_content TEXT,
    ans_status TEXT
);


