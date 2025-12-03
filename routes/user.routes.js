import express from 'express';
import { createUser } from "../controllers/user.controller.js";

const Routes = express.Router();


Routes.post('/create', createUser);

export default Routes;