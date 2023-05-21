<template>
  <transition name="header">
    <div
      v-if="shouldShowHeader"
      class="header"
    >
      <div class="d-flex header-max-width">
        <NuxtLink to="/">
          <img
            src="../static/weshelf-logo.png"
            class="logo"
            draggable="false"
          />
        </NuxtLink>

        <div class="header-options">
          <div class="mr-4 d-flex">
            <div
              class="options-icon"
              :class="{ 'upscale-animation' : ! should_show_search_bar }"
              @click="showSearchBar"
            >
              <label v-click-outside="closeSearchBar" class="m-0 position-absolute">
                <transition name="input-field" mode="out-in">
                  <div
                    v-show="should_show_search_bar"
                    class="input-field expand"
                  >
                    <input
                      ref="searchInput"
                      v-model="search_value"
                      type="text"
                      @keyup.enter="searchValue"
                    />
                  </div>
                </transition>

                <img
                  src="../static/header/search-icon.svg"
                  class="search-icon"
                  :class="{'sm-icon' : should_show_search_bar}"
                  @click="searchValueOnClick"
                />
              </label>
            </div>

            <div class="options-icon upscale-animation">
              <img src="../static/header/bag-icon.svg" />
            </div>

            <div class="options-icon upscale-animation">
              <img src="../static/header/user-icon.svg" />
            </div>
          </div>

          <div class="vertical-line" />

          <NuxtLink to="/login">
            <AppButton
              color="white"
              text_color="primary"
              bold
            >
              ENTRAR
            </AppButton>
          </NuxtLink>

          <NuxtLink to="/announce">
            <AppButton bold>
              PUBLICAR
            </AppButton>
          </NuxtLink>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import AppButton from '../components/inputs/AppButton.vue';
  import '../directives/click-outside'

  export default {
    name: 'WSHeader',
    components: { AppButton },
    data() {
      return {
        should_show_search_bar: false,
        search_value: '',
      };
    },

    computed: {
      shouldShowHeader() {
        return ! [
          'login',
          'register',
          'recover',
        ].includes(this.$route.name);
      },
    },

    methods: {
      showSearchBar() {
        if (! this.should_show_search_bar) {
          this.should_show_search_bar = true;

          this.$nextTick(() => {
            this.$refs.searchInput.focus();
          })
        }
      },

      closeSearchBar() {
        if (this.should_show_search_bar) {
          this.should_show_search_bar = false;
        }
      },

      searchValue() {
        this.$router.push({
          path: '/search',
          query: { q: this.search_value },
        })
      },

      searchValueOnClick() {
        if (this.should_show_search_bar) {
          this.$router.push({
            path: '/search',
            query: { q: this.search_value },
          })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .logo {
    width: 156px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
  }

  .header {
    background-color: $light-1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 52px;
    z-index: 1000;

    .header-max-width {
      max-width: 1920px;
      width: 100%;
    }
  }

  .header-options {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;

    div { gap: 8px; }
  }

  .vertical-line {
    width: 1px;
    height: 50px;
    background-color: $light-3;
  }

  .options-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 32px;
      height: 32px;
      transition: all .3s ease;
      filter: invert(78%) sepia(67%) saturate(2843%) hue-rotate(324deg) brightness(100%) contrast(101%);
    }
  }

  .upscale-animation { img { transition: all .3s ease; } }
  .upscale-animation:hover { img { transform: scale(1.1) } }
  .search-icon {
    cursor: pointer;
    &:hover { transform: scale(1); }
  }

  .sm-icon { transform: scale(0.8); }
  .input-field {
    position: absolute;
    right: 0;
    background-color: transparent;
    border: 1px solid $light-3;
    height: 100%;
    border-radius: 10px;
    padding: 0px 32px 0px 0px;

    input {
      border: 0px;
      background-color: transparent;
      height: 100%;
      width: 340px;
      padding-left: 8px;

      &:focus { outline: 0 }
    }
  }

  //Animação do input
  .input-field-enter-active { animation: expand-enter 0.2s ease-out forwards; }
  .input-field-leave-active { animation: expand-leave 0.2s ease-in forwards; }
  @keyframes expand-enter {
    from { width: 0; opacity: 0; }
    to { width: 340px; opacity: 1; }
  }
  @keyframes expand-leave {
    from { width: 340px; opacity: 1; }
    to { width: 0; opacity: 0; }
  }
  .input-field-enter-active input { opacity: 0; }
  .input-field-leave-active input {
    transition: opacity 0.05s ease-in;
    opacity: 0;
  }

  .header-enter-active,
  .header-leave-active { transition: opacity 0.1s; }
  .header-enter,
  .header-leave-to { opacity: 0; }
</style>