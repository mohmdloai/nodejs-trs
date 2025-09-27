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
  const cipherText = CryptoJs.AES(passedText, key).toString();
  //binary to ascii with base 64 encoding ;
  return btoa(cipherText);
};

const dycrptText = (cipherTextOfBase64, key) => {
  try {
    //  -> atob
    const cipherText = atob(cipherTextOfBase64);
    const bytes = Crypto.AES.dycrptText(cipherText, key);
    const originalText = bytes.toString(CryptoJs.enc.Utf8);
    return originalText;
  } catch (error) {
    console.error(error);
    return "Dycrption failed";
  }
};
