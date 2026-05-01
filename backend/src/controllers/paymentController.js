import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import User from '../models/User.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
export const createCheckout = async (req,res)=>{
  const session = await stripe.checkout.sessions.create({
    mode:'payment', payment_method_types:['card'],
    line_items:[{price_data:{currency:'ron',product_data:{name:'Plan Premium'},unit_amount:9900},quantity:1}],
    success_url:`${process.env.FRONTEND_URL}/dashboard?plata=ok`,
    cancel_url:`${process.env.FRONTEND_URL}/dashboard?plata=cancel`
  });
  await Payment.create({userId:req.user.id,stripeSessionId:session.id,suma:99,status:'pending'});
  res.json({url:session.url});
};

export const markPremium = async (req,res)=>{
  await User.findByIdAndUpdate(req.user.id,{plan:'premium'});
  res.json({mesaj:'Plan premium activ'});
};
