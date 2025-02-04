const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const user = req.body.username;
    const userPass = req.body.password;
    if (user && userPass) {
        return res.status(404).send({message: "Body Empty"});
    }

    let accessToken = jwt.sign({
        data:user
    }, 'access', { expires: 60 * 60});

    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Add a book review
regd_users.put("/auth/review/:title", (req, res) => {
    const user = req.session.username;
    const title = req.params.title;
    let filtered_titles = Object.values(books).filter((book) => book.title === title);

    if (filtered_titles.length > 0) {
        let filtered_title = filtered_titles[0];

        let review = req.query.reviews;
        if (review) {
            filtered_title.reviews = review;
        }
        res.send(`${user} has added a review for ${filtered_title}`);
    }
});

regd_users.delete("/auth/review/:title", (req, res) => {
    const username = req.body.username;
    users = users.filter((user) => users.username != username);
    res.send(`${username} has been deleted!`);
})

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
