var database = require("../database/config")




async function insertUsuario({
    name,
    email,
    password
}){

    // query vai ser nosso comando sql -> para inserir -> insert into
    
    const query = 
    `INSERT INTO UserHospital (name, email, password) VALUES
    ('${name}', '${email}', '${password}')`;

    return await database.insertUsuario(query);

}


module.exports = {
    insertUsuario
};