<template>
  <v-container class="d-flex align-center justify-center" style="height: 100%">

    <v-card width="600" color="rgba(0,0,0, 0.1)" dark>
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="headline">
            {{ item.city.name }},
            <span class="body-2">{{ item.city.country }}</span>
          </v-list-item-title>
          <v-list-item-subtitle>
            <div>{{ whatDay(new Date(item.list[0].dt_txt).getDay()) }}</div>
            {{ doDate(new Date(item.list[0].dt_txt)) }},
            {{ item.list[0].weather[0].description }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-row align="center">
          <v-col class="display-3 custome-temp text-center" cols="7">
            {{ whatTemp(item.list[0].main.temp) }}&deg;C
          </v-col>
          <v-col cols="5">
            <v-img
              class="mx-auto"
              :src="`http://openweathermap.org/img/wn/${item.list[0].weather[0].icon}@4x.png`"
              :alt="item.list[0].weather[0].main"
              width="200"
            ></v-img>
          </v-col>
        </v-row>
      </v-card-text>

      <v-row>
        <v-col cols="6">
          <v-list-item title="wind speed">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-weather-windy</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>
              <span class="ml-sm-6 custome-list">
                {{ item.list[0].wind.speed }} m/sec
              </span>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item title="wind direction">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-windsock</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>
              <span class="ml-sm-6 custome-list">
                {{ whatWindDir(item.list[0].wind.deg) }}
              </span>
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
        <v-col cols="6">
          <v-list-item title="humidity">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-water-percent</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>
              <span class="ml-sm-6 custome-list">
                {{ item.list[0].main.humidity }} %
              </span>
            </v-list-item-subtitle>
          </v-list-item>
          <v-list-item title="pressure">
            <v-list-item-icon class="mr-2">
              <v-icon>mdi-speedometer</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>
              <span class="ml-sm-6 custome-list">
                {{ item.list[0].main.pressure }} hPa
              </span>
            </v-list-item-subtitle>
          </v-list-item>
        </v-col>
      </v-row>

      <!-- Chart -->
      <Chart />

      <v-list class="transparent">
        <v-list-item v-for="day in futureWeather" :key="day.dt">
          <v-list-item-title>
            {{ whatDay(new Date(day.dt_txt).getDay()) }}
          </v-list-item-title>

          <v-list-item-avatar width="150">
            <v-img
              :src="`http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png`"
              alt="Sunny image"
            ></v-img>
          </v-list-item-avatar>

          <v-list-item-subtitle class="text-right">
            {{ whatTemp(day.main.temp_min) }}&deg;C /
            {{ whatTemp(day.main.temp_max) }}&deg;C
          </v-list-item-subtitle>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>

      <v-card-actions>
        <v-btn icon @click="goBack">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="removeItem(item.city.id, item.city.name)">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <ConfirmItemModal
      :open="openConfirmItemModal"
      :item="confirmItem"
      @close="openConfirmItemModal = false"
    />
  </v-container>
</template>

<script>
import Chart from "@/components/Chart";
import mixinUtils from "@/mixins/utils";


export default {
  name: "Details",
  components: { Chart },
  mixins: [mixinUtils],
  data() {
    return {
      openConfirmItemModal: false,
      confirmItem: {},
    };
  },
  computed: {
    item() {
      return this.$store.getters.getDetails;
    },
    futureWeather() {
      return this.item.list
        .filter((day) => new Date(day.dt_txt).getDay() !== new Date().getDay())
        .filter((day) => new Date(day.dt_txt).getHours() === 12);
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
    goBack() {
      this.$router.push("/");
    },
  },
  async created() {
    await this.$store.dispatch("detailsById", this.$route.query.id);
  },
};
</script>

<style lang="scss" scoped>
@media screen and (max-width: 400px) {
  .custome-temp {
    font-size: 40px !important;
  }
  .custome-list {
    font-size: 12px !important;
  }
}
.custom-hover {
  transition: 0.3s;
  &:hover {
    text-decoration: none;
  }
}
</style>