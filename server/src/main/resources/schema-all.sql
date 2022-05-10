-- DROP
-- DATABASE IF EXISTS server_db;
-- CREATE
-- DATABASE server_db CHARACTER SET utf8 COLLATE utf8_general_ci;
USE
server_db;
DROP TABLE IF EXISTS service_tab;
CREATE TABLE service_tab
(
    id            BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_id    VARCHAR(64)  NOT NULL,
    service_name  VARCHAR(256) NOT NULL,
    service_owner VARCHAR(64)  NOT NULL,
    remark        MEDIUMTEXT NULL,
    is_delete     TINYINT(2) NOT NULL DEFAULT 0,
    create_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

DROP TABLE IF EXISTS service_server_tab;
CREATE TABLE service_server_tab
(
    id             BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    service_id     VARCHAR(64)  NOT NULL,
    server_id      VARCHAR(64)  NOT NULL,
    server_url     VARCHAR(128) NOT NULL,
    server_env     VARCHAR(64)  NOT NULL,
    server_type    INT          NOT NULL,
    login_account  VARCHAR(64) NULL,
    login_password VARCHAR(64) NULL,
    login_protocol VARCHAR(64) NULL,
    remark         MEDIUMTEXT NULL,
    is_delete      TINYINT(2) NOT NULL DEFAULT 0,
    create_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP,
    update_at      DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
