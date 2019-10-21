const nacl = require('libsodium-wrappers')

let clientPublicKey = null;
let sharedKeys = null;
let serverKeys = null;

let loadLibsodium=async()=>await nacl.ready;

(async()=>{
  await loadLibsodium();
  serverKeys=nacl.crypto_kx_keypair();
})();

exports.setClientPublicKey= function setClientPublicKey(NewClientPublicKey){
  if (clientPublicKey==null||NewClientPublicKey===clientPublicKey) {
    clientPublicKey = NewClientPublicKey;
  }else {
    throw 'client public key already set';
  }
}

exports.serverPublicKey= async function serverPublicKey(){
  await loadLibsodium();
  return serverKeys.publicKey;
}

exports.decrypt= async function decrypt(cipher,nonce){
await loadLibsodium();
sharedKeys= nacl.crypto_kx_server_session_keys(
  serverKeys.publicKey,serverKeys.privateKey,clientPublicKey)
  return nacl.crypto_secretbox_open_easy(cipher,nonce,sharedKeys.sharedRx);
}

exports.encrypt= async function encrypt(msg){
await loadLibsodium();
sharedKeys= nacl.crypto_kx_server_session_keys(
  serverKeys.publicKey,serverKeys.privateKey,clientPublicKey)
  nonce = nacl.randombytes_buf(nacl.crypto_secretbox_NONCEBYTES);
  ciphertext =  nacl.crypto_secretbox_easy(msg,nonce,sharedKeys.sharedTx);
  return {ciphertext, nonce};
}
