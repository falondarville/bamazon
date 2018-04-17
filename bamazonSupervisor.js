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
    //     afterConnection();
    // });
};

start();

function sales() {
    
}

// prints all items (for testing)
function afterConnection() {
    connection.query(function(error){
        if (error) throw error;
        // console.log(response);
        connection.end();
    });
}