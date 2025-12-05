// Configuration de l'API backend
export const API_CONFIG = {
  BASE_URL:
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    process.env.API_BASE_URL ||
    "http://192.168.1.68:8001/api/v1/",
  TIMEOUT: 30000, // 30 secondes
};
