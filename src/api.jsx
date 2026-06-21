// Central API configuration
// All fetch calls go through here

const BASE_URL = 'https://safarsaathi-backend-mdh1.onrender.com/api';
export const WS_URL = 'wss://safarsaathi-backend-mdh1.onrender.com/ws/buses';

// Helper — attach JWT token to requests if logged in
const authHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ── Auth ──────────────────────────────────────────────
export const loginUser = async (email, password) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
};

export const registerUser = async (name, email, password) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
};

// ── Routes ────────────────────────────────────────────
export const getAllRoutes = async () => {
  const res = await fetch(`${BASE_URL}/routes`, { headers: authHeaders() });
  return res.json();
};

export const getPopularRoutes = async () => {
  const res = await fetch(`${BASE_URL}/routes/popular`);
  return res.json();
};

export const searchRoutes = async (q) => {
  const res = await fetch(`${BASE_URL}/routes/search?q=${q}`);
  return res.json();
};

// ── Contact ───────────────────────────────────────────
export const sendContact = async (name, email, message) => {
  const res = await fetch(`${BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, message }),
  });
  return res.json();
};