const inquirer = require("inquirer");
const consoleTable = require("console.table");
const mysql = require("mysql2");
const validate = require("./utils/validation");
const connection = require("./utils/connection");

const figlet = require("figlet");
const gradient = require("gradient-string");
const redToGreen = gradient("red", "green");
const str = "■".repeat(156);

connection.connect((err) => {
  if (err) throw err;
  console.log(
    redToGreen(str, {
      interpolation: "hsv",
      hsvSpin: "long",
    })
  );
  console.log(figlet.textSync("Welcome to the Employee Tracker"));
  console.log(
    redToGreen(str, {
      interpolation: "hsv",
      hsvSpin: "long",
    })
  );
  employeeTracker();
});

const employeeTracker = () => {
  inquirer
    .prompt([
      {
        name: "choices",
        type: "list",
        message: "Please choose from options below.",
        choices: [
          "View all departments",
          "View all employees roles",
          "View all employees by department",
          "View all employees",
          "View budget by department",
          "Add a new department",
          "Add a new role",
          "Add a new employee",
          "Update employee role",
          "Delete department",
          "Delete role",
          "Delete employee",
          "Exit",
        ],
      },
    ])
    .then((responses) => {
      const {
        choices,
        // View
      } = responses;
      if (choices === "View all departments") {
        viewAllDepartments();
      }
      if (choices === "View all employees roles") {
        viewAllEmployeesRoles();
      }
      if (choices === "View all employees by department") {
        viewAllEmployeesByDepartment();
      }
      if (choices === "View all employees") {
        viewAllEmployees();
      }
      if (choices === "View budget by department") {
        viewBudgetByDepartment();
      }
      // Add
      if (choices === "Add a new department") {
        addDepartment();
      }
      if (choices === "Add a new role") {
        addRole();
      }
      if (choices === "Add a new employee") {
        addEmployee();
      }
      // Update
      if (choices === "Update employee role") {
        updateEmployeeRole();
      }
      // Delete
      if (choices === "Delete department") {
        deleteDepartment();
      }
      if (choices === "Delete role") {
        deleteRole();
      }
      if (choices === "Delete employee") {
        deleteEmployee();
      }
      // Exit application
      if (choices === "Exit") {
        closeApplication();
        connection.end();
      }
    });
};
// VIEW FUNCTION
// View all departments
const viewAllDepartments = () => {
  const sqlQ = `SELECT department.id as 'Department ID', department.departmentName AS 'Department Name' FROM department`;
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    console.log("All Departments:");
    console.log(
      redToGreen(str, {
        interpolation: "hsv",
        hsvSpin: "long",
      })
    );
    console.table(res);
    employeeTracker();
  });
};

// View all employees roles
const viewAllEmployeesRoles = () => {
  const sqlQ = `SELECT role.id, role.title AS 'Job Title',
              role.salary AS 'Salary',
              department.departmentName AS 'Department'
              FROM role INNER JOIN department on role.departmentId=department.id;`;
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    console.log("All Employees Roles:");
    console.log(
      redToGreen(str, {
        interpolation: "hsv",
        hsvSpin: "long",
      })
    );
    console.table(res);
    employeeTracker();
  });
};

// View all employees by department
const viewAllEmployeesByDepartment = () => {
  const sqlQ = `SELECT employee.id, 
                CONCAT (employee.firstName, " ", employee.lastName) AS 'Employee Name', 
                department.departmentName AS 'Department' 
                FROM employee LEFT JOIN role ON employee.roleId = role.id 
                LEFT JOIN department ON role.departmentId = department.id 
                ORDER BY departmentName`;
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    console.log("All employees by department:");
    console.log(
      redToGreen(str, {
        interpolation: "hsv",
        hsvSpin: "long",
      })
    );
    console.table(res);
    employeeTracker();
  });
};

// View Employees
const viewAllEmployees = () => {
  const sqlQ = `SELECT employee.id, 
              CONCAT (employee.firstName, " ", employee.lastName) AS 'Employee Name',
              role.title AS 'Job Title', 
              department.departmentName AS 'Department', 
              role.salary AS 'Salary', 
              CONCAT(manager.firstName, " " , manager.lastName) AS 'Manager' 
              FROM employee LEFT JOIN role ON employee.roleId=role.id 
              LEFT JOIN department ON role.departmentId= department.id 
              LEFT JOIN employee manager on manager.id = employee.managerId;`;
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    console.log(``);
    console.log(
      redToGreen(str, {
        interpolation: "hsv",
        hsvSpin: "long",
      })
    );
    console.log("All Employees:");
    console.log(``);
    console.table(res);
    employeeTracker();
  });
};

