// vite.config.js
export default {
  server: {
    host: '0.0.0.0',  // Listen on all network interfaces
    port: process.env.PORT || 5173,  // Use the Render-provided PORT if available
    allowedHosts: ['fikastunden.onrender.com'],
  }
};
