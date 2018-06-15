const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const path = require('path');
const { db } = require('./models');
const models = require('./models');
const wikiRouter = require('./routes/wiki');
const userRouter = require('./routes/user');
const bodyParser = require('body-parser');
module.exports = app;
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
// ...
app.use('/wiki', wikiRouter);

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './stylesheets')));


app.get('/',(req,res,next)=>{
  res.redirect('/wiki')
})

app.get('/', (req, res, next) => {
    res.send(layout(''));
});

const PORT = 3000;

const init = async () => {
    await models.db.sync({force: true})

    app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
    });
}

init();
