<template>
  <button
    ref="button"
    class="btn-custom"
    :class="[
      getBtnTextColor,
      getBtnColor,
      getBtnShape,
      getBtnWeight,
      { 'disabled-button' : getBtnDisabled },
    ]"
    :disabled="getBtnDisabled"
    @click="$emit('click', $event)"
  >
    <span v-if="! request_pending">
      <slot />
    </span>

    <span v-else class="centralize-loader">
      <ClipLoader size="12px" color="#FFFFFF" />
    </span>
  </button>
</template>

<script>
  import ClipLoader from 'vue-spinner/src/ClipLoader.vue';

  export default {
    name: 'AppButton',
    components: { ClipLoader },
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },

      text_color: {
        type: String,
        default: 'white',
      },

      color: {
        type: String,
        default: 'primary',
      },

      border_color: {
        type: String,
        default: '',
      },

      rounded: {
        type: Boolean,
        default: true,
      },

      bold: {
        type: Boolean,
        default: false,
      },

      request_pending: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      getBtnDisabled() {
        return this.disabled || this.request_pending;
      },

      getBtnWeight() {
        if (this.bold) {
          return 'btn-bold'
        }

        return '';
      },

      getBtnTextColor() {
        if (this.color === 'primary') {
          return 'btn-primary';
        }

        if (this.color === 'primary-yellow') {
          return 'btn-primary-yellow';
        }

        if (this.color === 'white') {
          return 'btn-white';
        }

        if (this.color === 'orange') {
          return 'btn-orange';
        }

        return '';
      },

      getBtnColor() {
        if (this.text_color === 'white') {
          return 'btn-text-white';
        }

        if (this.text_color === 'primary-yellow') {
          return 'btn-text-primary-yellow';
        }

        if (this.text_color === 'primary') {
          return 'btn-text-primary';
        }

        if (this.text_color === 'orange') {
          return 'btn-text-orange';
        }

        return '';
      },

      getBtnShape() {
        if (this.rounded) {
          return 'btn-rounded'
        }

        return ''
      },
    },

    mounted() {
      const button = this.$refs.button;
      const {
        width,
        height,
      } = button.getBoundingClientRect();

      button.style.minWidth = `${width}px`;
      button.style.minHeight = `${height}px`;
    },

  }
</script>

<style scoped lang="scss">
  .btn-custom {
    width: 140px;
    height: 45px;
    border-radius: 15px;
    border: 0px;
    transition: all .3s;
  }

  .btn-rounded { border-radius: 30px; }
  .btn-bold { font-weight: bold; }

  .btn {
    // Primary
    &-primary {
      background-color: $primary-orange;
      &:hover { background: darken($primary-orange, 5%) }
      &:focus { box-shadow: 0 0 0 0.2rem rgba($primary-orange, 0.5); }
      &:active {
        background-color: $primary-orange !important;
        &:focus { box-shadow: 0 0 0 0.2rem rgba($primary-orange, 0.5) !important; }
      }
      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba($primary-orange, 0.5);
      }
    }

    &-orange {
      background-color: $orange;
      &:hover { background: darken($orange, 5%) }
      &:focus { box-shadow: 0 0 0 0.2rem rgba($orange, 0.5); }
      &:active {
        background-color: $orange !important;
        &:focus { box-shadow: 0 0 0 0.2rem rgba($orange, 0.5) !important; }
      }
      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba($orange, 0.5);
      }
    }

    // White
    &-white {
      background-color: $white;
      &:hover { background: $white; }
      &:focus { box-shadow: 0 0 0 0.2rem rgba($light-grey, 0.05); }
      &:active {
        background-color: darken($white, 2%) !important;
        &:focus { box-shadow: 0 0 0 0.2rem rgba($light-grey, 0.05) !important; }
      }
      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba($light-grey, 0.1);
      }
    }

    &-primary-yellow {
      background-color: $primary-yellow;
      &:hover { background: darken($primary-yellow, 5%) }
      &:focus { box-shadow: 0 0 0 0.2rem rgba($primary-yellow, 0.5); }
      &:active {
        background-color: $primary-yellow !important;
        &:focus { box-shadow: 0 0 0 0.2rem rgba($primary-yellow, 0.5) !important; }
      }
      &:focus-visible {
        outline: 0;
        box-shadow: 0 0 0 0.2rem rgba($primary-yellow, 0.5);
      }
    }

    &-text {
      // White
      &-white { color: $light-1; }
      // Primary
      &-primary { color: $primary-orange; }
      &-primary-yellow { color: $primary-yellow; }
      &-orange { color: $orange; }
    }
  }

  .centralize-loader {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 100%;
  }

  .disabled-button { opacity: .5 }
</style>