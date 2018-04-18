var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

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
    // need to add foreign key column to the products table so I can add the total purchases per department

    connection.query("SELECT * FROM departments", function(error, response){

    // product_sales = from the products table
    // total_profit = over_head_costs - product_sales

        var table = new Table({
            head: ['department_id', 'department_name', 'over_head_costs', 'product_sales', 'total_profit']
          , colWidths: [4, 20, 10, 10, 12]
            });

        response.forEach(function(response){

            // console.log(response);
            var id = response.department_id;
            var name = response.department_name;
            var costs = response.over_head_costs;

            // console.log("Department ID: " + id + "\n" + "Department name: " + name + "\n" + "Department overhead costs: "+ costs);
            // console.log("_________________________")

            table.push(
                [id, name, costs]
            );
        });
        console.log(table.toString());

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