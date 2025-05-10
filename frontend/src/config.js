export const API_BASE = process.env.REACT_APP_API_BASE ||
  (process.env.NODE_ENV === 'production'
    ? "https://onlineshop-backend-ay63.onrender.com"
    : "http://localhost:5000");
