import express from 'express';
import { sendContactMessage } from '../controllers/contactController';

const router = express.Router();


/**
 * @swagger
 * /contact:
 *   post:
 *     summary: Contact Form Submission
 *     description: Submit a message through the contact form
 *     tags: [Contact]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               subject:
 *                 type: string
 *               message:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - subject
 *               - message
 *     responses:
 *       200:
 *         description: Message sent successfully
 *       400:
 *         description: Invalid request body
 *       500:
 *         description: Internal server error
 */

router.post('/contact', sendContactMessage);

export default router;
