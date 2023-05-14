<template>
  <div
    class="item-selector-container"
    :style="getCardsPosition"
  >
    <div
      v-for="(item, index) in resource"
      :key="index"
      class="card-image"
      :style="{ backgroundImage: `url(${item.src})` }"
    />
  </div>
</template>

<script>
  export default {
    name: 'ItemSelector',
    props: {
      resource: {
        type: Array,
        required: true,
      },

      selected_item: {
        type: Number,
        required: true,
      },
    },

    computed: {
      getCardsPosition() {
        return `transform: translateX(${this.selected_item * -248}px)`;
      },
    },
  }
</script>

<style scoped lang=scss>
  .item-selector-container {
    display: flex;
    gap: 29px;
    transition: all .2s;
  }

  .card-image {
    min-width: 219px;
    min-height: 333px;
    background-position: center;
    background-size: cover;
    background-color: rgb(244, 244, 244);
    cursor: pointer;

    border-radius: 8px;
    box-shadow: 4px 6px 10px rgba(0, 0, 0, 0.25);

    transition: all .3s;

    &:hover { transform: scale(1.01); }
  }
</style>