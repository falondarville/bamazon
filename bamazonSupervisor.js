var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // no port set = default port 3306

    user: "root",

    password: "",
    database: "bamazon"
});

// test connection
connection.connect(function(error){
    if (error) throw error;
    // console.log("connected to " + connection.threadId);
});

function start() {

    inquirer.prompt([
    {
        name: "menuItem",
        type: "list",
        message: "Please select what you would like to do.",
        choices: ["View Product Sales By Department", "Create New Department"]
    }
    ]).then(function(answer){

        var menuOption = answer.menuItem;

        switch (menuOption) {
            case "View Product Sales By Department":
                sales();
                break;
            case "Create New Department":
                create();
                break;
        }

        });
};

start();

function sales() {
    // the app should display a summarized table in their terminal/bash window.
    // npm package to style the results of this function

    connection.query("SELECT * FROM departments", function(error, response){

    // product_sales = from the products table
    // total_profit = over_head_costs - product_sales

        response.forEach(function(response){

            // console.log(response);
            var id = response.department_id;
            var name = response.department_name;
            var costs = response.over_head_costs;

            console.log("Department ID: " + id + "\n" + "Department name: " + name + "\n" + "Department overhead costs: "+ costs);
            console.log("_________________________")
        });
    connection.end();
    })
}

function create() {

    inquirer.prompt([
        {
            name: "newDepartmentName",
            type: "input",
            message: "Please enter the name of your new department."
        },
        {
            name: "newOverheadCosts",
            type: "input",
            message: "Please enter the overhead costs for this department."
        }
    ]).then(function(answer){

        var department =  answer.newDepartmentName;
        var costs = answer.newOverheadCosts;

        connection.query("INSERT INTO departments(department_name, over_head_costs) VALUES ('" + department + "'," + costs + ")", function(error, response){
            if (error) throw error;

            console.log("You've added the department named " + department + " to your records, with the overhead costs of" + costs);
        })
    connection.end();
    });
}