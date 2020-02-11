<template>
  <div id="signup">
    <v-form @submit.prevent="onSubmit">
      <v-text-field dense v-model="username" label="Nom usager" required outlined></v-text-field>
      <v-text-field dense v-if="!isLogin" v-model="email" label="Email" required outlined></v-text-field>
      <v-text-field
        dense
        v-model="password"
        outlined
        :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show1 ? 'text' : 'password'"
        name="input-10-1"
        label="Mot de passe"
        hint="At least 6 characters"
        counter
        @click:append="show1 = !show1"
      ></v-text-field>
      <v-text-field
        dense
        v-if="!isLogin"
        v-model="confirmPassword"
        outlined
        :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
        :rules="[rules.required, rules.min]"
        :type="show2 ? 'text' : 'password'"
        name="input-10-1"
        label="Vérifier le mot de passe"
        hint="At least 6 characters"
        counter
        @click:append="show2 = !show2"
      ></v-text-field>
      <v-btn small color="primary" type="submit">{{ isLogin ? "Connexion" : "Créer un compte" }}</v-btn>
      <v-btn
        small
        color="primary"
        @click="isLogin = !isLogin"
      >Aller à {{ isLogin ? "S'inscrire" : "Se connecter" }}</v-btn>
    </v-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show1: false,
      show2: false,
      username: "santy",
      email: "santy@super.ca",
      password: "demo1234",
      confirmPassword: "",
      isLogin: true,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 6 || "Min 6 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    onSubmit() {
      this.$store.dispatch("loginUser", {
        username: this.username,
        password: this.password
      });
    }
  }
};
</script>

