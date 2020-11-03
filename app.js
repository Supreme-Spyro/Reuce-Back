var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var userRouter = require('./routes/User/index.user');
var artikelRouter = require('./routes/Artikel/index.artikel');
var reviewRouter = require('./routes/Review/index.review');
var productRouter = require('./routes/Product/index.product');
var categoryRouter = require('./routes/Category/index.category');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/artikel', artikelRouter);
app.use('/review', reviewRouter);
app.use('/product', productRouter);
app.use('/category', categoryRouter);

module.exports = app;
