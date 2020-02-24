<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list>
        <v-list-item v-for="(cour, i) in cours" :key="i" :to="`/cours/cour/`+cour.id" router exact>
          <v-list-item-action>
            <v-icon v-if="cour.Icon != null">{{cour.Icon}}</v-icon>
            <v-icon v-else>mdi-school</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="cour.Code" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />

      <v-toolbar-title v-text="title" />
      <v-spacer />
      <!-- <div v-if="$auth.loggedIn">
        <p>{{$auth.user.username}}</p>
        <v-btn text @click="$auth.logout()">logout</v-btn>
      </div>
      <div v-else>
        <v-btn text to="/">login</v-btn>
      </div> -->
    
        
      <v-menu  v-model="menuusager" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="42" color="primary">
              <span class="white--text headline">{{$auth.user.username[0]}}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="42" color="primary">
                  <span class="white--text headline">{{$auth.user.username[0]}}</span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{$auth.user.username}}</v-list-item-title>
                <v-list-item-subtitle>{{$auth.user.email}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action></v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="menuusager = false">Cancel</v-btn>
            <v-btn text @click="logoutBtn()">logout</v-btn>
          </v-card-actions>
        </v-card>
      </v-menu>
     
  


    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
 // middleware: ["check-auth", "auth"],
 middleware:'auth',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      menuusager: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        }
      ],
      miniVariant: false,
      title: "Snfas-cours"
    };
  },
  computed: {
    cours() {
      return this.$store.getters.load_cours;
    },
    userInfo() {
      return this.$store.getters.user_info;
    }
  },
  methods:{
    logoutBtn(){
        this.$auth.logout()
        this.$apolloHelpers.onLogout()
    }
  }
};

/*à
query courses{
  courses{
   code,
    icon,
    id,
    DisciplinaryContent{Title}
    modules{
      Title
      id
      Icon
      IdModule
      SubTitle
    }
  }
}

*/
</script>
