import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { createServer, Model } from 'miragejs'
import axios from 'axios'
import jwt from 'jsonwebtoken'

export function useAuth() {
  const isLoggedIn = ref(false)
  const router = useRouter()
  const route = useRoute()

  const server = createServer({
    models: {
      user: Model
    },

    seeds(server) {
      server.db.loadData({
        users: [
          {
            id: 1,
            username: 'admin',
            password: 'admin123'
          }
        ]
      })
    },

    routes() {
      this.namespace = '/api'

      this.post('/login', (schema, request) => {
        const { username, password } = JSON.parse(request.requestBody)
        const user = schema.db.users.findBy({ username })

        if (user && user.password === password) {
          return {
            token: 'Your_JWT'
          }
        }

        return {
          error: 'Invalid credentials, you are right'
        }
      })
    }
  })

  const login = async (username, password) => {
    try {
      const response = await axios.post('/api/login', { username, password })
      
      if (response.data.token) {
        isLoggedIn.value = true
        // Store the token in local storage or Vuex store for further use
        // For example: localStorage.setItem('token', response.data.token)
        localStorage.setItem('token', response.data.token)
        router.push(route.query.redirect || '/about')
        console.log("Token", response.data.token);
        console.log(localStorage.getItem('token'));

      } else {
        console.log('Invalid credentials from Auth')
      }
    } catch (error) {
      console.error('Login error:', error)
    }
  }
  

  return {
    isLoggedIn,
    login
  }
}
