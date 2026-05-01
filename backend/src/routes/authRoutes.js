import { Router } from 'express';
import { forgotPassword, login, refresh, register, resetPassword } from '../controllers/authController.js';
const r = Router();
r.post('/register', register); r.post('/login', login); r.post('/refresh', refresh);
r.post('/forgot-password', forgotPassword); r.post('/reset-password', resetPassword);
export default r;
