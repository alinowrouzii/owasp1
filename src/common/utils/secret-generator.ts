import crypto from 'crypto';

export const generateSecret = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
