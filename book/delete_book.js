var con = require('../mysqldb.js');

exports.delete_book = function delete_book(book_ID, callback) {
  var sql = "DELETE FROM `library`.`book` WHERE `book_ID`='" + book_ID + "'";
  con.query(sql, function (err, rows) {
    var result;
    if (rows.affectedRows == 1)
      result = { 'status': 'done' };
    else
      result = { 'status': 'fail' };
    callback(null, result);
  });
}
