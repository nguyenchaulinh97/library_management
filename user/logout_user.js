var con = require('../mysqldb.js');

exports.logoutUser = function logoutUser(token, callback) {
  var token
  console.log(token)
  var result
  if(token) {
    console.log(token)
    token = null
    console.log(token)
    result = {'status' : 'success'}
  }
  else {
    result = {'status' : 'fail'}
  }
  console.log(token)
  callback(null,result)
}
