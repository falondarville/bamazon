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
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
    ]).then(function(answer){

        var menuOption = answer.menuItem;

        switch (menuOption) {
            case "View Products for Sale":
                sale();
                break;
            case "View Low Inventory":
                inventory();
                break;
            // case: "Add to Inventory";
            //     addInventory();
            //     break;
            // case: "Add New Product";
            //     addProduct();
            //     break;
        };

        // console.log(menuOption);

        });
    //     afterConnection();
    // });
};

start();

function sale() {
    connection.query("SELECT * FROM products", function(error, response){
        if (error) throw error;

        response.forEach(function(response){
            var id = response.item_id;
            var name = response.product_name;
            var department = response.department_name;
            var price = response.price;
            var stock = response.stock_quantity;
            console.log(id + " " + name + " " + department + " " + price + " " + stock);
        })
    })
}

function inventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function(error, response){
        if (error) throw error;

        if(response.length == 0){
            console.log("No low stock.")
        }
    })
}

// function addInventory() {
//     connection.query()
// }

// prints all items (for testing)
function afterConnection() {
    connection.query(function(error){
        if (error) throw error;
        // console.log(response);
        connection.end();
    });
}