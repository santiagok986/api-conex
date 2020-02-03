<template>
  <v-container>
    my Index
  </v-container>
</template>

<script>
import AddModule from "../components/AddModule";

export default {
  components: {
    AddModule
  },
  // async asyncData({ $axios }) {
  //   const ip = await $axios
  //     .$get("http://localhost:1337/modules")
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(e => console.log(e));

  //   return { ip };
  // }
};
</script>