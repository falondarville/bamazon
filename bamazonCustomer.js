var mysql = require("mysql");

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

// prints all items (for testing)
function afterConnection() {
	connection.query("SELECT * FROM products", function(error, response){
		if (error) throw error;
		console.log(response);
		connection.end();
	});
}
