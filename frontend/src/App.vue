<template>
  <div id="app">
    <h1>Party attendees</h1>
    <AttendeeForm v-on:inviteAttendee="inviteAttendee" :editMode="false" />
    <AttendeesTable
      :attendees="attendees"
      v-on:editAttendee="infosOfAteendeeToEdit"
      v-on:deleteAttendee="deleteAttendee"
    />
    <AttendeeForm
      v-on:editAttendee="editAttendee"
      :attendeeToEdit="attendeeToEdit"
      :editMode="true"
    />
  </div>
</template>

<script>
import AttendeeForm from "./components/AttendeeForm.vue";
import AttendeesTable from "./components/AttendeesTable.vue";
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
    AttendeesTable
  },
  data() {
    return {
      attendees: [],
      attendeeToEdit: null
    };
  },
  async created() {
    const attendees = await getAttendees();
    this.attendees = [...attendees];
  },
  methods: {
    randomKey() {
      return Math.random();
    },
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
    }
  }
};
</script>

<style>
#app {
  width: 80%;
  margin: auto;
}
</style>
