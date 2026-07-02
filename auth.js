// auth.js

const auth = {
  // Regista usuário
  registar: async ({ nome, email, contacto, pin }) => {
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    // Verificar se já existe
    if (users.some(u => u.email === email || u.nome === nome)) {
      alert('Usuário já existe!');
      return;
    }
    // Encriptar dados
    const userData = { nome, email, contacto, pin, livrosComprados: [], favoritos: [], historico: [] };
    // Aqui podemos encriptar o userData
    const encryptedData = await crypto.encryptData(JSON.stringify(userData));
    users.push({ id: Date.now(), email, nome, data: encryptedData });
    localStorage.setItem('usuarios', JSON.stringify(users));
  },

  // Login
  login: async (identifier, pin) => {
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    for (const u of users) {
      const decrypted = await crypto.decryptData(u.data);
      const userData = JSON.parse(decrypted);
      if ((userData.email === identifier || userData.nome === identifier) && userData.pin === pin) {
        // Retornar usuário completo
        return { id: u.id, ...userData };
      }
    }
    return null;
  },

  // Buscar usuário por ID
  getUserById: async (id) => {
    const users = JSON.parse(localStorage.getItem('usuarios') || '[]');
    const u = users.find(u => u.id === id);
    if (u) {
      const decrypted = await crypto.decryptData(u.data);
      return JSON.parse(decrypted);
    }
    return null;
  }
};
