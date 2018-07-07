//console.log(process.env.MYSQL);//este MySQL es el definido en el archivo json, no se porque funciona poniendolo on la y minuscula si esta definido con todas en mayuscula.

const {host,user,password,database} = process.env.MYSQL;
//console.log(host,user,password,database);

const MYSQL = require('mysql2');
const CONN = MYSQL.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sakila'
});

module.exports = CONN;