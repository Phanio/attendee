<template>
  <div id="app">
    <div class="banner">
      <h1>Party attendees</h1>
      <p>Username: {{user.Username}}</p>
    </div>
    <AttendeeForm v-on:inviteAttendee="inviteAttendee" :editMode="false" v-if="isConnected" />
    <AttendeesTable v-if="isConnected && !isEdited"
      :attendees="attendees"
      v-on:editAttendee="infosOfAteendeeToEdit"
      v-on:deleteAttendee="deleteAttendee"
    />
    <AttendeeForm v-if="isConnected && isEdited"
      v-on:editAttendee="editAttendee"
      :attendeeToEdit="attendeeToEdit"
      :editMode="true" 
    />
    <Login v-if="isLogin" v-on:siginOption="siginUp" v-on:connected="connected" />
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
  deleteAttendee
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
      isRegistered:false,
      isEdited:false,
      user:{}
    };
  },
  async created() {
    if (this.$session.exists()) { 
      this.isRegistered = false;  
      this.isLogin = false;
      this.isConnected = true;
      this.user = { ...this.$session.get("sessionId") };
      console.log(this.user);
      const attendees = await getAttendees();
      this.attendees = [...attendees];
      console.log('cool');
    }
  }, 
  methods: {
   
    inviteAttendee({ fullName, age }) {
      inviteAttendee({ fullName, age })
        .then(resp => resp.json())
        .then(attendee => {
          this.attendees = [...this.attendees, attendee];
        })
        .catch(err => {
          console.log(err);
        });
    },
    infosOfAteendeeToEdit(attendee) {
      this.attendeeToEdit = { ...attendee };
    },
    editAttendee({ id, fullName, age }) {
      editAttendee(id, { fullName, age }).then(() => {
        this.attendees = this.attendees.map(attendee => {
          if (attendee.id === id) {
            return {
              id,
              fullName,
              age
            };
          }
          return attendee;
        });
      });
    },
    deleteAttendee(id) {
      deleteAttendee(id).then(() => {
        const indexOfattendeeToDelete = this.attendees.findIndex(
          attendee => attendee.id === id
        );
        this.attendees.splice(indexOfattendeeToDelete, 1);
      });
    },
    siginUp(){
      console.log('cool');
      this.isRegistered = true;
      this.isConnected = false;
      this.isLogin = false;
    },
    login(){
      console.log('cool');
      this.isRegistered = false;
      this.isConnected = false;
      this.isLogin = true;
    },
    connected(user){
      this.isRegistered = false;
      this.isConnected = true;
      this.isLogin = false;
      this.user = {...user};
    }
  },

};
</script>

<style>
#app {
  width: 80%;
  margin: auto;
}
.banner{
    text-align: center;
    border: 5px solid silver;
    border-radius: 10px 100px / 120px;
    margin-bottom: 20px;
}
</style>
