var con = require('../mysqldb.js');

function serverAnswerShowMember(Rows) {
  var result = [];
  for (var i = 0; i < Rows.length; i++) {
    result.push({
      user_Name: Rows[i].user_Name,
    })
  }
  return result;
}

exports.check_borrowMember = function check_borrowMember(book_ID, callback) {
  var sql = "SELECT `user`.`user_Name`,`book`.`book_Title`" +
        "FROM`borrow`" +
        "JOIN`user`" +
        "ON`user`.`user_ID` = `borrow`.`user_ID`" +
        "JOIN`book` " +
        "ON`borrow`.`book_ID` = `book`.`book_ID`" +
        "WHERE`book`.`book_ID` = " + book_ID + "; ";
  con.query(sql, function (err, rows) {
    if (err) throw err;
    var result = { 'status': 'done' };
    callback(null, JSON.stringify(serverAnswerShowMember(rows)));
  });
}