const express = require('express');
const { editCompany } = require('../../../controller/companyController');

/**
 * @swagger
 * /api/companies/{_id}:
 *   put:
 *     summary: Edit company
 *     tags:
 *       - Companies
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
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
 *     responses:
 *       201:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.put('/:_id', editCompany);
module.exports = router;
