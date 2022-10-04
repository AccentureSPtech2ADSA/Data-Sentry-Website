var database = require("../database/config")




async function insertUsuario({
    name,
    email,
    password
}){

    // query vai ser nosso comando sql -> para inserir -> insert into
    
    const query = 
    `INSERT INTO UserHospital (name, email, password) VALUES
    ('${name}', '${email}', aes_encrypt('${password}', 'AES_128'))`;

    return await database.insertUsuario(query);

}


module.exports = {
    insertUsuario
};