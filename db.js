// Importer le module 'mysql' pour interagir avec la base de données MySQL
const mysql = require('mysql');

// Objet de connexion pour communiquer avec la base de données
const connection = mysql.createConnection({
    host: 'localhost', // Adresse du serveur hébergeant la base de données
    port: 8889, // Port utilisé pour se connecter à la base de données
    user: 'root', // Nom d'utilisateur pour accéder à la base de données
    password: 'root', // Mot de passe pour accéder à la base de données
    database: 'EventOrganizer' // Nom de la base de données à laquelle se connecter
});

// Établir la connexion à la base de données
connection.connect((err) => {
    // Si une erreur survient lors de la connexion, afficher l'erreur et terminer
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    // Si la connexion réussit, afficher un message indiquant que la connexion a été établie
    console.log('Connected to the database');
});

// Exporter l'objet de connexion pour l'utiliser dans d'autres modules
module.exports = connection;
