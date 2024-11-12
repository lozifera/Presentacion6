const mysql = require('mysql2/promise');

const dbConnection = async () => {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.MYSQL_USER || 'root',
            password: process.env.MYSQL_PASSWORD || '',
            database: process.env.MYSQL_DATABASE || 'agenda_db',
            port: process.env.DB_PORT || 3306
        });
        console.log('Database connected');
        return connection;
}

module.exports = dbConnection;