var con = require('../mysqldb.js');

function increaseQuantity(quantity, book_ID, callback) {
  console.log(quantity, book_ID);
  var newQuantity = quantity + 1;
  var sql = "UPDATE `library`.`book` SET `book_Quantity`='" + newQuantity + "' WHERE `book_ID`='" + book_ID + "'";
  con.query(sql, function (err, rows) {
    var result;
    if (rows.affectedRows == 1)
      result = { 'status': 'done' };
    else
      result = { 'status': 'fail' };
    callback(null, result);
  })
}

exports.increase_bookQuantity = function increase_bookQuantity(book_ID, callback) {
  var sql = "SELECT `book_Quantity` FROM `library`.`book` " +
    "WHERE  `book_ID` ='" + book_ID + "'";
  con.query(sql, function (err, rows) {
    var quantity = rows[0].book_Quantity
    increaseQuantity(quantity, book_ID, function (err, result) {
      callback(null, result);
    })
  })
}
