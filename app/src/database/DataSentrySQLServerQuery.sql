CREATE DATABASE datasentry;
USE datasentry;
SELECT TOP 1 _idHospital id FROM Hospital ORDER BY id DESC;
SELECT IDENT_CURRENT('Hospital')
SELECT SCOPE_IDENTITY();
CREATE TABLE Hospital(
	_idHospital INT PRIMARY KEY IDENTITY(1,1),
	cnpj CHAR(14),
	cep CHAR(8),
	numberAddress VARCHAR(5),
	complement VARCHAR(25),
	fantasyName VARCHAR(50),
	unit VARCHAR(25),
	corporateName VARCHAR(50),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);
alter table Hospital alter column numberAddress VARCHAR(5);
alter table Hospital add unit varchar(25);
CREATE TABLE contactPhoneHospital(
	_idContactPhoneHospital INT IDENTITY(1,1),
	contactPhone CHAR(13),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY(_idContactPhoneHospital, fkHospital)
);

CREATE TABLE UserHospital(
	_idUserHospital INT PRIMARY KEY IDENTITY(1,1),
	name VARCHAR(100),
	email VARBINARY(100),
	password VARCHAR(100),
	contactPhone CHAR(13),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	fkManager INT,
	FOREIGN KEY (fkManager) REFERENCES UserHospital(_idUserHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);
select * from UserHospital uh ;
CREATE TABLE Server(
	_serialServer VARCHAR(30) PRIMARY KEY, -- senão pegar serial vamos pegar outro dado único do PC
	isActive CHAR(1),
	fkHospital INT NOT NULL,
	FOREIGN KEY (fkHospital) REFERENCES Hospital(_idHospital),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE UserHasServer(
	_idUserHasServer INT IDENTITY(1,1),
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
	_idProcess INT PRIMARY KEY IDENTITY(1,1), -- talvez vire o PID
	name VARCHAR(25),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE ComponentType( 
	_idComponentType INT PRIMARY KEY IDENTITY(1,1),
	description VARCHAR(25), 
	measuramentUnit VARCHAR(5),
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP 
);

CREATE TABLE ComponentServer(
	_idComponentServer INT IDENTITY(1,1),
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
	_idLogComponentPerProcess INT IDENTITY(1,1),
	usageComponent decimal(10,2),
	total decimal(10,2),
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

CREATE SYMMETRIC KEY cryptAesSqlServer
WITH ALGORITHM = AES_128
ENCRYPTION BY PASSWORD = '#Gfgrupo1';

CREATE PROCEDURE sp_insereUser 
@name VARCHAR(MAX),
@email VARCHAR(MAX),
@password VARCHAR(MAX),
@contactPhone CHAR(13),
@fkManager INT,
@fkHospital INT
AS
BEGIN
	SET NOCOUNT ON;
	OPEN SYMMETRIC KEY cryptAesSqlServer decryption BY password = '#Gfgrupo1'
	INSERT INTO UserHospital(name, email, password, contactPhone, fkManager, fkHospital) 
	VALUES (
	@name,
	@email,
	ENCRYPTBYKEY(Key_GUID('cryptAesSqlServer'), CONVERT (VARBINARY(MAX), @password)),
	@contactPhone,
	@fkManager,
	@fkHospital
	)
	CLOSE SYMMETRIC key cryptAesSqlServer
END;
CREATE PROCEDURE sp_loginUser
@email VARCHAR(MAX),
@password VARCHAR(MAX)
AS
BEGIN
	SET NOCOUNT ON;
	OPEN SYMMETRIC KEY cryptAesSqlServer decryption BY password = '#Gfgrupo1'
	SELECT * FROM UserHospital 
	WHERE email = @email AND 
	@password = CONVERT (VARCHAR(MAX), DECRYPTBYKEY(password))
	CLOSE SYMMETRIC key cryptAesSqlServer
END;

-- EXEC sp_insereUser 'delfino', 'delfino@gmail.com', '12345', '11972595523', null, 1;
-- EXEC sp_loginUser 'delfino@gmail.com', '12345';
-- select * from UserHospital uh;



