<template>
  <h1>Login Page</h1>
  <LoginComponent></LoginComponent>
 
    <form @submit.prevent="handleSubmit" >
      <label for="username">Username:</label>
      <input type="text" id="username" v-model="username" />

      <label for="password">Password:</label>
      <input type="password" id="password" v-model="password" />

      <button type="submit">Log In</button>
    </form>
</template>

<script>
import LoginComponent from '@/components/LoginComponent.vue'
import { ref } from 'vue'
import { useAuth } from '@/composable/auth'

export default {
    name: 'VueLogin',
    components: {
      LoginComponent
    },
    setup(){
      const username = ref('')
      const password = ref('')

      const {login} = useAuth();

      const handleSubmit = () => {
      login(username.value, password.value)
    }

    return{
      username,
      password,
      handleSubmit
    }

    }
}
</script>

<style>

</style>