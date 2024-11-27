const express = require('express');
const { createCompany } = require('../../../controller/companyController');

/**
 * @swagger
 * /api/companies/create:
 *   post:
 *     summary: Create Company
 *     description: Create a new company with the provided details.
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: query
 *         name: firstName
 *         description: User Firstname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: lastName
 *         description: User Lastname
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: type
 *         description: User Type
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: status
 *         description: User Status
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         description: Password
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.post('/create', createCompany);
module.exports = router;