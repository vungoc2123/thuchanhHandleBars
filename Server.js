const express = require('express')
const bodyParser = require('body-parser');
//import { engine } from 'express-handlebars';
const expressHbs = require('express-handlebars');
const Calculator = require('./Calculator')

const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
//app.engine('.hbs', ExpressHandlebars());
app.engine('.hbs', expressHbs.engine({defaultLayout: 'main' ,extname: "hbs",layoutsDir: './views/layouts'}));

app.set('view engine', '.hbs');
app.set('views', './views');
app.get('/', (req, res) => {
  res.render('Calculator');
});


app.post('/', (req, res) => {
  var object = {}
  var a = req.body.a;
  var operator = req.body.operator;
  var b = req.body.b;
  var result = 0;
  switch (operator) {
      case '+':
          result = Calculator.add(a, b);
          object = {a:a, b:b, add: "+" ,result: result }
          break;
      case '-':
          result = Calculator.subtract(a, b);
          object = {a:a, b:b, subtract: "-" ,result: result }
          break;
      case '*':
          result = Calculator.multiply(a, b);
          object = {a:a, b:b, multiply: "*" ,result: result }
          break;
      case '/':
          result = Calculator.devide(a, b);
          object = {a:a, b:b, devide: "/" ,result: result }
          break;
      default:
          result = 'Invalid operator';
  }
  //res.send(result.toString());
  res.render("Calculator", object );
});



app.listen(3000, () => {
  console.log(`Example app listening on port 3000`)
})
