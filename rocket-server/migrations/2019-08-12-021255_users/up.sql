CREATE TABLE users
(
    id                   SERIAL  PRIMARY KEY,
    first_name           TEXT    NOT NULL,
    last_name            TEXT    NOT NULL,
    email                TEXT    NOT NULL,
    hashed_password      TEXT    NOT NULL,
--     activated            BOOLEAN NOT NULL DEFAULT FALSE,
--     authentication_token TEXT,
--     expiry_datetime      TIMESTAMP WITH TIME ZONE,
    CONSTRAINT unique_email UNIQUE (email)
);