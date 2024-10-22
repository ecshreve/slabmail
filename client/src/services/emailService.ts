// /services/emailService.ts
import { labelDB } from "../db";
import { Email } from "../types/Email";
import { Label } from "../types/Label";
import { handleError } from "../utils/handleError";
const BASE_URL = "/api";

// Import the label database

const db = labelDB;

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
  const labelData = await db.getLabels();
  if (labelData.length === 0) {
    const response = await fetch(`${BASE_URL}/labels/default`);
    handleError(response);
    const labels = await response.json();
    await db.saveLabels(labels);
    return labels;
  }
  return labelData;
};

/**
 * Fetch label by id
 * 
 * @param id The id of the label to fetch
 * @returns The label with the specified id
 */
export const fetchLabelById = async (id: string): Promise<Label> => {
  return await db.table('labels').get(id);
};

/**
 * Fetch emails by label id
 * 
 * @param id The id of the label to fetch emails for
 * @returns The emails for the specified label
 */
export const fetchEmailsByLabelId = async (id: string): Promise<Email[]> => {
  const response = await fetch(`${BASE_URL}/emails/labels/${id}`);
  handleError(response);
  return response.json();
};
