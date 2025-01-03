import express from "express";
import pg from "pg";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const currentDate = new Date();
console.log(currentDate);

const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"quickbitefeedback",
    password:"1612",
    port:5432,
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/",(req, res) => {
    res.render("index.ejs");
});

db.connect();

app.post("/submit-feedback", (req, res) => {
    const feedback = req.body;
    console.log(feedback);
    
    db.query("INSERT INTO feedback (name, mess_number, feedback, meal_course) VALUES ($1, $2, $3, $4)",
      [feedback.name, feedback.mess_number, feedback.comment, feedback.meal_course], (err) => {
        if (err) {
            console.log("Error executing query", err.stack);
            res.status(500).send("Error submitting feedback."); // Send an error response if the query fails
        } else {
            res.redirect("/"); // Redirect to the home page on successful insertion
        }
        // Do not close the database connection here (db.end()) if you are using connection pooling.
    });
});







app.listen(port, () => {
    console.log(`server running on port ${3000}`);
});