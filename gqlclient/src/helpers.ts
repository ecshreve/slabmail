/**
 * Format email address
 * 
 * @param email - The email address to format `HackerRank Team <hackers@hackerrankmail.com>`
 * @returns The formatted email address `hackers@hackerrankmail.com`
 */
export const formatEmailAddress = (email: string) => {
  return email.split('<')[1].split('>')[0];
};

export const stripSpaces = (text: string) => {
  return text.replace(/\s+/g, ' ').trim();
};

export const formatDate = (date: string) => {
  return new Date(parseInt(date)).toLocaleString();
};