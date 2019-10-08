const nacl=require('libsodium-wrappers');
let keypair=null;
//  Note in the latter document(JS) that the ready promise must be resolved before the functions in the module can be invoked.
let loadLibsodium=async()=>await nacl.ready;

// "Generate" Public and Private Key
(async()=>{
  await loadLibsodium();
  keypair=nacl.crypto_sign_keypair();
})();

//returns the publicKey
module.exports.verifyingKey=async function verifyingKey(){
  await loadLibsodium();
  return keypair.publicKey;
}
//The private key is sometimes also called the signing key. The secret, or private, key is also called the signing key.
module.exports.sign=async function sign(msg){
  return nacl.crypto_sign(msg,keypair.privateKey)

}
