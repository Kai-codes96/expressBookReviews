const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{
    let alreadyUser = users.filter((user) => {
        return user.username === username;
    });

    if (alreadyUser.length > 0) {
        return true;
    } else {
        return false;
    }
}

const authenticatedUser = (username,password)=>{
    let validUsers = users.filter((user) => {
        return user.username === username && user.password === password;
    });

    if (validUsers.length > 0) {
        return true;
    } else {
        return false;
    }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({message: "Error logging in"})
    }

    if (authenticatedUser(username, password)) {
        let accessToken = jwt.sign({
            data:password
        }, 'access', { expiresIn: 60 * 60});

        req.session.authorization = {
            accessToken, username
        }
        return res.status(200).send("User successfully logged in");
    } else {
        return res.status(208).json({message: "Invalid login information"});
    }
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
