CREATE TABLE mailbox_messages
(
    uid                  SERIAL PRIMARY KEY,
    mailbox_id           INTEGER NOT NULL,
    sender               TEXT NOT NULL,
    content              TEXT NOT NULL,
    datetime             DATE NOT NULL,
    FOREIGN KEY (mailbox_id) REFERENCES users (id)
);

INSERT INTO mailbox_messages (mailbox_id, sender, content, datetime)
VALUES (2, 'Brittaney Audrey', 'Open-architected human-resource parallelism', '2018-01-06T00:29:05Z'),
       (2, 'Isadora Niche', 'Configurable value-added Graphical User Interface', '2019-03-24T02:09:34Z'),
       (2, 'Ebba Hebburn', 'Horizontal needs-based application', '2019-02-12T11:33:17Z'),
       (2, 'Shoshanna Tasker', 'Profit-focused asynchronous hierarchy', '2019-04-30T14:46:41Z'),
       (2, 'Charmion Bagenal', 'Open-architected discrete open architecture', '2018-05-03T22:47:09Z');
