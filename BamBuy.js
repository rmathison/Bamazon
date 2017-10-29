var mysql = require('mysql');
var inquirer = require('inquirer');
//external file with connection info to database
var key = require("./key.js");

var connection = mysql.createConnection(key.connection);
//contains error callback and function ro run when program initiated
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id" + connection.threadID + "\n------------------------------------");
    displayTable();
    selectProduct();
});
//function to display table to for user
function displayTable() {

    connection.query("SELECT * FROM products", function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);


        }
        console.log("\n");
        console.log("------------------------------");

    });
}

//var saved for inquirer to be easily used later
var questions = [{
        name: 'product',
        type: 'input',
        message: 'What Product would you like to buy? (Enter Product ID)\n\n'
    },
    {
        name: 'amount',
        type: 'input',
        message: '\n\nHow may would you like?\n\n'
    }
];
//function that uses inquirer to prompt questions for users then update table according to responses
function selectProduct() {
    inquirer.prompt(questions).then(function(answer) {
        connection.query("SELECT item_id, product_name, department_name, price, stock_quantity FROM products WHERE ?", { item_id: answer.product }, function(err, res) {
            if (res[0].stock_quantity >= answer.amount) {
                var newQuant = res[0].stock_quantity - answer.amount;
                console.log("\n" + answer.amount + ' units ' + "of " + res[0].product_name + " is " + (answer.amount * res[0].price).toFixed(2) + "\n");
                connection.query("UPDATE products SET ? WHERE ?", [{
                        stock_quantity: newQuant
                    },
                    {
                        item_id: answer.product
                    }
                ], function(err, res) {
                    console.log("Table Updated\n");
                });
                // displays table one more time to show updated values

                displayTable();
                connection.end();
                // if there is not enough of product thius message will display
            } else {
                console.log('Not enough of the product');
            }

        })
    })
}





// What product would you like to buy
//How many units would you like to buy
//app checks to see if product quantity avail
//if not enough log insufficient quantity
//once user selects product have it update database