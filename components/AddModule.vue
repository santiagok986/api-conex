<template>
  <div>
    <v-form>
      <!-- <v-text-field v-model="projectInfo.isbn" label="ISBN" required outlined></v-text-field> -->
      <v-text-field v-model="newModule.Title" label="Titre" required outlined></v-text-field>
      <v-text-field v-model="newModule.IdModule" label="Id Module" required outlined></v-text-field>
      <v-text-field v-model="newModule.SubTitle" label="Soustitre" required outlined></v-text-field>
      <v-text-field v-model="newModule.Icon" label="Icône" required outlined></v-text-field>
      <v-text-field v-model="newModule.Color" label="Color" required outlined></v-text-field>
      <v-text-field v-model="newModule.Version" label="Version" required outlined></v-text-field>
      <v-switch v-model="newModule.Active" label="Actif"></v-switch>
      <v-btn @click="onSubmitted">send data</v-btn>
    </v-form>
    {{cours}}
    <!-- 
    <v-text-field v-model="projectInfo.isbn" label="ISBN" required outlined></v-text-field>
      <v-text-field v-model="projectInfo.name" label="Name" required outlined></v-text-field>
      <v-row align="center">
        <v-col class="d-flex" cols="12" sm="6">
          <v-select
            v-model="projectInfo.custumer"
            :items="custumers"
            label="Custumer"
            outlined
            hide-details
            single-line
            class="mb-3"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="6">
          <v-btn @click="dialog= true" class="mb-3" fab>
            <v-icon dark>mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-dialog v-model="dialog" max-width="690">
          <v-card>
            <v-card-title class="headline">New custumer</v-card-title>
            <v-card-text>
              
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
      <v-divider></v-divider>
      <v-textarea
        outlined
        v-model="projectInfo.description"
        name="description"
        label="Project description"
      ></v-textarea>

      <v-select
        v-model="projectInfo.team"
        :items="team"
        label="Team"
        outlined
        hide-details
        single-line
        class="mb-3"
      ></v-select>

      
      <v-btn @click="onSubmitted">send data</v-btn>
      <div>
        <p>{{projectInfo.name}}</p>
        <p>{{projectInfo.isbn}}</p>
        <p>{{projectInfo.custumer}}</p>
        <p>{{projectInfo.team}}</p>
        <p>{{projectInfo.dates.start}}</p>
        <p>{{projectInfo.dates.end}}</p>
        <p>{{projectInfo.description}}</p>
    </div>-->
  </div>
</template>

<script>
//  :rules="[rules.required, rules.min]"

export default {
   props:{
      coursid:{
          type:Number,
          default:null
      }
  }, 
  data() {
    return {
      newModule: {
        Title: "",
        Id: "",
        SubTitle: "",
        Icon: "mdi-ballot",
        Color: "",
        Version: "",
        Active: true,
        Comments: [],
        "cour": {
          id: 1
        }
      }
    };
  },
  methods: {
    onSubmitted() {
      this.newModule.cour.id = this.coursid
      this.$store.dispatch('addModule', this.newModule)
      .then(()=>{this.$emit("closeNewModule", false);})

    }
  },
  computed:{
      cours(){
          return this.$store.getters.load_cours;
      },
  }
};
</script>
