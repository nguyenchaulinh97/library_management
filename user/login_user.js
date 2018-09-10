var con = require('../mysqldb.js');

function compareUserpassword(passwordInput, passwordDB) {
  if (JSON.stringify(passwordInput) === JSON.stringify(passwordDB)) {
    return true
  }
  else return false
}

function serverAnswerShowUser(Username, Email, Role) {
  return {
    status: 'done',
    user_Name: Username,
    user_Email: Email,
    user_Role: Role,
  };
}

exports.loginUser = function loginUser(user_Email, user_Password, callback) {
  console.log('Pass: ' + user_Password)
  var sql = "SELECT * FROM `library`.`user` " +
    "WHERE `library`.`user`.`user_Email` = '" + user_Email + "'";
  con.query(sql, function (err, rows) {
    var result = {};
    if (compareUserpassword(user_Password, rows[0].user_Password) == true) {
      callback(null, JSON.stringify(serverAnswerShowUser(
        rows[0].user_Name,
        rows[0].user_Email,
        rows[0].user_Role,
      )), rows[0].user_ID);
    }
    else {
      result = { 'status': 'fail' }
      callback(null, result);
    }
  });
}
