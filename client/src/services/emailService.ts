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

// Fetch all labels
export const fetchLabels = async (): Promise<Label[]> => {
  const response = await fetch(`${BASE_URL}/labels`);
  handleError(response);
  return response.json();
};

// Update the starred status of an email
export const updateEmailStarred = async (id: string, starred: boolean): Promise<Email> => {
  const response = await fetch(`${BASE_URL}/emails/${id}/star?starred=${starred}`);
  handleError(response);
  return response.json();
};

/**
 * Fetch emails for the default set of labels: ['INBOX', 'STARRED', 'UNREAD']
 * 
 * @returns The emails for the specified labels
 */
export const fetchEmailsByDefaultLabels = async (): Promise<Email[]> => {
  const response = await fetch(`${BASE_URL}/emails/labels/default`);
  handleError(response);
  return response.json();
};

/**
 * Fetch label by id
 * 
 * @param id The id of the label to fetch
 * @returns The label with the specified id
 */
export const fetchLabelById = async (id: string): Promise<Label> => {
  const response = await fetch(`${BASE_URL}/labels/${id}`);
  handleError(response);
  return response.json();
};