const mysql = require("mysql");
const util = require("util");

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node_mysql",
    port:"3306"
})

db.query = util.promisify(db.query).bind(db);

module.exports = db;