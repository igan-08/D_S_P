var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const BodyParser = require('body-parser');
const cors = require("cors");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var { Questions_Table , All_User} = require("./bin/models")
var app = express();

//mongodb connection

mongoose.connect("mongodb+srv://root:admin@dsp.51ylmqg.mongodb.net/",{
  useNewUrlParser: true,  
  useUnifiedTopology: true,
})

const db = mongoose.connection;

db.once("open",function(){
  console.log("connected successfully");
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



//get and post calls
app.post("/get_codesheet",function(req,res)
{
  Questions_Table.find({ Topic_difficulty : req.body.final })
  .then(data => res.send(data))
  .catch(err => console.log(err));
});

app.post('/create_user',function(req,res){
  All_User.insertMany(req.body)
  .then(data=>res.send("user created"))
  .catch(err=>res.send(err))
})

app.post("/send_message",function(req,res)
{
  res.send("success");
})

// catch 404 and forward to error handler
app.post("/send_data",function(req,res){
  Questions_Table.insertMany(req.body)
  .then(val => res.send("Success"))
  .catch(err => console.log(err))
})
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(9000,function(){
  console.log("server started");
});

module.exports = app;
