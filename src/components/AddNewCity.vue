<template>
  <v-dialog v-model="modal" max-width="500px">
    <v-card>
      <v-card-title> Add new City </v-card-title>
      <v-card-text>
        <v-text-field
          ref="input"
          label="Enter city name"
          :rules="rules"
          hide-details="auto"
          v-model="city"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="success"
          @click="AddCity"
          :loading="loading"
          :disabled="city.length < 3 || loading"
        >
          Add
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn color="warning" @click="modal = false" :disabled="loading">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ["open"],
  data() {
    return {
      city: "",
    };
  },
  computed: {
    modal: {
      get() {
        return this.open;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
  methods: {
    async AddCity() {
      await this.$store.dispatch("fetchCityByName", this.city);
      this.city = "";
      this.$refs.input.resetValidation();
      this.modal = false;
    },
  },
};
</script>

<style>
</style>