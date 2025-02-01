CREATE DATABASE studentdata

USE studentdata

CREATE TABLE OCRDATA (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_id VARCHAR(255) NOT NULL,
    top_left JSON NOT NULL,
    top_right JSON NOT NULL,
    bottom_left JSON NOT NULL,
    bottom_right JSON NOT NULL,
    student_region JSON NOT NULL,
);

INSERT INTO OCRDATA (name, image_id, top_left, top_right, bottom_left, bottom_right, student_region)
VALUES (
    'Yingzhu Zhou',
    'some_image_id',
    JSON_ARRAY(3311, 2213),
    JSON_ARRAY(3661, 2213),
    JSON_ARRAY(3311, 2634),
    JSON_ARRAY(3661, 2634),
    JSON_ARRAY(
        JSON_ARRAY(3486.191162109375, 2423.927490234375),
        JSON_ARRAY(349.65777587890625, 421.1594543457031),
        0.0011821674415841699
    )
);