<template>
  <div id="app">
    <div class="banner">
      <h1>Party attendees</h1>
      <p v-if="isConnected">
        Username: <b>{{ user.username }}</b> <a class="logout"  href="#" @click="logOut">Logout</a>
      </p>
    </div>
    <AttendeeForm
      v-on:inviteAttendee="inviteAttendee"
      :editMode="false"
      v-if="isConnected && !isEdited"
    />
    <AttendeesTable
      v-if="isConnected"
      :attendees="attendees"
      v-on:editAttendee="infosOfAteendeeToEdit"
      v-on:deleteAttendee="deleteAttendee"
    />
    <AttendeeForm
      v-if="isConnected && isEdited"
      v-on:editAttendee="editAttendee"
      :attendeeToEdit="attendeeToEdit"
      :editMode="true"
    />
    <Login
      v-if="isLogin" v-on:siginOption="siginUp" v-on:connected="connected"
    />
    <SiginUp v-if="isRegistered" v-on:loginOption="login" />
  </div>
</template>

<script>
import AttendeeForm from "./components/AttendeeForm.vue";
import AttendeesTable from "./components/AttendeesTable.vue";
import Login from "./components/Login.vue";
import SiginUp from "./components/SiginUp.vue";
import {
  getAttendees,
  inviteAttendee,
  editAttendee,
  deleteAttendee,
  getCurrentUser,
  logOut,
} from "./services/attendees";

export default {
  name: "App",
  components: {
    AttendeeForm,
    AttendeesTable,
    Login,
    SiginUp
  },
  data() {
    return {
      attendees: [],
      attendeeToEdit: null,
      isConnected: false,
      isLogin: true,
      isRegistered: false,
      isEdited: false,
      user: {},
    };
  },
  async created() {
    const user = await getCurrentUser();
    console.log(user);
    if (user) {
      this.isConnected = true;
      this.isLogin = false;
      this.user = { ...user };
      const attendees = await getAttendees();
      if (attendees) {
        this.attendees = [...attendees];
      }
    }
  },
  methods: {
    inviteAttendee({ fullname, age }) {
      inviteAttendee({ fullname, age }).then(resp=>{
        if(resp.status ===200){
          this.attendees = [...this.attendees, {...resp.data}]
        }
      }).catch((err) => {
          console.log(err);
        });
    },
    infosOfAteendeeToEdit(attendee) {
      this.attendeeToEdit = { ...attendee };
      this.isEdited = true;
    },
    editAttendee({ id, fullname, age }) {
      editAttendee(id, { fullname, age }).then((resp) => {
        console.log(resp);
        if (resp.status === 200) {
          this.attendees = this.attendees.map((attendee) => {
            if (attendee.id === id) {
              return {
                id,
                fullname,
                age,
              };
            }
            return attendee;
          });
          this.isEdited = false;
        } else {
          //message d'error
        }
      });
    },
    deleteAttendee(id) {
      deleteAttendee(id).then((resp) => {
        if (resp.status === 200) {
          const indexOfattendeeToDelete = this.attendees.findIndex(
            (attendee) => attendee.id === id
          );
          this.attendees.splice(indexOfattendeeToDelete, 1);
        } else {
          //message d'erreur
        }
      });
    },
    siginUp() {
      console.log("cool");
      this.isRegistered = true;
      this.isConnected = false;
      this.isLogin = false;
    },
    login() {
      console.log("cool");
      this.isRegistered = false;
      this.isConnected = false;
      this.isLogin = true;
    },
    async connected(user) {
      this.isRegistered = false;
      this.isConnected = true;
      this.isLogin = false;
      this.user = { ...user };
      this.attendees = await getAttendees();
    },
    logOut() {
      logOut().then(() => {
        this.init();
      });
    },
    init() {
      this.isRegistered = false;
      this.isLogin = true;
      this.isConnected = false;
      this.user = {};
    },
  },
};
</script>

<style>
#app {
  width: 80%;
  margin: auto;
}
.banner {
  text-align: center;
  border: 5px solid silver;
  border-radius: 10px 100px / 120px;
  margin-bottom: 20px;
}
</style>
