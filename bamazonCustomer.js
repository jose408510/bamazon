var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

function start() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Would you like to [BUY] or [ADD] or see [CHECK INVENTORY] ?",
      choices: ["BUY", "ADD","CHECK INVENTORY"]
    })
    .then(function(answer) {
      if (answer.action.toUpperCase() === "ADD") {
        addItem();
      }
      else if(answer.action.toUpperCase() === "BUY") {
        buyItem();
      }
      else if(answer.action.toUpperCase() === "CHECK INVENTORY"){
        inventoryItem();
      }
      // else{
      //   laterDude();
      // }
    });
}

function addItem() {
  inquirer
    .prompt([
      {
        name: "dept",
        type: "input",
        message: "What department would you like to place your item in?"
      },
      {
        name: "product",
        type: "input",
        message: "What is the name of this Product?"
      },
      {
        name: "price",
        type: "input",
        message: "What price would you like to put on this item?"
      },
      {
        name: "stock",
        type: "input",
        message: "How many would you like to throw in inventory",
        validate: function(value) {
          if (!isNaN(value)) {
            return true;
          }
          return false;
        }
      }
    ])
    .then(function(answer) {
      connection.query(
        "INSERT INTO products SET ?",
        {
          department_name: answer.dept,
          product_name: answer.product,
          price: answer.price,
          stock_quantity: answer.stock
        },
        function(err) {
          if (err) throw err;
          console.log("Your item has been added to our inventory!");
          start();
        }
      );
    });
}

function inventoryItem(answer){
  console.log("")
  connection.query("SELECT * FROM products", function (error, res) {
    var table = new Table ({
      head: [ "item_id","department_name", "product_name", "price", "stock_quantity"],
      colWidths: [20, 20, 15, 8, 20 ]
    });
    if (error) {
      console.log(error);
    };
    for (var i = 0; i < res.length; i++) {
      table.push(
        [ res[i].item_id ,res[i].department_name, res[i].product_name, res[i].price, res[i].stock_quantity]
      );
    };
    console.log(table.toString());
  });
  connection.end();
}





function buyItem() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the user for which they'd like to bid on
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What product would you like to buy?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to buy ?"
        }
      ])
      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        var quantityInt = parseInt(answer.quantity);

        if (chosenItem.stock_quantity > quantityInt) {
          
          // quantity was high enough, so update db, let the user know, and start over
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quantity: chosenItem.stock_quantity - quantityInt
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("------------------------------")
              console.log("------------------------------")
              console.log("you have successfully purchased " + quantityInt + " " + answer.choice);
              console.log("------------------------------")
              console.log("------------------------------")
              start();
            }
          );
        }
        else {
          console.log("---------------------------------------");
          console.log("---------------------------------------");
          console.log("Sorry we Dont have that many in stock...");
          console.log("---------------------------------------")
          console.log("---------------------------------------")
          start();
        }
      });
  });
}
