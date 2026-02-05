// src/config/api.js
export const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const ENDPOINTS = {
    SIGNUP: "/auth/register-public",
    LOGIN: "/auth/login",
    ME: "/auth/me",
    LOGOUT: "/auth/logout",
    CONTACT: "/forms/contact",
    SEND_FORM: "/forms/send-form",
    MEMBER_ZONE_ENROLL: "/public/memberZone/enrollNow",
    MEMBER_ZONE_DATA: (type) => `/public/memberZone/${type}`
};

export default { BASE_URL, ENDPOINTS };
