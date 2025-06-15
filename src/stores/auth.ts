import { defineStore } from 'pinia'
import axios from 'axios'

// No seu arquivo de chamadas API (axios ou fetch)
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';

interface User {
  id_usuario: number;
  nome: string;
  email: string;
  perfil_acesso: string | null;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
        user: null as User | null,
      token: localStorage.getItem('token') || '',
  }),
  actions: {
    async login(email: string, senha: string) { 
      try {
         // limpa estado anterior, se houver
        this.logout()

        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email,
          senha,
        })

         console.log('Resposta do login:', response.data) // <-- aqui

        this.token = response.data.token
        console.log('Token recebido:', this.token); // <-- Adicione este log
        localStorage.setItem('token', this.token)
        console.log('Token armazenado no localStorage:', localStorage.getItem('token')); 
            // Buscar dados do usuário com o token
        const userResponse = await axios.get('http://localhost:3000/api/auth/me', {
        headers: { Authorization: `Bearer ${this.token}` }
        });
        console.log('Resposta do /me:', userResponse.data); // <-- Adicione este log
        this.user = userResponse.data;
        
      } catch (error: any) {
        console.error('Erro ao fazer login:', error)
        throw error
      }
    },

    async register(nome: string, email: string, senha: string, perfil_acesso: string) {
    try {
        await axios.post('http://localhost:3000/api/auth/register', {
        nome,
        email,
        senha,
        perfil_acesso
        });
    } catch (error: any) {
        console.error('Erro ao registrar usuário:', error);
        throw error;
    }
    },

    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },

     async loadUserFromToken() {
      if (!this.token) return

      try {
        const response = await axios.get('http://localhost:3000/api/auth/me', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        console.log('Token carregado:', this.token);
        this.user = response.data
      } catch (error) {
        console.error('Erro ao carregar usuário com token:', error)
        this.logout()
      }
    }
    
  },
})
