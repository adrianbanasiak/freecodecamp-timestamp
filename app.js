var http    = require('http');
var express = require('express');
var port    = process.argv[2] || 3000;
var app     = express();

http.createServer( app ).listen( port );

app.get('/:date', function(req, res){
  if( Number(req.params.date)){
    fromepoch(req, res);
  } else {
    fromdate(req, res);
  }
});

app.use(function(err, req, res, next){
  baddate(req, res)
  next;
})

function fromdate(req, res){
  try{
    var data = new Date( req.params.date );
    if( data == 'Invalid Date' ){
      baddate(req, res)
      return
    }
    var result = {
      unix: data.getTime(),
      natural: data.toLocaleString('en-us', { month: 'long' }) + " " + data.getDay() + ", " + data.getUTCFullYear()
    };

    res.json( JSON.stringify( result ));
    res.end();
  } catch(e){
    console.log(e)
    baddate(req, res);
  }

}

function fromepoch(req, res){
  try{
    var data = new Date( Number(req.params.date) * 1000 );
    var result = {
      unix: data.getTime(),
      natural: data.toLocaleString('en-us', { month: 'long' }) + " " + data.getDay() + ", " + data.getUTCFullYear()
    };

    res.json( JSON.stringify( result ));
    res.end();

  } catch(e){
    console.log(e)
    baddate(req, res);
  }
}

function baddate(req, res){
  var data = {
    unix: null,
    natural: null
  };

  res.json( JSON.stringify(data) );
  res.end();
}
