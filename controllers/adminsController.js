const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');

exports.login = (req, res) => {
    const { username, password } = req.body;
    Admin.getByUsername(username, (err, admin) => {
        if (err) return res.status(500).json({ error: 'Error fetching admin' });
        if (!admin || admin.length === 0) return res.status(200).json({ error: 'Invalid account' });
        if (!Admin.checkPassword(password, admin[0].password)) {
            return res.status(200).json({ error: 'Invalid account' });
        }
        const token = jwt.sign({ id: admin[0].id }, 'qsdmlfeakle-qdflkear-qdsf4874-azoeytdcs', { expiresIn: '1h' });

        res.json({ message: 'Logged in', token: token });
    });
};


exports.register = (req, res) => {
    const { username, password } = req.body;
    Admin.create(username, password, (err, result) => {
        if (err) return res.status(500).json({ error: 'Error creating admin' });
        res.json({ message: 'Admin created', result });
    });
};

