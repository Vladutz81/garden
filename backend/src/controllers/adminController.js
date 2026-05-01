import User from '../models/User.js';
import Invitation from '../models/Invitation.js';
import Payment from '../models/Payment.js';

export const stats = async (_,res)=>res.json({
  utilizatori: await User.countDocuments(),
  invitatii: await Invitation.countDocuments(),
  plati: await Payment.countDocuments()
});
export const users = async (_,res)=>res.json(await User.find().select('-parolaHash'));
export const invitations = async (_,res)=>res.json(await Invitation.find());
export const toggleUser = async (req,res)=>{const u=await User.findById(req.params.id);u.activ=!u.activ;await u.save();res.json(u)};
