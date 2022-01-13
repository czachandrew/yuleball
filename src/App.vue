<template>
  <div :class="leaderBgClass">
    <ToastManager />
    <NavBar />
    <div class="container">
      <router-view />
    </div>
  </div>
</template>
<script lang="ts" setup>
import NavBar from "@/components/NavBar.vue";
import ToastManager from "@/components/toast/ToastManager.vue";
import Pusher from "pusher-js";
import { ref, computed } from "vue";
import { useHousecup } from "@/store/housecup";

Pusher.logToConsole = true;

const pusher = new Pusher("826e6461d4ededca1c3a", {
  cluster: "mt1",
});

const channel = pusher.subscribe("house-points");
channel.bind("add", (data: any) => {
  console.log(data);
  cup.managePointIncrease({
    house: data.house_data.name.toLowerCase(),
    points: data.amount,
    from: data.user,
  });
});

const cup = useHousecup();

// const leaderBgClass = ref("hufflepuff");

const leaderBgClass = computed(() => {
  let value = "gryfindor h-screen";
  switch (cup.leader.friendly_name) {
    case "Gryfindor":
      value = "gryfindor h-screen";
      break;
    case "Slytherin":
      value = "slytherin h-screen";
      break;
    case "Ravenclaw":
      value = "ravenclaw h-screen";
      break;
    default:
      value = "hufflepuff h-screen";
      break;
  }
  return value;
});
</script>

<style>
.ravenclaw {
  background-image: url("./assets/ravenclaw-hogwarts-house.jpeg");
}

.gryfindor {
  background-image: url("./assets/gryfindor-hogwarts-house.jpeg");
}

.slytherin {
  background-image: url("./assets/slytherin-hogwarts-house.jpeg");
}
.hufflepuff {
  background-image: url("./assets/hufflepuff-hogwarts-house.jpeg");
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
