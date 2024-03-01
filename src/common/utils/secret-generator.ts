import * as crypto from 'crypto';
import * as base32 from 'hi-base32';
export const generateSecret = (): string => {
  return base32.encode(crypto.randomBytes(32).toString());
};
