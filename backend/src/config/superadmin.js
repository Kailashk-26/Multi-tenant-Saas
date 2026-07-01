import 'dotenv/config';

export const superAdmin = {
    id: process.env.SUPER_ADMIN_ID || 'superadmin',
    email: process.env.SUPER_ADMIN_EMAIL || 'superadmin@byepo.com',
    password: process.env.SUPER_ADMIN_PASSWORD || 'ByepoSuperAdmin2026!'
};