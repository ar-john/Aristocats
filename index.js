const express = require('express');
const ejs = require('ejs');
const path = require("path");
const mysql = require("mysql");
const fs = require('fs');

//require multer
const multer = require('multer');
//provide upload dest
//const upload = multer({ dest: './public/data/uploads/' });



//create express app
const app = express();



// Create a database connection configuration
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "aristocats_db", //connection name
});

// Establish connection with the DB
db.connect((err) => {
    if (err) {
      throw err;
    } else {
      console.log(`Successful connected to the DB....`);
    }
});


//multer code

//storage
// let storage = multer.diskStorage({
//     destination: function (req, file, callback) {
//       callback(null, DIR);
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
 
//let upload = multer({storage: storage});

//multer img upload thing
// app.post('/uploadPic',upload.single('filename1'), function (req, res) {
//     message : "Error! in image upload."
//       if (!req.file) {
//           console.log("No file received");
//             message = "Error! in image upload."
//           res.render('html/listItem.ejs',{message: message, status:'danger'});
      
//         } else {
//           console.log('file received');
        //   console.log(req);
    //       var sql = "INSERT INTO `file`(`name`, `type`, `size`) VALUES ('" + req.file.filename + "', '"+req.file.mimetype+"', '"+req.file.size+"')";
   
    //               var query = db.query(sql, function(err, result) {
    //                  console.log('inserted data');
    //               });
    //       message = "Successfully! uploaded";
    //       res.render('index',{message: message, status:'success'});
   
    //     }
    // let file1 = app.use("/images",express.static("./public/data/uploads")) => {
        
    // )};

//     console.log(req.file, req.body);
// }});

// const { static } = require('express');
// app.use('/images', static('./public/data/uploads/'));







//NEW TRY AT MULTER CODE


//storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
      // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },  
});

const limits = {
    fileSize : 4000000
}

//fileFilter function controls which files should be uploaded. req = request being made. file = contains file info. cb = callback function to tell multer when we are done filtering the file. send back an error message to the client with cb.
const fileFilter =(req, file, cb) => {
    //if the file is not a jpg, jpeg, or png file, do not upload it multer; reject it.
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
        return cb(new Error('File must be of type JPG, JPEG, or PNG and nore more than 2MB in size'))
    }
    //undefined = nothing went wrong; true = that is true, nothing went wrong, accept the upload.
    cb(undefined, true)
}

//set up the multer middleware
const upload = multer({
    storage: storage,
    limits: limits,
    dest: './public/data/uploads/',
    //fileFilter: fileFilter
      // filename: filename
})



// const cpUpload = upload.fields([{ name: 'itemName', maxCount: 1}, { name: 'hiddenInput', maxCount: 1}, 
//             { name: 'itemPrice', maxCount: 1}, { name: 'filename', maxCount: 1},
//             { name: 'creationDate', maxCount: 1}, { name: 'itemDesc', maxCount: 1} ]);

//upload image post route
app.post("/upload", upload.fields([{ name: 'itemName', maxCount: 1}, { name: 'hiddenInput', maxCount: 1}, 
{ name: 'itemPrice', maxCount: 1}, { name: 'filename', maxCount: 1},
{ name: 'creationDate', maxCount: 1}, { name: 'itemDesc', maxCount: 1} ])
, (req, res) => {
 

    let data = { item_name: req.body.itemName, item_type: req.body.hiddenInput, item_price: req.body.itemPrice,
        item_img: req.files['filename'][0], creation_date: req.body.creationDate, item_desc: req.body.itemDesc };
    let sql = `INSERT INTO items SET ?`;
    let query = db.query(sql, data, (err, result) => {
       console.log('inserted data');
       
    });
    message = "Successfully! uploaded";
    //res.render('index',{message: message, status:'success'});
    //end of mysql stuff
     
    res.redirect("html/itemListed.ejs");
   
}), (error, req, res, next) => {
    res.render("html/itemListed.ejs");
    // res.redirect('/');
}


// app.get('/itemsPage',function(req,res,next) {
//     let sql = `SELECT * FROM items WHERE item_type='clothing'`;
//     db.query(sql, function (err, data, fields){
//         if (err) throw err;
//         res. render('itemsPage', { title: 'Item Page', itemData: data});
//     });
//     console.log('Displaying items');

// });












//initialize body parser midddleware to parse data sent by users
app.use(express.json());
app.use(express.urlencoded({extended: false }));

//initialize ejs middleware
app.set("view engine", "ejs");
//app.use("/public", express.static(__dirname + "/public"));
app.use(express.static(__dirname));
//ALL ROUTES - GET
app.get("/", (req,res) => {
    res.render("/index.ejs");
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

// server functions POST

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







// set PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('Server is running on port 3000'));


//References
// https://stackoverflow.com/questions/23175006/how-to-check-multiple-checkboxes-with-javascript
// https://stackoverflow.com/questions/20871577/how-to-save-a-javascript-variable-into-a-mysql-database-in-expressjs
// https://codingstatus.com/how-to-store-image-in-mysql-database-using-node-js/
// https://stackoverflow.com/questions/67757372/upload-image-to-mysql-with-nodejs-and-multer
// https://stackoverflow.com/questions/51483507/how-to-save-and-show-the-picture-saved-using-multer-package-in-nodejs