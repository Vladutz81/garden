import { Router } from 'express';
import { auth, requireRole } from '../middlewares/auth.js';
import { invitations, stats, toggleUser, users } from '../controllers/adminController.js';
const r = Router();
r.use(auth, requireRole('admin'));
r.get('/stats', stats); r.get('/users', users); r.get('/invitations', invitations); r.patch('/users/:id/toggle', toggleUser);
export default r;
