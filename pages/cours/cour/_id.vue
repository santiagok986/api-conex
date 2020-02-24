<template>
  <v-container>
    le: {{infoCours}}
    <h3>
      <v-icon>{{infoCours.Icon}}</v-icon>
      {{infoCours.Identity}}
    </h3>
    <!-- <p>{{infoCours.DisciplinaryContent[0].Title}}</p> -->

    <v-divider class="my-3"></v-divider>
    <v-btn @click="dialogModule = true">Ajouter Module</v-btn>

    <v-dialog v-model="dialogModule" max-width="690">
      <v-card>
        <v-card-title class="headline">Nouveau module</v-card-title>
        <v-card-text>
          <v-container>
            <add-module :coursid="infoCours.id" @closeNewModule="loadNewModule($event)" />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-card v-if="infoCours.modules.length != 0" class="mx-auto my-3">
      <v-list>
        <v-list-group
          v-for="mymodule in infoCours.modules"
          :key="mymodule.id"
          :prepend-icon="mymodule.Icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="mymodule.Identity"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-container>
            {{mymodule.SubTitle}}
            {{mymodule.task}}
          </v-container>
        </v-list-group>
      </v-list>
    </v-card>
  </v-container>
</template>

<script>
import AddModule from "../../../components/Forms/AddModule";

export default {
  asyncData({ context, store, app }) {
    return store.dispatch("getData").then(() => console.log("fire!!"));
  },
  components: {
    AddModule
  },
  async fetch({ store, route, error }) {
    console.log("id from _id ", route.params.id);
    await store.dispatch("getDataCour", route.params.id);
  },
  data() {
    return {
      dialogModule: false
    };
  },
  computed: {
    infoCours() {
      return this.$store.getters.load_cour;
    },
    cours() {
      return this.$store.getters.load_cours;
    }
  },
  methods: {
    loadNewModule(event) {
      this.dialogModule = event;
      this.$store.dispatch("getDataCour", this.$route.params.id);
      console.log("load new module ", this.$route.params.id);
    }
  }
};
</script>