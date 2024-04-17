const db = require('../db');

class Statistics {

    // Récupérer le nombre total d'unités en stock pour chaque produit
    static getTotalUnitsInStock(callback) {
        const query = 'SELECT p.NAME, COUNT(u.UNIT_ID) AS TOTAL_UNITS FROM PRODUCTS p JOIN UNITS u ON p.PRODUCT_ID = u.PRODUCT_ID GROUP BY p.NAME';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer les produits dont la date de péremption approche
    static getProductsExpiringSoon(callback) {
        const query = 'SELECT p.NAME, u.EXPIRATION_DATE, COUNT(u.UNIT_ID) AS TOTAL_UNITS FROM UNITS u JOIN PRODUCTS p ON u.PRODUCT_ID = p.PRODUCT_ID WHERE u.EXPIRATION_DATE <= DATE_ADD(CURDATE(), INTERVAL 30 DAY) GROUP BY p.NAME, u.EXPIRATION_DATE ORDER BY u.EXPIRATION_DATE ASC';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

    // Récupérer l'activité des fournisseurs (nombre d'unités fournies par fournisseur)
    static getSupplierActivity(callback) {
        const query = 'SELECT s.NAME, COUNT(u.UNIT_ID) AS TOTAL_UNITS_SUPPLIED FROM SUPPLIERS s JOIN UNITS u ON s.SUPPLIER_ID = u.SUPPLIER_ID GROUP BY s.NAME';
        db.query(query, (err, results) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, results);
            }
        });
    }

}

module.exports = Statistics;
