CREATE DATABASE studentdata

USE studentdata

CREATE TABLE Students (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    image_id VARCHAR(50) NOT NULL, 
    name TEXT NOT NULL,
    center DECIMAL(6,4) NOT NULL
);

INSERT INTO Students (image_id, name, center) 
VALUES ('2024-Software', 'John Doe', 500);