<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="$vuetify.breakpoint.lgAndUp" app>
      <v-list>
        <v-list-item v-for="(cour, i) in cours" :key="i" :to="`/cours/cour/`+cour.id" router exact>
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

      <v-menu v-model="usermenu" :close-on-content-click="false" :nudge-width="200" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-avatar size="42" color="primary">
              <span class="white--text headline">{{userInfo.username[0]}}</span>
            </v-avatar>
          </v-btn>
        </template>

        <v-card>
          <v-list>
            <v-list-item>
              <v-list-item-avatar>
                <v-avatar size="42" color="primary">
                  <span class="white--text headline">{{userInfo.username[0]}}</span>
                </v-avatar>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title>{{userInfo.username}}</v-list-item-title>
                <v-list-item-subtitle>{{userInfo.email}}</v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action></v-list-item-action>
            </v-list-item>
          </v-list>

          <v-divider></v-divider>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn text @click="usermenu = false">Cancel</v-btn>
            <v-btn color="primary" text @click="usermenu = false">Save</v-btn>
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
  middleware: ["check-auth", "auth"],
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      usermenu: false,
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
  }
};
</script>
