const dbConnection = require('../dbConnection/mysqlConnection');

let connection = null;

const getConnection = async () => {
    if (connection === null) {
        connection = await dbConnection();
    }

    return connection;
}

exports.getUsuarioByUsername = async (username) => {
    const connection = await getConnection();
    
    const [rows] = await connection.query('SELECT * FROM usuario WHERE username = ?', [username]);

    if(rows.length === 0){
        return null;
    }

    return rows[0];
}
exports.usuarioRegister = async (fullName, userName, password, imagenId) => {
    const connection = await getConnection();
    const data = [fullName, userName, password, imagenId];
    const sql = 'INSERT INTO usuario (fullName, userName, password, imagenId) VALUES (?, ?, ?, ?)';
    const [rows] = await connection.query(sql, data);

    if (!isNaN(imagenId) && imagenId > 0) {
        await connection.query('UPDATE imagen SET temporal = 0 WHERE imagenId = ?', [imagenId]);
    }

    return rows;
};