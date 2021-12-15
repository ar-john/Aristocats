let mysql = require('mysql');

let window = document.window();

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
      db.query("SELECT * FROM items WHERE item_type='clothing';")  
      console.log(`Successfully loaded items`);
    }
});

function populate(){
    // Establish connection with the DB
    db.connect((err) => {
        if (err) {
        throw err;
        } else {
        db.query("SELECT * FROM items WHERE item_type='clothing';")  
        console.log(`Successfully loaded items`);
        
        function(error, rows, fields){
            
        }
    }
});
}