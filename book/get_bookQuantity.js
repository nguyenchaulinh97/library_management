var con = require('../mysqldb.js');

exports.get_bookQuantity = function get_bookQuantity(book_ID, callback) {
  var sql = "SELECT `book_Quantity` FROM `library`.`book` " +
    "WHERE  `book_ID` ='" + book_ID + "'";
  con.query(sql, function (err, rows) {
    if (rows[0].book_Quantity > 2) {
      callback(null, true)
    }
    else {
      callback(null, false)
    }
  })
}
