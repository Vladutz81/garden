import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import User from '../models/User.js';
import { signAccess, signRefresh } from '../utils/tokens.js';

export const register = async (req, res) => {
  const { nume, email, parola } = req.body;
  const parolaHash = await bcrypt.hash(parola, 12);
  const user = await User.create({ nume, email, parolaHash });
  res.status(201).json({ id: user._id });
};

export const login = async (req, res) => {
  const { email, parola } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(parola, user.parolaHash))) return res.status(401).json({ mesaj: 'Credențiale invalide' });
  const payload = { id: user._id, rol: user.rol, plan: user.plan };
  const accessToken = signAccess(payload);
  const refreshToken = signRefresh(payload);
  user.refreshToken = refreshToken; await user.save();
  res.json({ accessToken, refreshToken, user: payload });
};

export const refresh = async (req, res) => {
  const { refreshToken } = req.body;
  const decoded = JSON.parse(Buffer.from(refreshToken.split('.')[1], 'base64').toString());
  const user = await User.findById(decoded.id);
  if (!user || user.refreshToken !== refreshToken) return res.status(401).json({ mesaj: 'Invalid refresh' });
  res.json({ accessToken: signAccess({ id: user._id, rol: user.rol, plan: user.plan }) });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.json({ mesaj: 'Dacă emailul există, am trimis linkul.' });
  user.resetToken = crypto.randomBytes(20).toString('hex');
  user.resetExp = new Date(Date.now() + 3600000);
  await user.save();
  res.json({ mesaj: 'Token reset generat', tokenDemo: user.resetToken });
};

export const resetPassword = async (req, res) => {
  const user = await User.findOne({ resetToken: req.body.token, resetExp: { $gt: new Date() } });
  if (!user) return res.status(400).json({ mesaj: 'Token invalid/expirat' });
  user.parolaHash = await bcrypt.hash(req.body.parola, 12);
  user.resetToken = undefined; user.resetExp = undefined;
  await user.save();
  res.json({ mesaj: 'Parolă actualizată' });
};
