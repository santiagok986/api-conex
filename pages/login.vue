<template>
   <v-container class="pt-5">
    
    
    <!-- <v-row>
      <v-col cols="4" v-for="(color, i) in colors" :key="i">
        <template v-for="(key, j) in color">
          <span :key="j" v-if="j=='title'">{{key}}</span>
          <v-sheet v-else  :key="j" height="20" elevation="1" :color="key" :tile="false" class="mb-1"></v-sheet>
        </template>
      </v-col>
    </v-row> -->
     
    <v-card class="mx-auto mt-5" max-width="500" outlined shaped>
      <v-avatar color="primary">
        <v-icon dark>mdi-account-circle</v-icon>
      </v-avatar>
      <v-card-title>Protheus</v-card-title>
      <v-card-subtitle>Équipe de la formation en ligne</v-card-subtitle>
      <v-container>
        <sing-up-form></sing-up-form>
      </v-container>
    </v-card>
  

    <!-- <v-color-picker class="ma-2" show-swatches swatches-max-height="300px"></v-color-picker> -->
  </v-container>
</template>

<script>
import AddModule from "../components/AddModule";
import SingUpForm from "../components/Forms/SingUpForm"


export default {
  //layout:'login',
  data() {
    return {

    };
  },
  components: {
    AddModule,
    SingUpForm
  },
  computed: {
    colors() {
      return this.$store.getters.load_colors;
    },
    cours(){
      return this.$store.getters.load_cours;
    }
  }
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