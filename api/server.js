// const path = require('path');
const path = require('path');
const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const clients = require('./routes/clients');
const providers = require('./routes/providers');

const app = express();

// swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Clients Test API',
    version: '0.1.0',
    description: 'API for Clients Test',
    contact: {
      name: 'Charles Obeng',
    },
  },
  servers: [
    {
      url: 'http://localhost:5000/api',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./docs/**/*.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Body parser
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../frontend/dist')));

// cors
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Sanitize data
app.use(mongoSanitize());

// Rate limiting
const limiter = rateLimit({
  windowMs: 20 * 60 * 1000, // 10 mins
  max: 750,
});
app.use(limiter);

// homepage route (http://localhost:5000)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Mount Routers
app.use('/api/clients', clients);
app.use('/api/providers', providers);

app.use(errorHandler);

const PORT = process.env.PORT || 8000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
  )
);
