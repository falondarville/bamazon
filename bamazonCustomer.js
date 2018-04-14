var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    // homebrew is running my server, no port set = default port 3306

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
        name: "productId",
        type: "input",
        message: "What is the ID for the product you would like to purchase?"
        // account for IDs that are not in the database
    },
    {
        name: "howMany",
        type: "input",
        message: "How many units would you like to purchase?"
    }
    ]).then(function(answer){

        // gather the responses in variables
        var itemId = parseInt(answer.productId);
        var quantity = answer.howMany;
        console.log("You want to purchase an item with the product ID " + itemId + " in the quantity of " + quantity + ".");

        var query = "SELECT stock_quantity FROM products WHERE item_id = " + itemId;

        connection.query(query, function(error, response){
            // check if there are enough items in stock
            // if the product quantity for the product is less than the quantity in database, then deduct that number from the database
            // if there are not, tell the customer that there is an insufficient quantity
            // if there are, reduce the number from the stock available in the database and print the customer's total price of purchase

            var stockQuantity = response[0].stock_quantity;

            if(stockQuantity > quantity) {
                var newQuantity = stockQuantity - quantity;
                var decrease = "UPDATE stock_quantity =" + newQuantity + " WHERE items = " + itemId;
                console.log("Stock quantity: " + stockQuantity);
                console.log("Quantity entered: " + quantity);
                console.log(newQuantity);
                // minus the quantity amount in the database and print total of purchase to the customer
                console.log("Great! You have purchased " + quantity);
            } else {
                console.log("There are insufficient amounts of the product to cover your order.");
            }

        });
        afterConnection();
    });
};

start();

// prints all items (for testing)
function afterConnection() {
    connection.query("SELECT * FROM products", function(error, response){
        if (error) throw error;
        // console.log(response);
        connection.end();
    });
}
