<template>
  <div>
    <h2>{{ editMode ? "Edit attendee" : "Add attendee" }}</h2>
    <label for="attendeeNameInput">Name of the attendee</label>
    <input v-model="attendeeName" type="text" id="attendeeNameInput" />
    <label for="attendeeAgeInput">Age of the attendee</label>
    <input v-model="attendeeAge" type="number" id="attendeeAgeInput" />
    <button v-on:click="submitForm">{{ editMode ? "EDIT" : "INVITE" }}</button>
  </div>
</template>

<script>
export default {
  name: "AttendeeForm",
  data() {
    return {
      attendeeName: null,
      attendeeAge: null
    };
  },
  props: {
    editMode: Boolean,
    attendeeToEdit: Object
  },
  created() {},
  watch: {
    attendeeToEdit: function(currentAttendeeToEdit) {
      console.log(currentAttendeeToEdit);
      if (currentAttendeeToEdit) {
        this.attendeeName = currentAttendeeToEdit.fullname;
        this.attendeeAge = currentAttendeeToEdit.age;
      }
    }
  },
  methods: {
    submitForm() {
      /* 
        Send an event to the parent component
        The event name is either editAttendee or inviteAttendee
        The event value is an object representing the attendee to invite or to edit
      */
      this.$emit(this.editMode ? "editAttendee" : "inviteAttendee", {
        id: this.attendeeToEdit ? this.attendeeToEdit.id : undefined,
        fullname: this.attendeeName,
        age: this.attendeeAge
      });
      this.attendeeName = null;
      this.attendeeAge = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
label,
input {
  display: block;
  margin-bottom: 10px;
}
</style>
