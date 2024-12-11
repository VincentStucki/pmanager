
DROP TABLE IF EXISTS manageuser;

CREATE TABLE manageuser (
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    website VARCHAR(50),
    username VARCHAR(50),
    password VARCHAR(50),
    remarks VARCHAR(50)
);
