var con = require('../mysqldb.js');

exports.return_book = function return_book(borrow_ID, book_ID, callback) {
  var dateTime = require('node-datetime');
  var dt = dateTime.create();
  var createdDate = dt.format('Y-m-d H:M:S');

  var sql = "UPDATE `library`.`borrow` SET `return_Date`='" + createdDate +"' WHERE `borrow_ID`='" + borrow_ID + "'";

  con.query(sql, function (err, rows) {
    var result;
    if (rows.affectedRows == 1)
      result = { 'status': 'done' };
    else
      result = { 'status': 'fail' };
    callback(null, result);
  })
}
