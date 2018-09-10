var con = require('../mysqldb.js');

function randomInt(low, high) {
  return Math.floor(Math.random() * (high - low) + low);
}

exports.createUser = function createUser(user_Name, user_Email, user_Password, callback) {
  var user_ID = randomInt(100000, 999999);
  var sql = "INSERT INTO `library`.`user` " +
    "(`user_ID`, `user_Name`, `user_Email`, `user_Password`, `user_Role`) " +
    "VALUES ('" + user_ID + "', '" + user_Name + "', '" + user_Email + "', '" + user_Password + "', '1')";
  con.query(sql, function (err, rows) {
    if (err) throw err;
    var result = { 'status': 'done' };
    callback(null, result);
  });
}

