import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ mesaj: 'Neautorizat' });
  try {
    req.user = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    next();
  } catch {
    res.status(401).json({ mesaj: 'Token invalid' });
  }
};

export const requireRole = (rol) => (req, res, next) => req.user.rol === rol ? next() : res.status(403).json({ mesaj: 'Interzis' });
