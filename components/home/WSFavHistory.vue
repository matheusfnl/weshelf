<template>
  <div class="fav-history-margin">
    <div class="title">
      Nossas histórias favoritas
    </div>

    <div class="cards">
      <div
        v-for="(banner, index) in resources"
        :key="index"
        class="banner"
        :style="{ backgroundImage: `url(${banner.image})` }"
      >
        <span class="banner-title">
          {{ banner.title }}
        </span>

        <span class="banner-subtitle">
          {{ banner.subtitle }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'FavHistory',
    props: {
      resources: {
        type: Array,
        required: true,
      },
    },
  }
</script>

<style scoped lang=scss>
  .title {
    color: $primary-orange;
    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    margin-bottom: 30px;
  }

  .cards {
    display: flex;
    justify-content: center;
    gap: 18px;

    .banner {
      flex:1;
      cursor: pointer;
      min-height: 220px;
      min-height: 250px;
      background-size: cover;
      background-position: center;
      border-radius: 10px;
      box-shadow: inset  0px -90px 50px rgba(0, 0, 0, 0.7);

      display: flex;
      flex-direction: column;
      position: relative;
      transition: all .3s;

      &:hover { transform: scale(1.01) }

      .banner {
        &-title {
          color: #FFE2B6;
          position: absolute;
          font-weight: 500;
          font-size: 22px;
          line-height: 27px;
          right: 16px;
          bottom: 35px;
        }

        &-subtitle {
          color: #FFE2B6;
          position: absolute;
          font-weight: 300;
          font-size: 12px;
          line-height: 15px;
          right: 16px;
          bottom: 16px;
        }
      }
    }
  }
</style>