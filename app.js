const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');
require('dotenv').config();  // Osiguraj da je .env učitan

// Importiraj middleware za JWT autentifikaciju
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');  // Tvoj globalni error handler

const app = express();

// Omogući CORS
app.use(cors());
app.options('*', cors());

// Middleware
app.use(bodyParser.json());   // Za parsiranje JSON tijela zahtjeva
app.use(morgan('tiny'));      // Logiranje HTTP zahtjeva
app.use(authJwt());           // Autentifikacija svih zahtjeva s JWT (osim onih navedenih u 'unless' ruti)
app.use(errorHandler);        // Globalno rukovanje greškama

// Rute
const categoriesRoutes = require('./routes/categories');
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');
const ordersRoutes = require('./routes/orders');

const api = process.env.API_URL;

// Definiraj rute s prefiksom API URL-a
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

// Poveži s MongoDB bazom
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'eshop-database'
})
.then(() => {
    console.log('Database Connection is ready...');
})
.catch((err) => {
    console.log(err);
});

// Pokreni server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
