DROP DATABASE dataSentry;
CREATE DATABASE dataSentry;
USE dataSentry;

CREATE TABLE Hospital (
idHospital INT PRIMARY KEY AUTO_INCREMENT,
cnpj CHAR(14),
cep CHAR(8),
numberAdress SMALLINT,
unit VARCHAR(10),
createdAt DATETIME,
updateAt DATETIME,
fantasyName VARCHAR(45),
corporateName VARCHAR(45),
complement VARCHAR(45)
);

CREATE TABLE Usuario (
idUser INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(150),
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
fkHospital INT,
FOREIGN KEY (fkHospital) REFERENCES Hospital(idHospital),
idManager INT,
FOREIGN KEY (idManager) REFERENCES Usuario(idUser),
updateAt DATETIME
);

SELECT * FROM Hospital;
SELECT * FROM Usuario;

/*
INSERT INTO Usuario(nome, email, senha, fkHospital) values("teste", "123123123@gmail.com", "123123123");

SELECT idHospital FROM Hospital ORDER BY idHospital DESC LIMIT 1; 

TRUNCATE TABLE Hospital;
TRUNCATE TABLE Usuario;
*/