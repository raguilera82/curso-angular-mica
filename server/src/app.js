const express = require('express');
const cors = require('cors')
const booksRouter = require('./booksRouter.js');
const bodyParser = require('body-parser');
const passport = require('passport');

const app = express();

app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(passport.initialize());

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

app.use(booksRouter);

app.listen(8080, () => {
  console.log('Example app listening on port 8080!');
});