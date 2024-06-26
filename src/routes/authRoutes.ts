import express from 'express';
import { signup, login,forgotPassword,resetPassword } from '../controllers/authController';
import { Adminlogin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: User Signup
 *     description: Register a new user
 *     tags: [Authentication]
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
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Invalid request body
 */

router.post('/signup', signup);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User Login
 *     description: Log in with existing credentials
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */
router.post('/login', login);
/**
 * @swagger
 * /auth/adminlogin:
 *   post:
 *     summary: Admin Login
 *     description: Log in as an admin
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Admin login successful
 *       403:
 *         description: Invalid credentials
 */
router.post('/adminlogin', Adminlogin);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Forgot password
 *     description: user Request to reset Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *             required:
 *               - email
 *     responses:
 *       200:
 *         description: Password reset email sent
 *       400:
 *         description: User not found
 */
router.post('/forgot-password', forgotPassword);
/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: Reset password
 *     description: user Resets his/her Password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               Token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *             required:
 *               - token
 *               - newPassword
 *     responses:
 *       200:
 *         description: Password reset Successfully
 *       400:
 *         description: Invalid Token
 */
router.post('/reset-password', resetPassword);
export default router;
