const { appwriteRequest } = require('./client');
const { randomUUID } = require('crypto');

async function registerAccount(payload) {
  const body = {
    userId: payload.userId || randomUUID(),
    email: payload.email,
    password: payload.password,
    name: payload.name || payload.fullName || payload.email,
  };

  return appwriteRequest('/account', {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

async function createEmailSession(email, password) {
  return appwriteRequest('/account/sessions/email', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  });
}

async function getAccount(sessionToken) {
  return appwriteRequest('/account', { method: 'GET' }, sessionToken);
}

async function logout(sessionToken) {
  return appwriteRequest('/account/sessions/current', { method: 'DELETE' }, sessionToken);
}

module.exports = {
  registerAccount,
  createEmailSession,
  getAccount,
  logout,
};
