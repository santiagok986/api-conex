<template>
  <v-container>
    <h3>
      <v-icon>{{loadedCours.icon}}</v-icon>
      {{loadedCours.code}}
    </h3>
    <p>{{loadedCours.DisciplinaryContent[0].Title}}</p>
    <p>info : {{loadedCours}}</p>

    <v-divider class="my-3"></v-divider>
     <v-btn @click="dialogModule = true">Ajouter Module</v-btn>

           <v-dialog v-model="dialogModule" max-width="690">
          <v-card>
            <v-card-title class="headline">Nouveau module</v-card-title>
            <v-card-text>
              <v-container>
                <add-module :coursid="loadedCours.id" @closeNewModule="dialogModule = $event" />
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
   <v-list>
      <v-list-group
        v-for="mymodule in loadedCours.modules"
        :key="mymodule.id"
        :prepend-icon="mymodule.Icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="mymodule.Title"></v-list-item-title>
          </v-list-item-content>
        </template>

         <v-container>
            {{mymodule.SubTitle}}
         </v-container>
         
        
         
      </v-list-group>
    </v-list>

  </v-container>
</template>

<script>
import AddModule from '../../components/AddModule'

export default {
  components:{
      AddModule
  },
  async asyncData({ $axios, route }) {
    return await $axios
      .$get("http://localhost:1337/cours/" + route.params.id)
      .then(res => {
        return { loadedCours: res };
      })
      .catch(e => console.log(e));
  },
  data(){
      return{
          dialogModule: false,
      }
  }
};
</script>