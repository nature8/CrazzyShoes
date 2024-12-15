const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const authJwt = require('./helpers/jwt');  // Import the JWT middleware
const errorHandler = require('./helpers/error-handler');

const app = express();

// Apply the JWT middleware globally
app.use(authJwt());

// Other middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(cors());

// Example routes
app.use('/api/v1/users', require('./routes/users'));
app.use('/api/v1/products', require('./routes/products'));

// Error handling middleware
app.use(errorHandler);

// Connect to the database
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'eshop-database',
})
  .then(() => console.log('Database connection is ready...'))
  .catch((err) => console.log('Database connection failed:', err));

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});




// const express = require('express');
// const app = express();
// const morgan = require('morgan');
// const mongoose = require('mongoose');
// const cors = require('cors');
// require('dotenv').config(); // Ensure this is included
// const authJwt = require('./helpers/jwt');
// const errorHandler = require('./helpers/error-handler');

// // CORS Configuration
// const allowedOrigins = [
//     'http://localhost:3000',  // Frontend running on port 3000
// ];

// const corsOptions = {
//     origin: (origin, callback) => {
//         if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
//             callback(null, true);
//         } else {
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// };

// // Use CORS middleware with custom options
// app.use(cors(corsOptions));
// app.options('*', cors());  // Enable pre-flight request support for all routes

// // Middleware
// app.use(express.json());
// app.use(morgan('tiny'));
// app.use(authJwt()); // Ensure this is properly configured
// app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
// app.use(errorHandler);

// // Routes
// const categoriesRoutes = require('./routes/categories');
// const productsRoutes = require('./routes/products');
// const usersRoutes = require('./routes/users');
// const ordersRoutes = require('./routes/orders');

// const api = process.env.API_URL;

// app.use(`${api}/categories`, categoriesRoutes);
// app.use(`${api}/products`, productsRoutes);
// app.use(`${api}/users`, usersRoutes);
// app.use(`${api}/orders`, ordersRoutes);

// // Database connection
// mongoose.connect(process.env.CONNECTION_STRING, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     dbName: 'eshop-database'
// })
// .then(() => {
//     console.log('Database Connection is ready...');
// })
// .catch((err) => {
//     console.log('Database connection failed:', err);
// });

// // Server
// const port = process.env.PORT || 8000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
