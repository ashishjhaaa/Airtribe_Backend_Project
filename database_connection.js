var prop = require('./database_properties');
var mysql = require('mysql2');

module.exports = {
    getConnection: () => {
        return mysql.createConnection(prop);
    }
}