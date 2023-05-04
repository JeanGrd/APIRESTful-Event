const Sequelize = require('sequelize');

const sequelize = new Sequelize('OK', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql', // ou 'mysql', 'mssql', 'sqlite', etc.
    port: 8889, // Remplacez 8889 par le numéro de port réel utilisé par MySQL dans MAMP
    logging: false,
});

module.exports = sequelize;
