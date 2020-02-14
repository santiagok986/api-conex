<template>
  <v-container>
   
      <v-list> 
        <v-list-item
          v-for="(cour, i) in cours"
          :key="i"
          :to="`/cours/cour/`+cour.id"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ cour.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="cour.code" />
           
          </v-list-item-content>
          
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <div v-for="cour in cours" :key="cour.id">
          <p class="mb-0" v-for="(value, key) in cour" :key="key">{{key}}:{{value}} </p>
          <v-divider></v-divider>
      </div>
      

  </v-container>
</template>

<script>
export default {
  asyncData({context,store}) {
    return store.dispatch('getData')
    .then(()=> console.log('fire!!'))
  },
  computed: {
    cours() {
      return this.$store.getters.load_cours;
    }
  }
};
</script>