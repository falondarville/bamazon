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
            case "Add to Inventory":
                addInventory();
                break;
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

function addInventory() {

    var productsArray = [];

    connection.query("SELECT product_name from products", function(error, response){
        if (error) throw error;

        response.forEach(function(response){
            
            productsArray.push(response.product_name);
            return productsArray;
        })
        inquirer.prompt([
            {
                name: "addInventory",
                type: "list",
                message: "Please select the item that you would like to restock.",
                choices: productsArray  
            },
            {
                name: "addQuantity",
                type: "input",
                message: "How much stock would you like to add? Please do not overburden your warehouse, staff, or general operations. Order in quantities of 1000 or below. "
            }
        ]).then(function(answer){

            if(answer.addQuantity > 1000){
                console.log("You do not have enough storage in your warehouse nor managerial power to order this amount of stock at this time. Please order in more modest quantities.")
            };

            var item = answer.addInventory;
            var amount = answer.addQuantity;

            connection.query("SELECT * from products WHERE product_name = '" + item + "'", function(error, response){

                var currentQuantity = response[0].stock_quantity;
                var currentTotal = parseInt(currentQuantity) + parseInt(amount);

                connection.query("UPDATE products SET stock_quantity = " + currentTotal + " WHERE product_name = '" + item + "'");
                        console.log("You've added " + amount + " " + item + " to your inventory. Now you have " + currentTotal + " " + item + " in stock.");
            });
        })
    });
}

// prints all items (for testing)
function afterConnection() {
    connection.query(function(error){
        if (error) throw error;
        // console.log(response);
        connection.end();
    });
}