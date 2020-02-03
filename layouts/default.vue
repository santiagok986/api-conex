<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app
    >
      <v-list> 
        <v-list-item
          v-for="(cour, i) in cours"
          :key="i"
          :to="`/cours/`+cour.id"
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
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    
   
  
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-btn
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  
    <v-footer
      :fixed="fixed"
      app
    >
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/'
        }
      ],
      miniVariant: false,
      title: 'Snfas-cours'
    }
  },
  computed:{
    cours(){
      return this.$store.getters.LOAD_COURS;
    }
  }
}
</script>
