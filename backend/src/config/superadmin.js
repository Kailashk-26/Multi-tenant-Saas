import 'dotenv/config';

export const superadmin = {
  email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@byepo.com',
  password: process.env.SUPER_ADMIN_PASSWORD || 'ByepoSuperAdmin2026!',
  role: 'SUPER_ADMIN'
};