## Command line shop

This is a command line shop that communicates with a MySQL database. 

The following is a snapshot of the small table from the database that I created:

![alt-text](bamazon.png)

### Store Customer Usage

The following is a view of the customer view of the application. Here, we see the customer choosing the ID of the item he or she would like to purchase. Next, he or she is prompted to provide the quantity of that item that they would like to purchase. Presented below are three outcomes:

1. The customer chose an item ID that existed in the database. In this case, you will see that the prompt encourages the customer to choose a number from 1 through 10 (although the table has since expanded to include more IDs). Given that the quantity that the customer wanted was not exceeding the stock quantity in the database, the transaction went through and the total price for his or her purchase is listed.

2. In this second scenario, the customer chose the item ID for a product that did not live in the table at the time. She was notified that the product did not exist. 

3. In this final case, the customer requested a quantity for an existing product that there was not sufficient stock of to fulfill the order. 

![alt-text](bamazon.gif)

### Store Manager Usage



### Technologies Used

JavaScript, Node NPM packages Inquirer and MySQL, SQL

### Challenges 

I initially struggled with understanding the relationship between the database and the JavaScript file that I was working off of. In this, I mean that I had to wrap my head around how the computer would differentiate between the MySQL alternations and calls, and strings. But it was evident that there was a direct relationship between the connection query and the modification of the database. Unlike working with APIs and then manipulating the JSON data, I would have to query the database multiple times if I needed to. 

This was created during the UC Davis Extension coding bootcamp.