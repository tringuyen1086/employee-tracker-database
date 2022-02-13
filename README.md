# Employee-Tracker

## *Description*
A command line application to manage a company's employee database, using Node.js, Inquirer, Console.table and MySQL2.

## Visual
![employer-tracker-ultimate-demo]

## Video

https://user-images.githubusercontent.com/71200950/153753942-f4e26d7a-663d-400e-bb33-a1c8b3d75b4c.mp4



Alternative Link: https://vimeo.com/676775344/7705212e6d

## *Built with*
* [x] Node.js
* [x] Inquirer
* [x] MySQL2
* [x] Console.table

## *Installation*
Clone the Github repo

In the properly cloned folder, run ```npm install``` to install the following dependencies:
* [x] Inquirer:             ```npm i inquirer```
* [x] MySQL2:               ```npm i mysql2```
* [x] Console Table:        ```npm i console.table```
* [x] Install other dependencies if required, using the following
                        ```npm i chalk-rainbow```       ;
                        ```npm i express```             ;
                        ```npm i figlet```              ;
                        ```npm i gradient```            ; 
                        ```npm i gradient-string```     ;
                        ```npm i mysql```               ; 
                        ```npm i sql```                 

* [x] In the connection.js
```
Line 5: user: "your_mySQL_user_name" // update your MySQL user name - default user name is "root"
Line 7: password: "your_pass_here", // update your password and save.
```
* [x] Run ```npm run db``` then enter your password to enter db to update the database.

* [x] Run ```npm run seed``` then enter your password to seed the database.

* [x] All files should be updated and ready to use.

## *Usage*
* [x] Enter ```npm start``` in your command line to begin the queries. 

## Acknowledgement & Contribution
* [x] UC Berkeley Extension Boot Camp - Module 12 SQL

## References:
* [x] [Console Table Package](https://www.npmjs.com/package/console.table)
* [x] [Inquirer Package](https://www.npmjs.com/package/inquirer)
* [x] [Node MySQL 2](https://www.npmjs.com/package/mysql2)

### User Story

> AS A business owner     
> I WANT to be able to view and manage the departments, roles, and employees in my company     
> SO THAT I can organize and plan my business     

### Acceptance Criteria
> GIVEN a command-line application that accepts user input     
> WHEN I start the application     
> THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role     
> WHEN I choose to view all departments     
> THEN I am presented with a formatted table showing department names and department ids     
> WHEN I choose to view all roles     
> THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role     
> WHEN I choose to view all employees     
> THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to     
> WHEN I choose to add a department     
> THEN I am prompted to enter the name of the department and that department is added to the database     
> WHEN I choose to add a role     
> THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database     
> WHEN I choose to add an employee     
> THEN I am prompted to enter the employee’s first name, last name, role, and manager and that employee is added to the database     
> WHEN I choose to update an employee role     
> THEN I am prompted to select an employee to update and their new role and this information is updated in the database      
