# alaturidetine.ro - Platformă SaaS invitații digitale

Monorepo cu:
- `frontend` - Next.js (Vercel)
- `backend` - Express + MongoDB

## 1) Cerințe
- Node.js 20+
- MongoDB Atlas sau local
- cont Stripe
- cont SMTP (Mailtrap / Sendgrid)

## 2) Configurare backend
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

Completează variabilele din `.env`.

## 3) Configurare frontend
```bash
cd frontend
cp .env.local.example .env.local
npm install
npm run dev
```

## 4) Deploy
- Frontend: Vercel (folder `frontend`)
- Backend: Render/Railway/VM (folder `backend`)
- Setează în frontend `NEXT_PUBLIC_API_URL` către backend.

## 5) URL admin secret
Admin panel este disponibil doar la calea:
`/super-admin-portal-123`

Necesită cont cu rol `admin`.