// View budget by department
const viewBudgetByDepartment = () => {
  const sqlQ = `SELECT departmentId AS 'Department ID', 
                department.departmentName AS 'Department',
                SUM(salary) AS 'Budget' 
                FROM role INNER JOIN department 
                ON role.departmentId = department.id 
                GROUP BY role.departmentId`;
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    console.log(
      redToGreen(str, {
        interpolation: "hsv",
        hsvSpin: "long",
      })
    );
    console.table(res);
    employeeTracker();
  });
};

// ADD FUNCTION
// Add new department
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "addDepartment",
        message: "What is the name of the new department?",
      },
    ])
    .then((answer) => {
      let sqlQ = `INSERT INTO department(departmentName)VALUES (?)`;
      connection.query(sqlQ, answer.addDepartment, (error, response) => {
        if (error) throw error;
        console.log(
          redToGreen(str, {
            interpolation: "hsv",
            hsvSpin: "long",
          })
        );
        console.log("The new department has been created successfully.");
        viewAllDepartments();
      });
    });
};

// Add a new role
const addRole = () => {
  const sqlQ = "SELECT * FROM department";
  connection.query(sqlQ, (err, res) => {
    if (err) throw err;
    let departmentArray = [];
    res.forEach((department) => {
      departmentArray.push(department.departmentName);
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "departmentName",
          message: "What is the department of the new role?",
          choices: departmentArray,
        },
      ])
      .then((answer) => {
        if (answer.departmentName === "Add Department") {
          this.addDepartment();
        } else {
          addRoleData(answer);
        }
      });
    const addRoleData = (roleData) => {
      inquirer
        .prompt([
          {
            type: "input",
            name: "newRole",
            message: "What is the name of the new role?",
          },
          {
            type: "input",
            name: "salary",
            message: "What is the salary of the new role?",
          },
        ])
        .then((answer) => {
          let newRole = answer.newRole;
          let departmentNameMatch;
          res.forEach((department) => {
            if (roleData.departmentName === department.departmentName) {
              departmentNameMatch = department.id;
            }
          });
          let sqlQ = `INSERT INTO role (title, salary, departmentId) VALUES (?, ?, ?)`;
          let criteria = [newRole, answer.salary, departmentNameMatch];
          connection.query(sqlQ, criteria, (err) => {
            if (err) throw err;
            console.log(
              redToGreen(str, {
                interpolation: "hsv",
                hsvSpin: "long",
              })
            );
            console.log("The new role has been created successfully");
            viewAllEmployeesRoles();
          });
        });
    };
  });
};

// Add a new employee
const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "firstName",
        message: "What is the first name of the new employee?",
        validate: (inputFirst) => {
          if (inputFirst) {
            return true;
          } else {
            console.log("Please enter the first name of the new employee.");
            return false;
          }
        },
      },
      {
        type: "input",
        name: "lastName",
        message: "What is the last name of the new employee?",
        validate: (inputLast) => {
          if (inputLast) {
            return true;
          } else {
            console.log("Please enter the last name of the new employee.");
            return false;
          }
        },
      },
    ])
    .then((answer) => {
      const criteria = [answer.firstName, answer.lastName];
      const sqlQ2 = `SELECT role.id, role.title FROM role`;
      connection.query(sqlQ2, (err, data) => {
        if (err) throw err;
        const roles = data.map(({ id, title }) => ({
          name: title,
          value: id,
        }));
        inquirer
          .prompt([
            {
              type: "list",
              name: "role",
              message: "What is the role of the new employee?",
              choices: roles,
            },
          ])
          .then((selectRole) => {
            const role = selectRole.role;
            criteria.push(role);
            const sqlQ3 = `SELECT * FROM employee`;
            connection.query(sqlQ3, (err, data) => {
              if (err) throw err;
              const managers = data.map(({ id, firstName, lastName }) => ({
                name: firstName + " " + lastName,
                value: id,
              }));
              inquirer
                .prompt([
                  {
                    type: "list",
                    name: "manager",
                    message: "Who is the manager of the new employee?",
                    choices: managers,
                  },
                ])
                .then((selectManager) => {
                  const manager = selectManager.manager;
                  criteria.push(manager);
                  const sqlQ4 = `INSERT INTO employee (firstName, lastName, roleId, managerId) VALUES (?, ?, ?, ?)`;
                  connection.query(sqlQ4, criteria, (err) => {
                    if (err) throw err;
                    console.log(
                      redToGreen(str, {
                        interpolation: "hsv",
                        hsvSpin: "long",
                      })
                    );
                    console.log(
                      "The new employee has been created successfully."
                    );
                    viewAllEmployees();
                  });
                });
            });
          });
      });
    });
};

