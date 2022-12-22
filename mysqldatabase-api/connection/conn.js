const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "abc12345",
    database: "titanic",
  });

db.connect((err) => {
    if(err) return console.log('Error ' + err.message)

    console.log('Connected to Database')
})

module.exports = db