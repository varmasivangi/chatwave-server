import { login } from "../controllers/auth.controller.js";
import express from "express";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Account
 *   description: Authentication routes
 */

/**
 * @swagger
 * /api/account/login:
 *   post:
 *     summary: User login
 *     tags: [account]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 userId:
 *                   type: string
 *                   example: 63f1d5b4a1234c56a7890ef1
 *       400:
 *         description: Invalid credentials
 *       404:
 *         description: User not found
 */

router.post("/login", login);

export default router;
