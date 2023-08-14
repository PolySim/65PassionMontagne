import * as process from "process";

const crypto = require('crypto');

export const encrypt = (message: string) => {
  const encoder = new TextEncoder();
  const key = encoder.encode(process.env.KEY)
  const ivString = createIv(16)
  const iv = encoder.encode(ivString)
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encryptedData = cipher.update(message, 'utf-8', 'hex');
  encryptedData += cipher.final('hex');
  return {
    iv: ivString,
    passwordEncrypt: encryptedData as string
  }
}

const randomInd = (max: number) => {
  return Math.floor(Math.random() * max);
}

const createArray = (length: number) => {
  let array = []
  for (let i = 0; i < length; i++) {
    array.push(i)
  }
  return array
}

const createIv = (length: number) => {
  const array = createArray(length)
  return array.map(_elt => randomInd(10)).join("")
}