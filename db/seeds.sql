USE employee_db;

INSERT INTO department (departmentName) 
VALUES 
("Management"),
("Sales"),
("Engineer"),
("Production"),
("Operation"),
("Marketing"),
("Research");

INSERT INTO role (title, salary, departmentId) 
VALUES 

("CEO", 500000.00, 1),
("CFO", 400000.00, 1),
("COO", 350000.00, 1),

("Sales Director", 300000.00, 2),
("Sales Manager", 200000.00, 2),
("Sales Associate", 120000.00, 2),

("Senior Engineer", 350000.00, 3),
("Engineer LV 1", 250000.00, 3),
("Engineer LV 2", 200000.00, 3),
("Engineer LV 3", 150000.00, 3),

("Product Director", 300000.00, 4),
("Product Manager", 200000.00, 4),

("Head of Technology", 300000.00, 5),
("Head of Human Resource", 250000.00, 5),
("Legal Executive", 300000.00, 5),
("Executive Assistant", 150000.00, 5);

INSERT INTO employee (firstName, lastName, roleId, managerId) 
VALUES 

("Abbys", "Batch", 1, NULL),
("Barry", "Charles", 2, NULL),
("Cherry", "Dan", 3, NULL),
("Darren", "Edd", 4, 1),
("Edward", "Fan", 5, 4),
("Frank", "Gii", 6, 5),
("George", "Han", 7, 3),
("Henry", "Isle", 6, 5),
("Irene", "Jan", 6, 5),
("Jack", "Khan", 5, 4),
("Ken", "Luck", 5, 4),
("Larry", "May", 10, 7),
("Mary", "Nan", 8, 7),
("Nancy", "Orc", 9, 7),
("Orange", "Phil", 11, 3),
("Perry", "Sun", 12, 15);