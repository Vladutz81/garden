import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createCheckout, markPremium } from '../controllers/paymentController.js';
const r=Router(); r.post('/checkout',auth,createCheckout); r.post('/activate-premium',auth,markPremium); export default r;
