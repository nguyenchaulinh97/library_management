var con = require('../mysqldb.js');

function serverAnswerShowBook(Rows) {
  var result = [];
  for (var i = 0; i < Rows.length; i++) {
    result.push({
      book_Title: Rows[i].book_Title,
    })
  }
  return result;
}

exports.check_bookBorrowed = function check_bookBorrowed(user_ID, callback) {
  var sql = "SELECT `user`.`user_Name`,`book`.`book_Title`" +
        "FROM`borrow`" +
        "JOIN`user`" +
        "ON`user`.`user_ID` = `borrow`.`user_ID`" +
        "JOIN`book` " +
        "ON`borrow`.`book_ID` = `book`.`book_ID`" +
        "WHERE`user`.`user_ID` = " + user_ID + "; ";
  con.query(sql, function (err, rows) {
    if (err) throw err;
    var result = { 'status': 'done' };
    callback(null, JSON.stringify(serverAnswerShowBook(rows)));
  });
}