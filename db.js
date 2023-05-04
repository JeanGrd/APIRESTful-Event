const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 8889, // Remplacez 8889 par le numéro de port réel utilisé par MySQL dans MAMP
    user: 'root',
    password: 'root',
    database: 'EventOrganizer'
});

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to the database');
});

module.exports = connection;
