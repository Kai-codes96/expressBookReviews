const express = require('express');
var books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
    users.push({
        "username":req.query.username,
        "password":req.query.password
    });
    res.send("The user " + req.query.username + " has been added");
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.send(JSON.stringify(books));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const authorAuth = Object.values(books).filter((authors) => authors.author === author)
    return res.send(authorAuth);
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const titleAuth = Object.values(books).filter((titles) => titles.title === title);
    res.send(titleAuth);
});

//  Get book review
public_users.get('/review/:title',function (req, res) {
    const title = req.params.title;
    const titleAuth = Object.values(books).filter((titles) => titles.title === title);
    if (titleAuth.length > 0) {
        let mainTitle = titleAuth[0];
        let review = mainTitle["reviews"]
        res.send(review);
    } else {
        res.send("Unable to find review")
    }
});

module.exports.general = public_users;
