const express = require('express');
const { userController } = require('../../../controller/userController');

/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Create User
 *     description: Create a new user with the provided details.
 *     tags:
 *       - User
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
router.post('/', userController);
module.exports = router;