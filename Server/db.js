var mysql = require('mysql');

//connection pool => it provides production enviornment interface,if we use only connection then at time one connection is created and if there are multiple user are there to connect with databases then it will create lock so to avoid it at production or server level we use connection pool
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  password        : 'manager',
  database        : 'notes_db'
});
 
pool.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

module.exports={pool,}