var con = require('../mysqldb.js');

exports.borrow_book = function borrow_book(book_ID, user_ID, callback) {
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var createdDate = dt.format('Y-m-d H:M:S');
  var sql = "INSERT INTO `library`.`borrow` " +
    "(`book_ID`, `user_ID`, `borrow_Date`) VALUES ('" + book_ID + "', '" + user_ID + "', '" + createdDate + "')";
  con.query(sql, function (err, rows) {
    var result;
    if (rows.affectedRows == 1)
      result = { 'status': 'done' };
    else
      result = { 'status': 'fail' };
    callback(null, result);
  })
}
