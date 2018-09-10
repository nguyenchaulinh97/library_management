var con = require('../mysqldb.js');

exports.update_book = function update_book(book_ID, book_Title, book_Description, book_Author, book_Category, book_Quantity, callback) {

  var sql = "UPDATE `library`.`book` SET `book_Title`='" + book_Title + "', `book_Description`='" + book_Description + "', `book_Author`='" + book_Author + "', `book_Category`='" + book_Category + "', `book_Quantity`='" + book_Quantity + "' WHERE `book_ID`='" + book_ID + "'";

  con.query(sql, function (err, rows) {
    var result = {};
    if (rows.affectedRows = 1) result = { 'status': 'done' };
    else result = { 'status': 'fail' };
    callback(null, result);
  });
}

