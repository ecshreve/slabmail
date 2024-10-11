// /services/emailService.ts
import { Email } from "../types/Email";
import { Label } from "../types/Label";
import { handleError } from "../utils/handleError";

const BASE_URL = "/api";

// Fetch all emails
export const fetchEmails = async (): Promise<Email[]> => {
  const response = await fetch(`${BASE_URL}/emails`);
  handleError(response);
  return response.json();
};

// Fetch a single email by ID
export const fetchEmailById = async (id: string): Promise<Email> => {
  const response = await fetch(`${BASE_URL}/emails/${id}`);
  handleError(response);
  return response.json();
};

// Mark an email as read
export const markEmailAsRead = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/emails/${id}/read`, { method: "PATCH" });
  handleError(response);
};

// Archive an email
export const archiveEmail = async (id: string): Promise<void> => {
  const response = await fetch(`${BASE_URL}/emails/${id}/archive`, {
    method: "PATCH",
  });
  handleError(response);
};

// Fetch all labels
export const fetchLabels = async (): Promise<Label[]> => {
  const response = await fetch(`${BASE_URL}/labels`);
  handleError(response);
  return response.json();
};