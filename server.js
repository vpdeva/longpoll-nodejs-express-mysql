/*
Name: Longpoll using Node js - Express - MYSQL
Version: 0.1.0
Author: Vishnu Prakash Devarajan
Author URI: http://vishnudevarajan.com
*/


var tokenClass = require('./tokenClass');
var app = require("express")();
var bodyParser = require('body-parser');
var mysql = require("mysql");
var http = require('http').Server(app);
var f; // set interval ref;
app.use(require("express").static('messages'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

/* Creating MySQL connection.*/
var con = mysql.createPool({
 host     : 'hostname',
		user     : 'username',
		password : 'password',
		database : 'databasename',
});

// ==========================================================================
function querySQLForNewData( token, sequence )
{
  var output = "";

      con.getConnection(function(err,connection)
      {
          if(err)
          {
            connection.release();
          }
          else
          {

              var query="SELECT sequence,data FROM table_name WHERE token = '" + token + "' and sequence > " + sequence;
              console.log( "Query " + query );

              con.query(String(query),
                  function(err,rows)
                  {
                      var queryOut = "";

                      connection.release();

                      console.log( JSON.stringify(rows) );

                      if( !err )
                      {
                        console.log( "Query No Error: " + rows.length );
                          if(rows.length > 0)
                          {
                              queryOut = JSON.stringify(rows);
                              console.log("Query output is: " + queryOut );
                          }
                      }
                      else
                      {
                          console.log("Query failed");
                      }

                      console.log("query function result: " + queryOut );
                      return queryOut;
                  } // function(err,rows)
                );  // con.query(String(query)

                console.log( "Output is: " + output );
            }  // else if err

        }  // con.getConnection(function(err,connection)
      ); // con.getConnection(

    console.log( "Query Return is: " + output );
    return output;
}

// ==========================================================================

function checkNewData( token, sequence )
{
    var postData = "";
    console.log( "checkNewData triggered");

    var lastSequence = global.listTokenSequences[token];  // get the lastSequence number available for this 'token'
    if( !lastSequence || (lastSequence > sequence) )
    {
      console.log( "Have new Data - Check SQL: " + lastSequence );
      // need to query SQL for any new items after 'sequence';
      postData = querySQLForNewData( token, sequence );
      console.log( "Result from SQL Query: " + postData );
    }
    console.log( "Last Sequence is " + lastSequence );

    return postData;
}


// ==========================================================================
// ==========================================================================
app.post('/get_data', function (req, res) {

  var token = req.body.token;
  var sequence = req.body.sequence;

  if( ! global.listTokenSequences ) {
    console.log("Create Global Array");
    global.listTokenSequences = { };
  }

  console.log( "Get Data for: " + token + " where sequence > " + sequence );

  var refreshID = setInterval(
    function()
    {

      var postData = checkNewData( token, sequence );

      console.log( "Have Data to return: " + postData );
      if( postData != "" )
      {
        console.log( "Return Data: " + postData );
        // return the query results
        res.write( postData );
        res.end();

        console.log("clearInterval");
        clearInterval( refreshID );
      }

  }, 5000, token, sequence );



  req.on("close", function() {
    console.log("clearInterval");
    clearInterval( refreshID );  // stop
    console.log("Connection closed unexpectedly");
  })

  req.on("end", function() {
    console.log("clearInterval");
    clearInterval( refreshID );  // stop
    console.log("Connection closed");
  })

  console.log( "Finished get_data");
});



// ==========================================================================
// ==========================================================================

app.post('/newhook', function (req, res )
{
  // newhook is called whenever a new hook come in, so we can notify any listening service of new messages
  var token = req.body.token;
  var sequence = req.body.sequence;

  if( ! global.listTokenSequences ) {
    console.log("Create Global Array");
    global.listTokenSequences = { };
  }

  global.listTokenSequences[token] = sequence;
  console.log( "Item " + token + " = " + global.listTokenSequences[token] );

  res.write("OK");
  res.end();

});

// ==========================================================================
// ==========================================================================
// ==========================================================================

http.listen(8080,function(){
    console.log("Listening on http://127.0.0.1:8080/");
});
