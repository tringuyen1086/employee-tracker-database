DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;


CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  departmentName VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  departmentId INTEGER NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (departmentId) REFERENCES department(id)
 
);

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  firstName VARCHAR(30) NOT NULL,
  lastName VARCHAR(30) NOT NULL,
  roleId INTEGER NOT NULL,
  managerId INTEGER,
  PRIMARY KEY (id),
  FOREIGN KEY (roleId) REFERENCES role(id)
);
