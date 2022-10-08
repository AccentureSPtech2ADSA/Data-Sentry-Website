CREATE DATABASE datasentry;
USE datasentry;

CREATE TABLE Hospital(
	_idHospital INT PRIMARY KEY AUTO_INCREMENT,
	cnpj CHAR(14),
	cep CHAR(8),
	numberAddress VARCHAR(10),
    unit VARCHAR(50),
	complement VARCHAR(25),
	fantasyName VARCHAR(50),
	corporateName VARCHAR(50),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);


CREATE TABLE UserHospital(
	_idUserHospital INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100),
	email VARCHAR(100),
	password VARBINARY(150),
	contactPhone CHAR(13),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	fkManager INT,
	FOREIGN KEY (fkManager) REFERENCES UserHospital(_idUserHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Server(
	_serialServer VARCHAR(50) PRIMARY KEY, -- senão pegar serial vamos pegar outro dado único do PC
	isActive CHAR(1),
	description VARCHAR(100),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE Process(
	_idProcess INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(25),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE ComponentType( 
	_idComponentType INT PRIMARY KEY AUTO_INCREMENT,
	description VARCHAR(25), 
	measuramentUnit VARCHAR(5),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE ComponentServer(
	_idComponentServer INT AUTO_INCREMENT,
	serial VARCHAR(50),
	model VARCHAR(25),
	brand VARCHAR(25),
	maxUse DECIMAL(10,2),
	fkServer VARCHAR(50) NOT NULL,
	FOREIGN KEY (fkServer) REFERENCES Server(_serialServer),
	fkComponentType INT NOT NULL,
	FOREIGN KEY (fkComponentType) REFERENCES ComponentType(_idComponentType),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (_idComponentServer, fkComponentType)
);

CREATE TABLE LogComponentPerProcess(
	_idLogComponentPerProcess INT AUTO_INCREMENT,
	usageComponent decimal(10,2),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	fkProcess INT,
	FOREIGN KEY (fkProcess) REFERENCES Process(_idProcess),
	fkComponentType INT,
	fkComponentServer INT,
	FOREIGN KEY (fkComponentServer, fkComponentType)
	REFERENCES ComponentServer(_idComponentServer, fkComponentType),
	PRIMARY KEY (_idLogComponentPerProcess, fkComponentServer, fkComponentType, fkProcess)
);

CREATE PROCEDURE sp_loginUser(
IN emailVar VARCHAR(100),
IN passwordVar VARCHAR(100)
)
	SELECT `_idUserHospital` id ,name, email, contactPhone, 
	fkHospital, cnpj, cep, numberAddress, complement, fantasyName, corporateName
	FROM UserHospital uh JOIN Hospital h
	ON h.`_idHospital` = uh.fkHospital 
	WHERE email = emailVar
	AND password = AES_ENCRYPT(passwordVar, '#Gfgrupo1');
drop procedure sp_loginUser; 
call sp_loginUser('kaike@gmail.com', '12345678'); 

-- _idHospital INT PRIMARY KEY AUTO_INCREMENT,
-- 	cnpj CHAR(14),
-- 	cep CHAR(8),
-- 	numberAddress VARCHAR(10),
--     unit VARCHAR(50),
-- 	complement VARCHAR(25),
-- 	fantasyName VARCHAR(50),
-- 	corporateName VARCHAR(50),

-- 
-- insert into Hospital (cnpj, fantasyName) values ('010111', 'nome');
-- use datasentry;
-- insert into UserHospital (email, password, fkHospital) 
-- values ('delfino@gmail.com', AES_ENCRYPT('123', 'ds'), 1);
-- 
-- SELECT `_idUserHospital` id, name, email FROM UserHospital WHERE
--    email = 'delfino@gmail.com' AND
--    password = AES_ENCRYPT('123', 'ds');
-- 
-- 
-- 
-- CREATE PROCEDURE sp_insereUser(
-- IN nameVar VARCHAR(50),
-- IN emailVar VARCHAR(100),
-- IN passVar VARCHAR(100),
-- IN contactPhoneVar CHAR(13),
-- IN fkHospitalVar INT,
-- IN fkManagerVar INT
-- )
--  
-- 	INSERT INTO UserHospital (name, email, password, contactPhone, fkHospital, fkManager) 
-- 	VALUES (nameVar, emailVar, AES_ENCRYPT(passVar, '#Gfgrupo1'), contactPhoneVar, fkHospitalVar, fkManagerVar);
-- CALL sp_insereUser("nome", "email", 'pass', '11972595523', 1, null);

