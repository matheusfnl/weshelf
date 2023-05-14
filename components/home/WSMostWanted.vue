<template>
  <div class="gender-filter-margin">
    <div class="title">
      Os livros mais procurados nas nossas estantes!

      <div class="buttons-container">
        <div
          class="next-prev-button"
          :class="{ 'next-prev-disabled' : getPrevButtonIsDisabled }"
          @click="prevItem"
        >
          <img
            :src="nextPrevIcon"
            class="next-prev-icon"
          />
        </div>

        <div
          class="next-prev-button"
          :class="{ 'next-prev-disabled' : getNextButtonIsDisabled }"
          @click="nextItem"
        >
          <img
            :src="nextPrevIcon"
            class="next-prev-icon rotate180"
          />
        </div>
      </div>
    </div>

    <WSItemSelector
      ref="selectorItem"
      :selected_item="selected_item"
      :resource="resource"
    />
  </div>
</template>

<script>
  import { throttle } from 'lodash';

  import livro1 from '../../static/home/mostwanted/livro1.png';
  import livro2 from '../../static/home/mostwanted/livro2.png';
  import livro3 from '../../static/home/mostwanted/livro3.png';
  import livro4 from '../../static/home/mostwanted/livro4.png';
  import livro5 from '../../static/home/mostwanted/livro5.png';

  import nextPrevIcon from '../../static/utils/next-prev-icon.png';

  import WSItemSelector from './WSItemSelector.vue';

  export default {
    name: 'MostWanted',
    components: { WSItemSelector },
    data() {
      return {
        resource: [
          {
            src: livro1,
            search: 'Torto arado',
          },
          {
            src: livro2,
            search: 'Os sete maridos de evelyn hugo',
          },
          {
            src: livro3,
            search: 'Antifrágil: Coisas que se beneficiam com o caos',
          },
          {
            src: livro4,
            search: 'Pachinko',
          },
          {
            src: livro5,
            search: 'Duna',
          },
          {
            src: livro1,
            search: 'Torto arado',
          },
          {
            src: livro2,
            search: 'Os sete maridos de evelyn hugo',
          },
          {
            src: livro3,
            search: 'Antifrágil: Coisas que se beneficiam com o caos',
          },
          {
            src: livro4,
            search: 'Pachinko',
          },
          {
            src: livro5,
            search: 'Duna',
          },
        ],
        selected_item: 0,
        nextPrevIcon,
        child_component: null,
        has_next_page: false,
      };
    },

    computed: {
      getPrevButtonIsDisabled() {
        return ! this.getHasPrevItem;
      },

      getNextButtonIsDisabled() {
        return ! this.getHasNextItem;
      },

      getHasPrevItem() {
        return this.selected_item !== 0;
      },

      getHasNextItem() {
        return ! this.has_next_page;
      },
    },

    watch: {
      selected_item() {
        if (this.child_component) {
          const cardImages = this.child_component.querySelectorAll('.card-image');
          const lastCardImage = cardImages[cardImages.length - 1];

          const observer = new IntersectionObserver(entries => {
            this.has_next_page = entries[0].isIntersecting;
          }, { threshold: 1 });

          observer.observe(lastCardImage);
        }
      },
    },

    mounted() {
      this.child_component = this.$refs.selectorItem.$el;
    },

    methods: {
      nextItem: throttle (function () {
        if (this.getHasNextItem) {
          this.selected_item += 1;
        }
      }, 300),

      prevItem: throttle (function () {
        if (this.getHasPrevItem) {
          this.selected_item -= 1;
        }
      }, 300),
    },
  }
</script>

<style scoped lang="scss">
  .title {
    color: $primary-orange;
    font-weight: bold;
    font-size: 30px;
    line-height: 36px;
    margin-bottom: 30px;
    position: relative;

    .buttons-container {
      position: absolute;
      right: 0;
      top: 0;
      display: flex;
      gap: 20px;

      .next-prev-button {
        width: 29px;
        height: 29px;
        border-radius: 5px;
        background-color: $primary-yellow;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        .next-prev-icon {
          width: 20px;
          height: 20px;
        }
      }

      .next-prev-disabled {
        opacity: .3;
        cursor: default;
      }
    }
  }

  .cards {
    display: flex;
    justify-content: center;
    gap: 18px;
  }

  .rotate180 { transform: rotate(180deg); }
</style>