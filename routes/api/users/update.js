const express = require('express');
const { userController } = require('../../../controller/userController');

/**
 * @swagger
 * /api/users/update/{_id}:
 *   put:
 *     summary: Update User
 *     description: Update user info with the provided details.
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
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.put('/', userController);
module.exports = router;