import { Router } from 'express';
import { auth } from '../middlewares/auth.js';
import { createInvitation, createRsvp, exportRsvpCsv, getPublicInvitation, getRsvpForInvitation, listMyInvitations, updateInvitation } from '../controllers/invitationController.js';
const r = Router();
r.get('/public/:slug', getPublicInvitation);
r.post('/', auth, createInvitation); r.get('/mine', auth, listMyInvitations); r.put('/:id', auth, updateInvitation);
r.post('/:invitationId/rsvp', createRsvp); r.get('/:invitationId/rsvp', auth, getRsvpForInvitation); r.get('/:invitationId/export-csv', auth, exportRsvpCsv);
export default r;