// UPDATE FUNCTION
// Update employee role
const updateEmployeeRole = () => {
  const employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, firstName, lastName }) => ({
      name: firstName + " " + lastName,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "What is the name of employee to update the role?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const params = [];
        params.push(employee);
        const roleSql = `SELECT * FROM role`;
        connection.query(roleSql, (err, data) => {
          if (err) throw err;
          const roles = data.map(({ id, title }) => ({
            name: title,
            value: id,
          }));
          inquirer
            .prompt([
              {
                type: "list",
                name: "role",
                message: "What is the employee's new role?",
                choices: roles,
              },
            ])
            .then((roleChoice) => {
              const role = roleChoice.role;
              params.push(role);
              let employee = params[0];
              params[0] = role;
              params[1] = employee;
              const sql = `UPDATE employee SET roleId = ? WHERE id = ?`;
              connection.query(sql, params, (err, result) => {
                if (err) throw err;
                console.log(
                  "The employee's role has been updated successfully."
                );
                viewAllEmployees();
              });
            });
        });
      });
  });
};

// DELETE FUNCTION
// Delete a department
const deleteDepartment = () => {
  const departmentSql = `SELECT * FROM department`;
  connection.query(departmentSql, (err, data) => {
    if (err) throw err;
    const dept = data.map(({ name, id }) => ({ name: name, value: id }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "dept",
          message: "What department do you want to delete?",
          choices: dept,
        },
      ])
      .then((deptChoice) => {
        const dept = deptChoice.dept;
        const sql = `DELETE FROM department WHERE id = ?`;
        connection.query(sql, dept, (err, result) => {
          if (err) throw err;
          console.log("The selected Department has been deleted successfully");
          viewAllDepartments();
        });
      });
  });
};

// Delete a role
const deleteRole = () => {
  const roleSql = `SELECT * FROM role`;
  connection.query(roleSql, (err, data) => {
    if (err) throw err;
    const role = data.map(({ title, id }) => ({ name: title, value: id }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "role",
          message: "What is the role to be deleted?",
          choices: role,
        },
      ])
      .then((roleChoice) => {
        const role = roleChoice.role;
        const sql = `DELETE FROM role WHERE id = ?`;
        connection.query(sql, role, (err, result) => {
          if (err) throw err;
          console.log("The selected role has been deleted successfully.");
          viewAllEmployeesRoles();
        });
      });
  });
};

// Delete an employeed
const deleteEmployee = () => {
  const employeeSql = `SELECT * FROM employee`;
  connection.query(employeeSql, (err, data) => {
    if (err) throw err;
    const employees = data.map(({ id, firstName, lastName }) => ({
      name: firstName + " " + lastName,
      value: id,
    }));
    inquirer
      .prompt([
        {
          type: "list",
          name: "name",
          message: "What is the employee to be deleted?",
          choices: employees,
        },
      ])
      .then((empChoice) => {
        const employee = empChoice.name;
        const sql = `DELETE FROM employee WHERE id = ?`;
        connection.query(sql, employee, (err, result) => {
          if (err) throw err;
          console.log("The selected employee has been deleted successfully.");
          viewAllEmployees();
        });
      });
  });
};

// END APPLICATION
function closeApplication() {
  console.log(
    redToGreen(str, {
      interpolation: "hsv",
      hsvSpin: "long",
    })
  );
  console.log(figlet.textSync("Thank you!!!"));
  console.log(
    redToGreen(str, {
      interpolation: "hsv",
      hsvSpin: "long",
    })
  );
  console.log("Your session has been ended successfully.");
}
