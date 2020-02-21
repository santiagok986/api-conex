<template>
  <v-container>
    <ApolloQuery :query="require('../../graphql/querys/cours.gql')">
        <template slot-scope="{result : {loading, error, data}}">
          <div v-if="error">{{error}}</div>
          <div v-if="loading">Cargando..</div>
          <div>{{data}}</div>
        </template>
      </ApolloQuery>
    <v-divider></v-divider>
    {{me}}
    {{modules}}
    <v-divider />

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
    <v-divider></v-divider>
    <div v-for="cour in cours" :key="cour.id">
      <p class="mb-0" v-for="(value, key) in cour" :key="key">{{key}}:{{value}}</p>
      <v-divider></v-divider>
      <v-btn @click="callApollo()">call!</v-btn>
    </div>
     <ApolloMutation
        :mutation="require('../../graphql/mutations/createCours.gql')" :variables="{code}">
        <template v-slot="{ mutate, loading, error }">
          <button :disabled="loading" @click="mutate()">Click me</button>
          <p v-if="error">An error occurred: {{ error }}</p>
        </template>
      </ApolloMutation>
  </v-container>
</template>

<script>
import gql from "graphql-tag";

export default {
  data() {
    return {
      token: null,
      modules: null,
      me:null,
      code:"ahora si"
    };
  },
  asyncData({ context, store, app }) {
    return store.dispatch("getData").then(() => console.log("fire!!"));
  },
  computed: {
    cours() {
      return this.$store.getters.load_cours;
    }
  },
  methods: {
    callApollo() {
      this.$apollo
        .query({
          query: require("../../graphql/querys/cours.gql")
        })
        .then(response => {
          console.log(response);
        })
        .catch(e => console.log('el error es ',  e));
    }
  },
  apollo: {
    me: gql`
      query {
        me {
          username
        }
      }
    `
  },
  mounted() {
    this.token = this.$auth.getToken("local");
    console.log(this.$apollo.provider.defaultClient)
     console.log('token ', this.$apolloHelpers.getToken())
  }
};
</script>