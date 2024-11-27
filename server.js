const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerInfo = require('./swagger');

const app = express();

const { verifyToken } = require('./middleware/authMiddleware');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Swagger UI
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerInfo));

// Auth
const login = require('./routes/api/auth/login')
app.use('/api/auth/login', login)

// Users
const users = require('./routes/api/users')
const create = require('./routes/api/users/create')
const update = require('./routes/api/users/update')
app.use('/api/users', verifyToken, users)
app.use('/api/users/create', verifyToken, create)
app.use('/api/users/update', verifyToken, update)

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running port ${port}`));