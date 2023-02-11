require("dotenv").config();
const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const port = 8000;
const app = express();
const dataBase = require('./config/mongoose');

// Setting view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Setting static files path
app.use(express.static('./assets'));

app.use(expressEjsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// Redirecting all requests to router
app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Server unable to start : ${err}`);
        return;
    }
    console.log(`All Set ! Server will be serving on port ${port}`);
})