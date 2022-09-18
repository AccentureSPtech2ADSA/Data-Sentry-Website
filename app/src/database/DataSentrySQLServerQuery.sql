-- DROP DATABASE dataSentry;
CREATE DATABASE dataSentry;
USE dataSentry;

CREATE TABLE Hospital (
idHospital INT PRIMARY KEY identity(1,1),
cnpj CHAR(14),
cep CHAR(8),
numberAdress varchar(6),
unit VARCHAR(10),
fantasyName VARCHAR(45),
corporateName VARCHAR(45),
complement VARCHAR(45),
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updateAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE UserHospital (
idUser INT PRIMARY KEY identity(1,1),
name VARCHAR(45),
email VARCHAR(45),
password VARCHAR(150), -- isso aqui precisar dps estar com encriptacao md5 ou EAS
fkHospital INT,
FOREIGN KEY (fkHospital) REFERENCES Hospital(idHospital),
idManager INT,
FOREIGN KEY (idManager) REFERENCES UserHospital(idUser),
-- recursiva ou seja, quando o hospital criar um user analista novo, este vai herdar o ID do user hospital 
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
updateAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

