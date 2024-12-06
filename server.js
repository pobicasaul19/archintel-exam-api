const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerInfo = require('./swagger');

const app = express();

const { verifyToken } = require('./middleware/authMiddleware');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


// Swagger UI
app.use('/documentation', swaggerUi.serve, swaggerUi.setup(swaggerInfo));

// Auth
const login = require('./routes/api/auth/login')
app.use('/api/auth/login', login)

// Users
const getUsers = require('./routes/api/users')
const createUser = require('./routes/api/users/create')
const updateUser = require('./routes/api/users/update')
app.use('/api/users', verifyToken, getUsers)
app.use('/api/users', verifyToken, createUser)
app.use('/api/users', verifyToken, updateUser)

// Company
const getCompanies = require('./routes/api/company')
const createCompany = require('./routes/api/company/create')
const updateCompany = require('./routes/api/company/update')
app.use('/api/companies', verifyToken, getCompanies)
app.use('/api/companies', verifyToken, createCompany)
app.use('/api/companies', verifyToken, updateCompany)

// Article
const getArticles = require('./routes/api/articles')
const createArticle = require('./routes/api/articles/create')
const updateArticle = require('./routes/api/articles/update')
app.use('/api/articles', verifyToken, getArticles)
app.use('/api/articles', verifyToken, createArticle)
app.use('/api/articles', verifyToken, updateArticle)


const port = process.env.PORT || 5000;

app.listen(port, async () => {
  console.log(`Swagger running at http://localhost:${port}/documentation`);
});