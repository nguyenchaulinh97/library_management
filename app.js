var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var dateTime = require('node-datetime');

var app = express();
var db = require('./mysqldb');

var createUser = require('./user/create_user.js');
var loginUser = require('./user/login_user.js');
var loUser = require('./user/logout_user.js');
var bBook = require('./book/borrow_book.js')
var rBook = require('./book/return_book.js')
var deQuantity = require('./book/decrease_bookQuantity.js');
var inQuantity = require('./book/increase_bookQuantity.js');
var getQuantity = require('./book/get_bookQuantity.js')
var addBook = require('./book/add_book.js')
var deleteBook = require('./book/delete_book.js')
var updateBook = require('./book/update_book.js')
var checkBorrowMem = require('./user/check_borrowMember.js')
var checkbookBorrowed = require('./book/check_bookBorrowed.js')

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers',
    'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(cookieParser());
app.use(session({
  secret: "secret",
  saveUninitialized: false,
  resave: true
}));

var sess;

app.post('/signup', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /SIGNUP")
  var user_Name = req.body.user_Name;
  var user_Password = req.body.user_Password;
  var user_Email = req.body.user_Email;
  createUser.createUser(user_Name, user_Email, user_Password, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/login', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /LOGIN")
  var user_Password = req.body.user_Password;
  var user_Email = req.body.user_Email;
  sess = req.session;
  loginUser.loginUser(user_Email, user_Password, function(err, result, user_ID) {
    if (user_ID != null) {
      sess.token = user_ID;
    }
    console.log(result);
    //console.log(sess.token);
    res.send(result);
  });
});

app.get('/logout', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "GET /logout")
  var token = sess.token;
  loUser.logoutUser(sess, function (err, result) {
    console.log(result)
    res.send(result)
  })
})

app.post('/borrow_book', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /BORROW_BOOK")
  var book_ID = req.body.book_ID;
  var user_ID = req.body.user_ID;
  getQuantity.get_bookQuantity(book_ID, function (err, result) {
    if (result == true) {
      bBook.borrow_book(book_ID, user_ID, function (err, result) {
        console.log(result);
        res.send(result);
      });
      deQuantity.decrease_bookQuantity(book_ID, function (err, result) {
        console.log(result);
      })
    }
    else {
      let result = { 'status': 'fail' };
      res.send(result)
    }
  })
});

app.post('/return_book', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /RETURN_BOOK")
  var book_ID = req.body.book_ID;
  var borrow_ID = req.body.borrow_ID;
  rBook.return_book(borrow_ID, book_ID, function (err, result) {
    console.log(result);
    res.send(result);
  })
  inQuantity.increase_bookQuantity(book_ID, function (err, result) {
    console.log(result);
  })
});

app.post('/add_book', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /ADD_BOOK")
  var book_Title = req.body.book_Title;
  var book_Description = req.body.book_Description;
  var book_Author = req.body.book_Author;
  var book_Category = req.body.book_Category;
  var book_Quantity = req.body.book_Quantity;

  addBook.add_book(book_Title, book_Description, book_Author, book_Category, book_Quantity, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/delete_book', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /DELETE_BOOK")
  var book_ID = req.body.book_ID;

  deleteBook.delete_book(book_ID, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/update_book', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /UPDATE_BOOK")
  var book_ID = req.body.book_ID;
  var book_Title = req.body.book_Title;
  var book_Description = req.body.book_Description;
  var book_Author = req.body.book_Author;
  var book_Category = req.body.book_Category;
  var book_Quantity = req.body.book_Quantity;

  updateBook.update_book(book_ID, book_Title, book_Description, book_Author, book_Category, book_Quantity, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/check_borrowMember', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /CHECK BORROW MEMBER")
  var book_ID = req.body.book_ID;
  checkBorrowMem.check_borrowMember(book_ID, function (err, result) {
    console.log(result);
    res.send(result);
  });
});

app.post('/check_bookBorrowed', function (req, res) {
  let createdDate = dateTime.create().format('Y-m-d H:M:S')
  console.log("[" + createdDate + "] " + "POST /CHECK BOOK BORROWED")
  var user_ID = req.body.user_ID;
  checkbookBorrowed.check_bookBorrowed(user_ID, function (err, result) {
    console.log(result);
    res.send(result);
  });
});
module.exports = app;
