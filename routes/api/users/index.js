const express = require('express');
const { getUsers } = require('../../../controller/userController');

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get user list
 *     tags:
 *       - User
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.get('/', getUsers);
module.exports = router;