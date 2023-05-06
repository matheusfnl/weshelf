<template>
  <div class="header">
    <img
      src="../static/weshelf-logo.png"
      class="logo"
    />

    <div class="header-options">
      <div class="vertical-line" />

      <AppButton
        color="white"
        text_color="primary"
        bold
      >
        ENTRAR
      </AppButton>

      <AppButton bold>
        PUBLICAR
      </AppButton>
    </div>
  </div>
</template>

<script>
  import AppButton from '../components/inputs/AppButton.vue';

  export default {
    name: 'WSHeader',
    components: { AppButton },
  }
</script>

<style scoped lang="scss">
  .logo {
    width: 156px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .header {
    background-color: $light-1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    height: 120px;
    display: flex;
    align-items: center;
    padding: 0px 52px;
  }

  .header-options {
    width: 100%;
    display: flex;
    justify-content: end;
    gap: 5px;
  }

  .vertical-line {
    width: 1px;
    height: 50px;
    background-color: $light-2;
  }
</style>