<template>
  <div>
    <h2>List of attendees</h2>
    <table>
      <thead>
        <tr>
          <th>fullname</th>
          <th>Age</th>
          <th colspan="2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="attendee in attendees" v-bind:key="attendee.id">
          <td>{{ attendee.fullname }}</td>
          <td>{{ attendee.age }}</td>
          <td class="editLabel" v-on:click="editAttendee(attendee)">EDIT</td>
          <td class="deleteLabel" v-on:click="deleteAttendee(attendee.id)">DELETE</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "AttendeesTable",
  data() {
    return {};
  },
  props: {
    attendees: Array
  },
  created() {},
  methods: {
    deleteAttendee(attendeeId) {
      this.$emit("deleteAttendee", attendeeId);
    },
    editAttendee(attendee) {
      this.$emit("editAttendee", { ...attendee });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deleteLabel {
  text-decoration: underline;
  font-style: italic;
  color: red;
  cursor: pointer;
}
.editLabel {
  text-decoration: underline;
  font-style: italic;
  color: blue;
  cursor: pointer;
}
</style>
