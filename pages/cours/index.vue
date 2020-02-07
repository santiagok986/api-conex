<template>
  <v-container>
    your are logged!!
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
  </v-container>
</template>

<script>
export default {
  computed: {
    cours() {
      return this.$store.getters.load_cours;
    }
  }
};
</script>