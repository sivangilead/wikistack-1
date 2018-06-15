const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const path = require('path');
const { db } = require('./models');
const models = require('./models');

db.authenticate().
then(() => {
  console.log('connected to the database');
})

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './stylesheets')));

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
