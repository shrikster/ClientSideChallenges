var express = require('express');
var app = express();
app.get('/testUser/:userIndex', function(req, res) 
{
  //res.type('application/json; charset=utf-8');
  //res.send('{userid:1,online:true}');
  console.log('test user '+req.params.userIndex);
 // if(req.params.userIndex==5)throw "error";
  var isOnline = !! Math.round(Math.random() * 1);
  var user={userIndex:Number(req.params.userIndex),online:isOnline};
  res.json(user);
});
app.post('/testUser', function(req, res) 
{
		var body = '';
        req.on('data', function (data) 
        {
            body += data;
        });
        req.on('end', function () 
        {
    		var results=JSON.parse(body); 
           	console.log(results.length);
        });
 	 
 	 res.send('OK'); 
});
app.use(express.static(__dirname + '/public'));
app.listen(3000);
console.log('Listening on port 3000');