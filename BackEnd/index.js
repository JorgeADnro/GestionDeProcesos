const express = require('express');
const mongoose = require("mongoose");
require("dotenv").config();
const aspiranteRouters = require('./src/routes/aspiranteRoute');
const app = express();
const port = process.env.PORT || 9000;
const cors = require("cors");
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path'); 

const corsOptions = {
    origin: 'http://localhost:4300',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cors(corsOptions));
app.use(express.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use('/api/', aspiranteRouters);

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB Atlass'))
    .catch((error) => console.error(error));

app.listen(port, () => console.log('Server listening on port', port));
