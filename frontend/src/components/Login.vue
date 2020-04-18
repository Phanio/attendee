<template>
  <div class="login-block">
    <h2>Login</h2>
    <label for="username">Username</label>
    <input v-model="username" type="text" id="username" />
    <label for="password">Password</label>
    <input v-model="password" type="password" id="password" />
    <button v-on:click="submitForm">Go!</button>
    <br />
    <div style="text-align:right">
      <a href="#" v-on:click="siginUp">Sigin Up</a>
    </div>
  </div>
</template>

<script>
import { login } from "../services/attendees.js";
export default {
  name: "Login",
  data() {
    return {
      errormsg: "",
      username: null,
      password: null,
    };
  },
  props: {},
  created() {},

  methods: {
    checkForm() {
      if (!this.username) {
        this.errormsg = "Username required.";
        return false;
      }
      if (!this.password) {
        this.errormsg = "Password required.";
        return false;
      }
      return true;
    },
    submitForm() {
      if (this.checkForm()) {
        login({ username: this.username, password: this.password })
          .then((resp) => {
            console.log(resp);
            if (resp.status === 200) {
              const user = resp.data;
              this.$emit("connected", user);
            } else {
              this.password = "";
              this.errormsg = resp.msg;
            }
          })
          .catch((error) => {
            this.errormsg = error;
          });
      }
    },
    siginUp() {
      this.$emit("siginOption");
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label,
input {
  display: block;
  margin-bottom: 10px;
}
.login-block {
  max-width: 400px;
  margin: auto;
  padding: 10px;
  background-color: silver;
  border-radius: 30px;
}
</style>
