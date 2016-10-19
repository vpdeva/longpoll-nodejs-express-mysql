/*
Name: Longpoll using Node js - Express - MYSQL
Version: 0.1.0
Author: Vishnu Prakash Devarajan
Author URI: http://vishnudevarajan.com
Path: longpoll-nodejs-express-mysql/tokenclass.js (required by server.js)
*/
//   --------------------------------------------------------------------
function tokenClass( token )
{
    this.token = token;
    this.lastSequence = 0;
}
tokenClass.prototype.getLastSequence = function( )
{
    return this.lastSequence;
}
tokenClass.prototype.setLastSequence = function( sequence )
{
  this.lastSequence = sequence;
}
// Export the class
module.exports = tokenClass;

//   --------------------------------------------------------------------
