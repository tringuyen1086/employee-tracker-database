const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "your_mySQL_user_name", // update your MySQL user name - default user name is "root"
  port: 3306,
  password: "your_pass_here", // update your MySQL password
  database: "employee_db",
});
module.exports = connection;
