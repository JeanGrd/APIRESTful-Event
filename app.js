// Import controllers
const supplierController = require('./controllers/supplierController');
const categoryController = require('./controllers/categoryController');
const productController = require('./controllers/productController');
const unitController = require('./controllers/unitController');
const transactionController = require('./controllers/transactionController');
const statisticsController = require('./controllers/statisticsController');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');


// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Create Express app
const app = express();

// Use middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Supplier routes
app.get('/suppliers', supplierController.getAllSuppliers);
app.get('/suppliers/:supplierId', supplierController.getSupplierById);
app.get('/suppliers/name/:name', supplierController.getSupplierIdByName);
app.post('/suppliers', supplierController.createSupplier);
app.put('/suppliers/:supplierId', supplierController.updateSupplier);
app.delete('/suppliers/:supplierId', supplierController.deleteSupplier);

// Category routes
app.get('/categories', categoryController.getAllCategories);
app.get('/categories/:categoryId', categoryController.getCategoryById);
app.post('/categories', categoryController.createCategory);
app.put('/categories/:categoryId', categoryController.updateCategory);
app.delete('/categories/:categoryId', categoryController.deleteCategory);

// Product routes
app.get('/products', productController.getAllProducts);
app.get('/products/:productId', productController.getProductById);
app.post('/products', productController.createProduct);
app.put('/products/:productId', productController.updateProduct);
app.delete('/products/:productId', productController.deleteProduct);
app.get('/products/:productId/categoryId', productController.getCategoryIdByProductId);

// Unit routes
app.get('/units', unitController.getAllUnits);
app.get('/units/product/:productId', unitController.getAllUnitsByProduct);
app.get('/units/:unitId', unitController.getUnitById);
app.post('/units', unitController.createUnit);
app.put('/units/:unitId', unitController.updateUnit);
app.delete('/units/:unitId', unitController.deleteUnit);

// Transaction routes
app.get('/transactions', transactionController.getAllTransactions);
app.get('/transactions/:transactionId', transactionController.getTransactionById);
app.post('/transactions', transactionController.createTransaction);
app.put('/transactions/:transactionId', transactionController.updateTransaction);
app.delete('/transactions/:transactionId', transactionController.deleteTransaction);

// User routes
app.get('/users', userController.getAllUsers);
app.get('/users/:userId', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:userId', userController.updateUser);
app.delete('/users/:userId', userController.deleteUser);

// Statistics routes
app.get('/statistics/units-in-stock', statisticsController.getTotalUnitsInStock);
app.get('/statistics/expiring-soon', statisticsController.getProductsExpiringSoon);
app.get('/statistics/supplier-activity', statisticsController.getSupplierActivity);
app.get('/statistics/:productId/quantity', statisticsController.getProductQuantityById);

//app.post('/auth/login', AuthController.login);

// Export the app
module.exports = app;
