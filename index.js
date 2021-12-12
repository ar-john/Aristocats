const express = require('express');
const ejs = require('ejs');
const path = require("path");
const mysql = require("mysql");


//create express app
const app = express();



// Create a database connection configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "aristocats_db", // comment out if running example 1
});

// Establish connection with the DB
db.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log(`Successful connected to the DB....`);
    }
});




//initialize body parser midddleware to parse data sent by users
app.use(express.json());
app.use(express.urlencoded({extended: false }));

//initialize ejs middleware
app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

//ALL ROUTES
app.get("/", (req,res) => {
    res.render("index");
});

app.get("/html/artpage.ejs", (req,res) => {
    res.render("./html/artpage.ejs");
});

app.get("/html/clothingPage.ejs", (req,res) => {
    res.render("./html/clothingPage.ejs");
});

app.get("/html/itemsPage.ejs", (req,res) => {
    res.render("./html/itemsPage.ejs");
});

app.get("/html/listItem.ejs", (req,res) => {
    res.render("./html/listItem.ejs");
});

app.get("/html/newAcctPage.ejs", (req,res) => {
    res.render("./html/newAcctPage.ejs");
});

app.get("/html/sculpturePage.ejs", (req,res) => {
    res.render("./html/sculpturePage.ejs");
});

app.get("/html/signUpPage.ejs", (req,res) => {
    res.render("./html/signUpPage.ejs");
});

app.get("/html/viewListedItem.ejs", (req,res) => {
    res.render("./html/viewListedItem.ejs");
});

app.get("/index.ejs", (req,res) => {
    res.render("index");
});

app.get("/html/itemListed.ejs", (req,res) => {
    res.render("./html/itemListed.ejs");
})

// server functions

app.post("/insertUsers", (req, res) => {
    let data = { fName: req.body.fName, lName: req.body.lName, email: req.body.email, pass: req.body.passwd };
    let sql = `INSERT INTO users SET ?`;
    let query = db.query(sql, data, (err, result) => {
      if (err) {
        throw err;
      }
    //   res.send(`user entry was inserted to the db...`);
      res.render("index");
    });
  });

// this is the post method that will excecute on submit
// to add an item to the database
app.post("/insertItem", (req,res) => {
    valueV = getSelectedValue(itemType);
    let data = { item_name: req.body.itemName, item_type: valueV, item_price: req.body.itemPrice,
    item_img: req.body.filename, creation_date: req.body.creationDate, item_desc: req.body.itemDesc };
    let sql = `INSERT INTO items SET ?`;
    let query = db.query (sql, data, (err, result) => {
        if (err){
            throw err;
        }
        // need to make this page still
        res.render("/itemListed.ejs");
    });
});



//FUNCTIONS
function getSelectedValue(name) {
    // const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    // let valueV = "";
    // checkboxes.forEach((checkbox) => {
    //     valueV.push(checkbox.value);
    // });
    let valueV = document.querySelectorAll(`input[name="${name}"]:checked`);
    return valueV;
}

// set PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on port 3000'));