CREATE TABLE users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    name VARCHAR(150) NOT NULL,
    cpf CHAR(11) NOT NULL,
    cellphone VARCHAR(20) NOT NULL,
    `type` ENUM('VOLUNTEER', 'NORMAL', 'ADMIN') NOT NULL,
    location POINT NOT NULL SRID 4326,
    active TINYINT(1) NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    UNIQUE KEY uk_users_cpf (cpf),
    INDEX idx_users_type (`type`),
    INDEX idx_users_active (active),
    SPATIAL INDEX idx_users_location (location)
);

CREATE TABLE events (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    type ENUM('CLIMATE_DISASTER', 'FLOOD', 'THUNDERSTORM') NOT NULL,
    description VARCHAR(255) NOT NULL,
    location POINT NOT NULL SRID 4326,
    impact_radius DECIMAL(6,2) NOT NULL,
    status ENUM('ACTIVE', 'PENDING', 'CLOSED') NOT NULL DEFAULT 'PENDING',
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_disaster_events_status (status),
    INDEX idx_disaster_events_type (type),
    SPATIAL INDEX idx_disaster_events_location (location)
);

CREATE TABLE help_groups (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    event_id BIGINT UNSIGNED NOT NULL,
    leader_user_id BIGINT UNSIGNED NULL,
    meeting_point_name VARCHAR(150) NULL,
    meeting_lat DECIMAL(10,7) NOT NULL,
    meeting_lng DECIMAL(10,7) NOT NULL,
    status ENUM('FORMING', 'ACTIVE', 'FINISHED') NOT NULL DEFAULT 'FORMING',
    max_members INT NOT NULL DEFAULT 5,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    INDEX idx_help_groups_event (event_id),
    INDEX idx_help_groups_leader (leader_user_id),
    INDEX idx_help_groups_status (status)
);

CREATE TABLE help_group_members (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    group_id BIGINT UNSIGNED NOT NULL,
    user_id BIGINT UNSIGNED NOT NULL,
    role ENUM('LEADER', 'MEMBER') NOT NULL DEFAULT 'MEMBER',
    PRIMARY KEY (id),
    INDEX idx_help_group_members_user (user_id),
    INDEX idx_help_group_members_role (role)
);