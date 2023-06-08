<template>
  <div>
    <WSHeader />

    <div class="app">
      <div class="max-width">
        <Nuxt />
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    mounted() {
      const user = JSON.parse(localStorage.getItem('sb-ybhmnejynxteqinaedha-auth-token'));

      this.setUser(user);
    },

    methods: {
      ...mapActions(['setUser']),
    },
  }
</script>
<style scoped lang=scss>
  .app {
    display: flex;
    justify-content: center;

    .max-width {
      max-width: 1920px;
      width: 100%;
    }
  }
</style>