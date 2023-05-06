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