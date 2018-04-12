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
	console.log("connected to " + connection.threadId);
	afterConnection();
});

function start() {
	inquirer.prompt(
	{
		name: "productId",
		type: "input",
		message: "What is the ID for the product you would like to purchase?"
	},
	{
		name: "howMany",
		type: "input",
		message: "How many units would you like to purchase?"
	}
	).then(function(answer){
		connection.query(
			// check if there are enough items in stock
			// if there are not, tell the customer that there is an insufficient quantity
			// if there are, reduce the number from the stock available in the database and print the customer's total price of purchase
		);
	});
}

// prints all items (for testing)
function afterConnection() {
	connection.query("SELECT * FROM products", function(error, response){
		if (error) throw error;
		console.log(response);
		connection.end();
	});
}
