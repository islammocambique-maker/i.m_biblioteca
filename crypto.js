// crypto.js

const crypto = {
  key: null,

  generateKey: async () => {
    if (!crypto.key) {
      crypto.key = await window.crypto.subtle.generateKey(
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"]
      );
    }
  },

  encryptData: async (plainText) => {
    await crypto.generateKey();
    const enc = new TextEncoder();
    const encoded = enc.encode(plainText);
    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const cipherBuffer = await window.crypto.subtle.encrypt(
      { name: "AES-GCM", iv: iv },
      crypto.key,
      encoded
    );
    const combined = new Uint8Array(iv.length + cipherBuffer.byteLength);
    combined.set(iv, 0);
    combined.set(new Uint8Array(cipherBuffer), iv.length);
    return btoa(String.fromCharCode(...combined));
  },

  decryptData: async (cipherText) => {
    await crypto.generateKey();
    const combined = Uint8Array.from(atob(cipherText), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const data = combined.slice(12);
    const plainBuffer = await window.crypto.subtle.decrypt(
      { name: "AES-GCM", iv: iv },
      crypto.key,
      data
    );
    const dec = new TextDecoder();
    return dec.decode(plainBuffer);
  }
};
