var con = require('../mysqldb.js');

exports.add_book = function add_book(book_Title, book_Description, book_Author, book_Category, book_Quantity, callback) {
  var sql = "INSERT INTO `library`.`book`" +
    "(`book_Title`, `book_Description`, `book_Author`, `book_Category`, `book_Quantity`)" +
    "VALUES ('" + book_Title + "', '" + book_Description + "', '" + book_Author + "', '" + book_Category + "', '" + book_Quantity + "')";
    con.query(sql, function(err, rows) {
      var result;
      if (rows.affectedRows == 1)
        result = {'status' : 'done'};
      else
        result = {'status' : 'fail'};
      callback(null, result);
    });
}