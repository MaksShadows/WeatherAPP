<template>
  <v-container class="d-flex justify-center" style="height: 100%">
    <div v-if="loading" class="align-self-center"></div>
    <p v-else-if="!data.length" class="mt-6 white--text text-center display-3">
      Choose your city.
    </p>
    <v-row v-else class="mt-6">
      <v-col  cols="12" sm="6" md="4" lg="3" v-for="item in data" :key="item.id">
        <v-card class="mx-auto" max-width="300" color="#000" dark>
          <v-list-item two-line>
            <v-list-item-content>
              <v-list-item-title class="headline">
                {{ item.name }}
              </v-list-item-title>
              <v-list-item-subtitle>
                {{ doDate(new Date(item.dt * 1000)) }},
                {{ item.weather[0].main }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-text>
            <v-row align="center">
              <v-col class="display-2" cols="7">
                {{ whatTemp(item.main.temp) }}&deg;C
              </v-col>
              <v-col cols="5">
                <v-img
                  :src="`http://openweathermap.org/img/wn/${item.weather[0].icon}@4x.png`"
                  alt="Sunny image"
                ></v-img>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-actions>
            <v-btn icon @click="details(item.id)" title="Details">
              <v-icon>mdi-dots-horizontal</v-icon>
            </v-btn>
            <v-btn icon @click="refreshItem(item.id)" title="Refresh">
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn icon @click="removeItem(item.id, item.name)" title="Delete">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <ConfirmItemModal
      :open="openConfirmItemModal"
      :item="confirmItem"
      @close="openConfirmItemModal = false"
    />
  </v-container>
</template>

<script>
import mixinUtils from "@/mixins/utils";

export default {
  name: "Home",
  mixins: [mixinUtils],
  data() {
    return {
      openConfirmItemModal: false,
      confirmItem: {},
    };
  },
  computed: {
    data() {
      return this.$store.getters.getData;
    },
    loading() {
      return this.$store.getters.getLoading;
    },
  },
  methods: {
    removeItem(id, name) {
      this.confirmItem.id = id;
      this.confirmItem.name = name;
      this.openConfirmItemModal = true;
    },
    async refreshItem(id) {
      await this.$store.dispatch("refreshItem", id);
    },
    details(id) {
      this.$router.push({ path: "details", query: { id } });
    },
  },
};
</script>