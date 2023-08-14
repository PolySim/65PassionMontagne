import process from "process";
import console from "console";

const crypto = require('crypto')

export const decrypt = async (messageEncrypt: string, ivString: string) => {
  const encoder = new TextEncoder();
  const iv = encoder.encode(ivString)
  const key = encoder.encode(process.env.KEY)
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
  let decryptedData = decipher.update(messageEncrypt, 'hex', 'utf-8');
  decryptedData += decipher.final('utf-8');
  return decryptedData
}