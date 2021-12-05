<template>
  <header class="header">
    <div class="container">
      <div class="top__inner">
        <div>
          <router-link
            to="/"
            tag="a"
            class="custom-hover white--text text-decoration-none"
          >
            Add City
          </router-link>
        </div>
        <div class="top__item">
          <v-btn
            fab
            dark
            small
            color="green"
            title="Add new city"
            @click="openNewCityModal = true"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn
            fab
            dark
            small
            color="warning"
            title="Use geolocation"
            @click="useGeo"
          >
            <v-icon>mdi-map-marker-outline</v-icon>
          </v-btn>
        </div>
      </div>
    </div>

    <AddNewCity :open="openNewCityModal" @close="openNewCityModal = false" />
  </header>
</template>

<script>
import AddNewCity from "@/components/AddNewCity";
import Cookies from "js-cookie";

export default {
  components: { AddNewCity },
  data() {
    return {
      fab: false,
      city: "",
      openNewCityModal: false,
      openConfirmModal: false,
    };
  },
  computed: {},
  methods: {
    useGeo() {
      if (!navigator.geolocation) {
        this.setGeoError("Geolocation is not supported by your browser");
      } else {
        navigator.geolocation.getCurrentPosition(this.getGeo, this.setGeoError);
      }
    },
    setGeoError(error = "Unable to retrieve your location") {
      this.$store.commit("setError", error);
    },
    async getGeo(position) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      await this.$store.dispatch("fetchByGeo", { lat, lon });
    },
  },
  async mounted() {
    const cookieStr = Cookies.get("weather-cities") || "[]";
    const cities = JSON.parse(cookieStr);
    if (cities.length) {
      await this.$store.dispatch("fetchGroupByIds", cities);
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
  background-color: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  width: 100%;
}

.container {
  padding: 20px;
  margin: 0 auto;
  width: 100%;
}
.top__inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top__item {
  display: flex;
  gap: 15px;
}
.custom-hover {
  transition: 0.3s;
  font-size: 35px;

  &:hover {
    letter-spacing: 1px;
  }
}
</style>
