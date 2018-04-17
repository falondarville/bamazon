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
        name: "productId",
        type: "input",
        message: "What is the ID for the product you would like to purchase? Enter a number 1 through 10."
    },
    {
        name: "howMany",
        type: "input",
        message: "How many units would you like to purchase?"
    }
    ]).then(function(answer){

        var itemId = parseInt(answer.productId);


        connection.query("SELECT item_id FROM products WHERE item_id =" + itemId, function(error, response){
            // check if itemId exists
            if (response.length == 0) {
                console.log("This item ID does not exist.");
                return;
            }
                    // gather the responses in variables
            var quantity = answer.howMany;
            console.log("You want to purchase an item with the product ID " + itemId + " in the quantity of " + quantity + ".");

            var query = "SELECT * FROM products WHERE item_id = " + itemId;

        connection.query(query, function(error, response){
            // check if there are enough items in stock
            // if the product quantity for the product is less than the quantity in database, then deduct that number from the database
            // if there are not, tell the customer that there is an insufficient quantity
            // if there are, reduce the number from the stock available in the database and print the customer's total price of purchase

            var stockQuantity = response[0].stock_quantity;
            var item = response[0].product_name;
            var price = response[0].price;
            var totalSales = response[0].product_sales;
           
            // console.log(item);

            if(stockQuantity > quantity) {
                var newQuantity = stockQuantity - quantity;
                var decrease = "UPDATE products SET stock_quantity =" + newQuantity + " WHERE item_id = " + itemId;

                connection.query(decrease, function(error, response){
                    // console.log("This is the decrease connnection query: ")
                    // console.log(response);
                    // console.log(error);
                    var total = (price * quantity).toFixed(2);
                    console.log("Great! You have purchased " + quantity + " " + item + ". The cost per unit of this item is " + price + ". Your total for this order of " + item + " is " + total + ".");

                    var productSales = parseFloat(totalSales) + parseFloat(total);

                    connection.query("UPDATE products SET product_sales = " + productSales + " WHERE item_id = " + itemId);

                    connection.end();
                });
                // console.log("Stock quantity: " + stockQuantity);
                // console.log("Quantity entered: " + quantity);
                // console.log(newQuantity);
                // minus the quantity amount in the database and print total of purchase to the customer
                
            } else {
                console.log("There are insufficient amounts of the product to cover your order.");
                connection.end();
            }

        });
        })
    });
};

start();
