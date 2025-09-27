// console.log("Hello from crypto 01 !*");
/*
Scenarios of  CryptoJS use case;

- temp access token liek ('uid' in the url )
- assuem u need to give the user a valid "Link" for only *today*
- Encrypt 'someText' with today's date
- Tomorrow, the same ciphertext won't dycrpt correctly
  (key changes daily )
-
*/

/* point to consider : JavaScript strings are always UTF-16 encoded text */

import CryptoJs from "crypto-js";
const encryptText = (passedText, key) => {
  const cipherText = CryptoJs.AES.encrypt(passedText, key).toString();
  //binary to ascii with base 64 encoding ;
  return btoa(cipherText);
};

const decryptText = (cipherTextOfBase64, key) => {
  try {
    //  -> atob
    const cipherText = atob(cipherTextOfBase64);
    const bytes = CryptoJs.AES.decrypt(cipherText, key);
    const originalText = bytes.toString(CryptoJs.enc.Utf8);
    return originalText;
  } catch (error) {
    console.error(error);
    return "Decryption failed";
  }
};

/* key to use is today's date */

const userMeta = (userName, userId) => userName + userId;

const todayDate = new Date().toISOString().split("T")[0];
const token = encryptText(userMeta("mhmd", 443), todayDate);
console.log("Encrypted Token: ", token);

const decrypted = decryptText(token, todayDate);
console.log("Decrypted Token: ", decrypted);


// export funcs:
export { encryptText, decryptText};