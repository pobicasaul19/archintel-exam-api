const express = require('express');
const { getArticles } = require('../../../controller/articleController');

/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Get articles list
 *     tags:
 *       - Articles
 *     responses:
 *       201:
 *         description: Successfully registered
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.get('/', getArticles);
module.exports = router;