export const validateEmail = email => {
  const reg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return email && reg.test(String(email).toLowerCase());
};

export const USER = process.env.MONGODB_USER || '';
export const PASSWORD = process.env.MONGODB_PASSWORD || '';
export const NEWSLETTER_URL = buildUrl('newsletter');
export const EVENTS_URL = buildUrl('events');

function buildUrl(databaseName) {
  return `mongodb+srv://${USER}:${PASSWORD}@cluster0.c85mz.mongodb.net/${databaseName}?retryWrites=true&w=majority`;
}
