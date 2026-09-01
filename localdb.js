require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const establishConnection = () => {  
    connection.connect((err) => {
        if (err) throw err;
        console.log('Connected to the database!');
    });
};

const query = (sql) => {
    return new Promise((resolve, reject) => {
        connection.query(sql, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

module.exports = { connection, establishConnection, query };