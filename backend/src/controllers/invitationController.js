import QRCode from 'qrcode';
import { stringify } from 'csv-stringify/sync';
import Invitation from '../models/Invitation.js';
import Rsvp from '../models/Rsvp.js';

export const createInvitation = async (req, res) => {
  const slug = `${req.user.id}-${Date.now().toString(36)}`;
  const invitation = await Invitation.create({ userId: req.user.id, slug, ...req.body });
  invitation.qrCodeUrl = await QRCode.toDataURL(`${process.env.FRONTEND_URL}/invitatie/${slug}`);
  await invitation.save();
  res.status(201).json(invitation);
};
export const listMyInvitations = async (req,res)=>res.json(await Invitation.find({userId:req.user.id}));
export const updateInvitation = async (req,res)=>res.json(await Invitation.findOneAndUpdate({_id:req.params.id,userId:req.user.id},req.body,{new:true}));
export const getPublicInvitation = async (req,res)=>res.json(await Invitation.findOne({slug:req.params.slug}));
export const createRsvp = async (req,res)=>res.status(201).json(await Rsvp.create({invitationId:req.params.invitationId,...req.body}));
export const getRsvpForInvitation = async (req,res)=>res.json(await Rsvp.find({invitationId:req.params.invitationId}));
export const exportRsvpCsv = async (req,res)=>{
  const rows = await Rsvp.find({ invitationId: req.params.invitationId }).lean();
  const csv = stringify(rows, { header: true });
  res.header('Content-Type', 'text/csv');
  res.attachment('rsvp.csv');
  res.send(csv);
};
