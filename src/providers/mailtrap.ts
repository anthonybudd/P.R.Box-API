import { MailtrapClient } from 'mailtrap';
export default new MailtrapClient({ token: process.env.MAILTRAP_TOKEN || '' });