import { encryptText, decryptText } from './crypto_01';
/*
  - store sensitive data locally (local storage) :
*/
instaPayCard = "4111-1111-1111-1111";
const myAppKey = "the$uperKey!preservemyself"
const cardEncrypted = encryptText(instaPayCard, myAppKey);

// to set in local storage :
localStorage.setItem("card", cardEncrypted);


// in usage-> pass the key: "myAppKey":
decryptText(localStorage.getItem("card"), myAppKey)