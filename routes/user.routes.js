import express from "express";
import { createUser, getUsers } from "../controllers/user.controller.js";

const Routes = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management APIs
 */

/**
 * @swagger
 * /api/user/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *               password:
 *                 type: string
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Username or Email already exists
 *       500:
 *         description: Server error
 */
Routes.post("/create", createUser);


/**
 * @swagger
 * /api/user/getusers:
 *   post:
 *     summary: Get list of users with basic profile details
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: User list fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 statusCode:
 *                   type: number
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       username:
 *                         type: string
 *                       profileImage:
 *                         type: string
 *                       bio:
 *                         type: string
 *                       isVerified:
 *                         type: boolean
 *                       followersCount:
 *                         type: number
 *                       followingCount:
 *                         type: number
 *                       postsCount:
 *                         type: number
 *       500:
 *         description: Server error
 */
Routes.post("/getusers", getUsers);

export default Routes;
