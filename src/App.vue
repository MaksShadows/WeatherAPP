<template>
  <v-app>
    <Header />

    <div class="background">
      <transition name="slither">
        <router-view></router-view>
      </transition>
    </div>

  </v-app>
</template>

<script>
import Header from "@/components/Header";

export default {
  name: "App",
  components: { Header,  },

};
</script>

<style lang="scss">
.background {
  background: cadetblue;
  min-height: 100%;
}
.slither-enter-active,
.slither-leave-active {
  transition: 0.5s;
}

.slither-enter,
.slither-leave-to {
  transform: translateY(100px);
  opacity: 0;
}

.slither-enter-to,
.slither-leave {
  transform: translateY(0);
}
</style>