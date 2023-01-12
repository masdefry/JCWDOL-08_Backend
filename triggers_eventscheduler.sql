-- INDEXING
USE titanic;
SELECT * FROM passengers;
CREATE INDEX idx_on_PassengerId ON passengers(PassengerId);
SHOW INDEXES FROM passengers;
DROP INDEX idx_on_PassengerId ON passengers;

SELECT * FROM passengers WHERE PassengerId = 700;



-- TRIGGERS
USE jcwdol08_productmanagement;

CREATE TRIGGER `set_useranme_uppercase` BEFORE INSERT ON users
FOR EACH ROW SET
	New.username = LOWER(NEW.username);

INSERT INTO users(username, email, password) VALUE ('NAYR', 'nayr@gmail.com', 'bca123');



-- EVENT SCHEDULER
SHOW EVENTS;
-- 1. Recuring Event 
CREATE EVENT backup_db_titanic
ON SCHEDULE EVERY 1 WEEK 
STARTS '2023-01-11 01:00:00'
DO
	SELECT * FROM titanic.passengers 
INTO OUTFILE  'D:/titanic_passengers.csv';

-- 2. One Time Event
INSERT INTO transactions(product_name, qty, total_price) VALUE ('Kaos', 1, '300000');
CREATE EVENT change_status_transactions 
    ON SCHEDULE AT DATE_ADD(NOW(), INTERVAL 1 MINUTE)
    DO
		UPDATE transactions SET status = 'Cancel'
        WHERE id = 3;