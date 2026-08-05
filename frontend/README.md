




CREATE TABLE subscriptions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(200) UNIQUE NOT NULL,
    cost NUMERIC(10,2) NOT NULL,
    category VARCHAR(200) NOT NULL
);
CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

new design:


CREATE TABLE Subscriptions (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(200) NOT NULL,
    plan VARCHAR(200),				-- busniess, pro, etc
    cost NUMERIC(10,2) NOT NULL,
    
	start_date DATE NOT NULL,
    end_date DATE NOT NULL,
	billing_cycle VARCHAR(20),		-- monthly, yearly, weekly
	
    status VARCHAR(20) NOT NULL,    -- Active / Cancelled
	category VARCHAR(100) NOT NULL
);

CREATE TABLE Users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL
);

