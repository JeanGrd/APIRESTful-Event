const User = require('../models/User');

exports.createUser = (req, res) => {
    const newUser = req.body;
    User.create(newUser, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error creating user", error: err });
        } else {
            res.status(201).send({ message: "User created successfully", userId: result.userId });
        }
    });
};

exports.getAllUsers = (req, res) => {
    User.getAll((err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving users", error: err });
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getUserById = (req, res) => {
    const userId = req.params.userId;
    User.getById(userId, (err, results) => {
        if (err) {
            res.status(500).send({ message: "Error retrieving user", error: err });
        } else if (results.length === 0) {
            res.status(404).send({ message: "User not found" });
        } else {
            res.status(200).json(results[0]);
        }
    });
};

exports.updateUser = (req, res) => {
    const userId = req.params.userId;
    const updatedUser = req.body;
    User.update(userId, updatedUser, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error updating user", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "User not found" });
        } else {
            res.status(200).send({ message: "User updated successfully" });
        }
    });
};

exports.deleteUser = (req, res) => {
    const userId = req.params.userId;
    User.delete(userId, (err, result) => {
        if (err) {
            res.status(500).send({ message: "Error deleting user", error: err });
        } else if (result.affectedRows === 0) {
            res.status(404).send({ message: "User not found" });
        } else {
            res.status(200).send({ message: "User deleted successfully" });
        }
    });
};
