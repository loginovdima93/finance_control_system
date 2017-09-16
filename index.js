var express = require('express'),
	bodyParser = require('body-parser'),
	path = require('path'),
	favicon = require('serve-favicon'),
	fs = require('fs'),
	app = express();

app.disable('x-powered-by');
app.set('view engine', 'twig');
app.use(bodyParser.json());
app.use(function(req, res, next){
	console.log('%s %s', req.method, req.url);
	res.setHeader('Access-Control-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, \ Authorization');
	next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(reg, res){
		res.render('main', {page: 'Управление счетами'});
});

app.get('/income', function(reg, res){
    res.render('income', {page: 'Доход'});
});

app.get('/spending', function(reg, res){
    res.render('spending', {page: 'Расход'});
});

app.get('/journal', function(reg, res){
		res.render('journal', {page: 'Журнал операций'});
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.post('/json/accounts.json', function(req,res){
  var dataCheck=req.body;
  var check = JSON.stringify(dataCheck);
  check = check.replace('":""}', ']');
  check = check.replace('{"', '[');
  check = check.replace(/\\/g, '');
  check = check.replace('[0]', '[]');
  fs.writeFile('public/json/accounts.json', check, 'utf8');
});

app.post('/json/income.json', function(req,res){
  var dataCheck=req.body;
  var check = JSON.stringify(dataCheck);
  check = check.replace('":""}', ']');
  check = check.replace('{"', '[');
  check = check.replace(/\\/g, '');
  check = check.replace('[0]', '[]');
  fs.writeFile('public/json/income.json', check, 'utf8');
});

app.post('/json/spending.json', function(req,res){
  var dataCheck=req.body;
  var check = JSON.stringify(dataCheck);
  check = check.replace('":""}', ']');
  check = check.replace('{"', '[');
  check = check.replace(/\\/g, '');
  check = check.replace('[0]', '[]');
  fs.writeFile('public/json/spending.json', check, 'utf8');
});

app.post('/json/journal.json', function(req,res){
  var dataCheck=req.body;
  var check = JSON.stringify(dataCheck);
  check = check.replace('":""}', ']');
  check = check.replace('{"', '[');
  check = check.replace(/\\/g, '');
  check = check.replace('[0]', '[]');
  fs.writeFile('public/json/journal.json', check, 'utf8');
});

var server = app.listen(3000, function(){
	console.log('Listening on port 3000');
});

// ":{" }