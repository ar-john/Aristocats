const express = require('express');
const ejs = require('ejs');
const path = require("path");

//create express app
const app = express();

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

app.get("/html/loginPage.ejs", (req,res) => {
    res.render("./html/loginPage.ejs");
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



// set PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on port 3000'));