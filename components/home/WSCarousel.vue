<template>
  <div class="carousel">
    <div
      class="carousel-images"
      :style="{ transform: `translateX(-${current_index * 100}%)` }"
    >
      <div
        v-for="(resource, index) in resources"
        :key="index"
        class="carousel-image"
      >
        <div
          :style="{ backgroundImage: `url(${resource.src})` }"
          alt="carousel image"
        />
      </div>
    </div>

    <div class="carousel-buttons">
      <button
        class="carousel-button carousel-button-prev"
        @click="prev"
      />

      <button
        class="carousel-button carousel-button-next"
        @click="next"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'WSCarousel',
    props: {
      resources: {
        type: Array,
        required: true,
      },
    },

    data() {
      return {
        current_index: 0,
        interval_id: null,
      };
    },

    mounted() {
      this.startInterval();
    },

    beforeDestroy() {
      this.clearInterval();
    },

    methods: {
      prev() {
        this.current_index = (this.current_index + this.resources.length - 1) % this.resources.length;
      },

      next() {
        this.current_index = (this.current_index + 1) % this.resources.length;
      },

      startInterval() {
        this.interval_id = setInterval(() => {
          this.current_index = (this.current_index + 1) % this.resources.length;
        }, 5000);
      },

      clearInterval() {
        clearInterval(this.interval_id);
      },
    },
  };
</script>

<style lang="scss">
  .carousel {
    position: relative;
    overflow: hidden;
    text-align: center;
    height: 245px;

    .carousel-images {
      display: flex;
      transition: transform 0.3s ease-out;

      .carousel-image { flex: 0 0 100%; }
      div {
        height: 245px;
        background-size: cover;
        background-position: bottom;
      }
    }

    .carousel-buttons {
      position: absolute;
      bottom: 10px;
      left: 0;
      right: 0;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);

      .carousel-button {
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        border: none;
        background: transparent;
        cursor: pointer;
        color: #ffffff;
        transition: opacity 0.3s ease-out;

        &:hover { opacity: 0.8; }
      }

      .carousel-button-prev {
        left: 10px;

        &:before {
          content: "<";
          font-size: 24px;
          -webkit-filter: drop-shadow(0px 0px 5px #222);
          filter: drop-shadow(0px 0px 5px #222);
        }
      }

      .carousel-button-next {
        right: 10px;

        &:before {
          content: ">";
          font-size: 24px;
          -webkit-filter: drop-shadow(0px 0px 5px #222);
          filter: drop-shadow(0px 0px 5px #222);
        }
      }
    }
  }
</style>