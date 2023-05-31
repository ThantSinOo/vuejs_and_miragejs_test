<template>
  <div class="home">
    <Greeting></Greeting>
    <p v-if="isLoggedIn">Successful! You are Logged In</p>
    <p v-else>Invalid Try</p>
  </div>
</template>

<script>
// @ is an alias to /src
import Greeting from '../components/Greeting.vue'
import { Computed } from 'vuex';
import { useAuth } from '@/composable/auth';

export default {
  name: 'HomeView',
  components: {
    Greeting
  },
  setup(){
    const {isLoggedIn} = useAuth()

    return{
      isLoggedIn
    }
  }
}

</script>
