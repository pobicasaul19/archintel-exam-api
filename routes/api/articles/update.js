const express = require('express');
const { editArticle } = require('../../../controller/articleController');

/**
 * @swagger
 * /api/articles/{_id}:
 *   put:
 *     summary: Edit article
 *     tags:
 *       - Articles
 *     parameters:
 *       - in: path
 *         name: _id
 *         description: Article ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: company
 *         description: Company name related to the article
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: title
 *         description: Article title
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: link
 *         description: Article link
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: date
 *         description: Article publication date
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: content
 *         description: Article content
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: imageUrl
 *         description: URL of the article image
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       201:
 *         description: Successfully updated
 *       400:
 *         description: Bad request
 */

const router = express.Router();
router.put('/:_id', editArticle);
module.exports = router;
