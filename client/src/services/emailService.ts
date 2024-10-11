// /services/emailService.ts
import { Email } from "../types/Email";
import { handleError } from "../utils/handleError";

const BASE_URL = "/api/emails"; // This assumes the backend routes are at /api/emails

// Fetch all emails
export const fetchEmails = async (): Promise<Email[]> => {
  const response = await fetch(`${BASE_URL}`);
  handleError(response);
  return response.json();
};

// Fetch a single email by ID
export const fetchEmailById = async (id: string): Promise<Email> => {
  const response = await fetch(`${BASE_URL}/${id}`);
  handleError(response);
  return response.json();
};

// Mark an email as read
export const markEmailAsRead = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}/read`, { method: "PATCH" });
  handleError(response);
};

// Archive an email
export const archiveEmail = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/${id}/archive`, {
    method: "PATCH",
  });
  handleError(response);
};