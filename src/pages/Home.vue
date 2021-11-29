<template>
  <section class="login-logout app-main main-container">
    <h1>Home sweet home</h1>
    <section class="user-info" v-if="user">
      <pre>{{ user }}</pre>
      <button @click="logout">Logout</button>
    </section>
    <section v-else-if="!user && !signupBtn">
      <h3>Login</h3>
      <form @submit.prevent="login">
        <input type="text" v-model="nickname" placeholder="User Name" />
        <input type="text" v-model="password" placeholder="User Password" />
        <button>Login</button>
      </form>
    </section>
    <button @click="signupBtn = !signupBtn" v-if="!signupBtn">
      Dont have a user? sign up
    </button>
    <section v-if="signupBtn">
      <h3>Signup</h3>
      <form @submit.prevent="signup">
        <input type="text" v-model="nickname" placeholder="User Name" />
        <input type="text" v-model="password" placeholder="User Password" />
        <button>Signup</button>
      </form>
      <button v-if="signupBtn">Back</button>
    </section>
  </section>
</template>

<script>
import { userService } from "@/services/user.service.js";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      signupBtn: false,
      password: "ishay",
      nickname: "ishay",
      user: null,
    };
  },
  created() {},
  methods: {
    async login() {
      
     this.user = await this.$store.dispatch({
        type: "setLogin",
        user: {
          username: this.nickname,
          password: this.password,
        },
      });
      this.$router.push("/app");
    },
    signup() {
      userService.signup(this.nickname, this.password).then((user) => {
        this.user = user;
        this.signupBtn = false;
        this.$router.push("/app");
      });
    },
    logout() {
      userService.logout().then(() => {
        this.user = null;
        this.$router.push("/");
      });
    },
  },
};
</script>


