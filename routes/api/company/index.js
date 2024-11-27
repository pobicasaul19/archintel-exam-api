const express = require('express');
const { getCompany } = require('../../../controller/companyController');

/**
 * @swagger
 * /api/companies:
 *   get:
 *     summary: Get company list
 *     tags:
 *       - Companies
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.get('/', getCompany);
module.exports = router;