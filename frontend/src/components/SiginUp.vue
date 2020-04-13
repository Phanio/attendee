<template>
  <div class="bg-block">
    <h2>Sigin Up</h2>
     <p v-if="errors.length" class="error">
      <b>Please correct the following error(s):</b>
      <ul>
        <li v-for="error in errors" v-bind:key="error.key">{{ error.msg }}</li>
      </ul>
    </p>

    <p style="color:green">{{errors.success}}</p>
  
    <label for="usernameInput">Username</label>
    <input v-model="username" type="text" id="usernameInput" />
    <label for="password">Password</label>
    <input v-model="password" type="password" id="password" />
    <label for="confirmPassword">Confirm your Password</label>
    <input v-model="passwordConf" type="password" id="confirmPassword" />
    <button v-on:click="submitForm">Send</button>
    <br />
    <div style="text-align: right;">
      <a href="#" v-on:click="login">Login</a>
    </div>
  </div>
</template>

<script>
import { siginUp } from "../services/attendees.js";
export default {
  name: "SiginUp",
  data() {
    return {
      errors: [],
      username: null,
      password: null,
      passwordConf: null,
    };
  },
  props: {},
  created() {},
  
  methods: {
    randomKey() {
      return Math.random();
    },
    checkForm() {
      if (!this.username) {
        this.errors.push({ key: this.randomKey(), msg: "Username required." });
        return false;
      }
      if (!this.password) {
        this.errors.push({ key: this.randomKey(), msg: "Password required." });
        return false;
      }
      if (!this.passwordConf) {
        this.errors.push({
          key: this.randomKey(),
          msg: "Password confirm required.",
        });
        return false;
      }
      if (this.password !== this.passwordConf) {
        this.errors.push({
          key: this.randomKey(),
          msg: "Password must be equal to password confirm.",
        });
        return false;
      }

      /* else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      } */

      return true;
    },
    submitForm() {
      if (this.checkForm()) {
        siginUp({
          username: this.username,
          password: this.password,
        })
          .then((resp) => {
            if (resp.status === 200) {
              resp.json().then((msg) => {
                this.errors = [];
                this.errors['success'] = msg;
                setTimeout(() => {
                  this.$emit("loginOption");
                }, 5000);
              });
            } else {
              resp
                .json()
                .then((rep) =>
                  this.errors.push({ key: this.randomKey(), msg: rep })
                );
            }
          })
          .catch((error) => {
            this.errors.push(error);
          });
      }
    },
    login() {
      this.$emit("loginOption");
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
.bg-block {
  max-width: 500px;
  margin: auto;
  padding: 10px;
  background-color: silver;
  border-radius: 30px;
}
.error{
  color: red;
}
</style>
