<template>
  <v-container>
    <h3>
      <v-icon>{{infoCours.icon}}</v-icon>
      {{infoCours.code}}
    </h3>
    <p>{{infoCours.DisciplinaryContent[0].Title}}</p>
 

    <v-divider class="my-3"></v-divider>
    <v-btn @click="dialogModule = true">Ajouter Module</v-btn>

    <v-dialog v-model="dialogModule" max-width="690">
      <v-card>
        <v-card-title class="headline">Nouveau module</v-card-title>
        <v-card-text>
          <v-container>
            <add-module :coursid="infoCours.id" @closeNewModule="dialogModule = $event" />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-list>
      <v-list-group
        v-for="mymodule in infoCours.modules"
        :key="mymodule.id"
        :prepend-icon="mymodule.Icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="mymodule.Title"></v-list-item-title>
          </v-list-item-content>
        </template>

        <v-container>{{mymodule.SubTitle}}</v-container>
      </v-list-group>
    </v-list>

    <p>info : {{infoCours}}</p>
  </v-container>
</template>

<script>
import AddModule from "../../../components/AddModule";

export default {
  components: {
    AddModule
  },
  computed: {
    infoCours() {
      return this.$store.getters.load_cour;
    }
  },
  async fetch({store, route, error }) {
    await store.dispatch("getDataCour", {route, error});

    // app.$axios.$get("cours/" + route.params.id, {
    //     headers: {
    //       Authorization: app.$auth.getToken("local")
    //     }
    //   })
    //   .then(res => {
    //     console.log('rest')
    //   }).catch((e) => {
    //     error({ statusCode: 404, message: 'Post not found' })
    //   })


  },
  data() {
    return {
      dialogModule: false
    };
  },
  mounted() {
    console.log("cours details");
  }
};
</script>