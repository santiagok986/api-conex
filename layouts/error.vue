<template>
  <v-app dark>

    <h1>
      {{error.message}}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
