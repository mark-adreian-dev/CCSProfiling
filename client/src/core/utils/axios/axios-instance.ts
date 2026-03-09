import axios from "axios";
import { API_CONFIG } from "../../config/api.config";

const api = axios.create({
  baseURL: API_CONFIG.baseApiUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,

  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  withXSRFToken: true,
});

export default api;
