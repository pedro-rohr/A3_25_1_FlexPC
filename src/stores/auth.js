import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false
  }),

  getters: {
    isLoggedIn: (state) => state.isAuthenticated,
    isAdmin: (state) => state.user?.isAdmin || false
  },

  actions: {
    login(credentials) {
      const { email, password, isAdmin } = credentials
      
      if (email && password) {
        this.user = {
          id: isAdmin ? 999 : 1,
          email: email,
          name: email.split('@')[0],
          isAdmin: isAdmin || false
        }
        this.isAuthenticated = true
        
        localStorage.setItem('user', JSON.stringify(this.user))
        localStorage.setItem('isAuthenticated', 'true')
        
        return true
      }
      
      return false
    },

    logout() {
      this.user = null
      this.isAuthenticated = false
      
      localStorage.removeItem('user')
      localStorage.removeItem('isAuthenticated')
    },

    initAuth() {
      const savedUser = localStorage.getItem('user')
      const savedAuth = localStorage.getItem('isAuthenticated')
      
      if (savedUser && savedAuth === 'true') {
        this.user = JSON.parse(savedUser)
        this.isAuthenticated = true
      }
    }
  }
})