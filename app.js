const express = require('express');
const morgan = require('morgan');
const app = express();
const layout = require('./views/layout');
const path = require('path');

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, './stylesheets')));

app.get('/', (req, res, next) => {
    res.send(layout(''));
});

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
});
