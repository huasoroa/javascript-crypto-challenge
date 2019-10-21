const nacl=require('libsodium-wrappers');
let key=null;
//Assigns Key for decryption
exports.setKey=async function setKey(newKey)
{
  key=newKey;
}
// Decrypts the function using the key
// => If no key is found the ciphertext can't be decrypted
exports.decrypt=async function decrypt(ciphertext,nonce)
{
  if(key==null){
    throw 'no key';
}
  else{
    return nacl.crypto_secretbox_open_easy(ciphertext, nonce, key);
}}
