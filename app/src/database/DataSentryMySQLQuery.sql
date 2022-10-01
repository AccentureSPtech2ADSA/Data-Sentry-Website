CREATE DATABASE datasentry;
USE datasentry;
 
CREATE TABLE Hospital(
	_idHospital INT PRIMARY KEY AUTO_INCREMENT,
	cnpj CHAR(14),
	cep CHAR(8),
	numberAddress VARCHAR(5),
    unit VARCHAR(50),
	complement VARCHAR(25),
	fantasyName VARCHAR(50),
	corporateName VARCHAR(50),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE contactPhoneHospital(
	_idContactPhoneHospital INT AUTO_INCREMENT,
	contactPhone CHAR(13),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(_idContactPhoneHospital, fkHospital)
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
	_serialServer VARCHAR(30) PRIMARY KEY, -- senão pegar serial vamos pegar outro dado único do PC
	isActive CHAR(1),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE UserHasServer(
	_idUserHasServer INT AUTO_INCREMENT,
	isActive CHAR(1),
	fkServer VARCHAR(30) NOT NULL,
	FOREIGN KEY (fkServer) REFERENCES Server(_serialServer),
	fkUserHospital INT NOT NULL,
	FOREIGN KEY (fkUserHospital) REFERENCES UserHospital(_idUserHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (_idUserHasServer, fkServer, fkUserHospital)
);

CREATE TABLE Process(
	_idProcess INT PRIMARY KEY AUTO_INCREMENT, -- talvez vire o PID
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
	serial VARCHAR(30),
	model VARCHAR(25),
	yearManufatured CHAR(4),
	brand VARCHAR(25),
	fkServer VARCHAR(30) NOT NULL,
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
