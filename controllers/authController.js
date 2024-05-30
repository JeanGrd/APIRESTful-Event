// AuthController.js (nouveau fichier dans votre dossier controllers)
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // Assurez-vous d'installer ce paquet avec npm install jsonwebtoken
const User = require('../models/User'); // Modèle User, adapté à votre structure

const JWT_SECRET = 'votre_secret_ici'; // Utilisez une chaîne complexe ici

exports.login = (req, res) => {
    const { email, password } = req.body;
    User.findByEmail(email, (err, user) => {
        if (err) {
            res.status(500).json({ message: 'Erreur serveur' });
        } else if (!user) {
            res.status(401).json({ message: 'Utilisateur non trouvé' });
        } else {
            bcrypt.compare(password, user.password, (err, isMatch) => {
                if (err) {
                    res.status(500).json({ message: 'Erreur de comparaison de mot de passe' });
                } else if (isMatch) {
                    const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                    res.json({ token });
                } else {
                    res.status(401).json({ message: 'Mot de passe incorrect' });
                }
            });
        }
    });
};


