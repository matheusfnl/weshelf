<template>
  <button
    class="btn-custom"
    :class="[
      getBtnTextColor,
      getBtnColor,
      getBtnShape,
      getBtnWeight,
    ]"
    :disabled="getBtnDisabled"
    @click="$emit('click', $event)"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script>
  export default {
    name: 'AppButton',
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

      rounded: {
        type: Boolean,
        default: true,
      },

      bold: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      getBtnDisabled() {
        return this.disabled;
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

        if (this.color === 'white') {
          return 'btn-white';
        }

        return '';
      },

      getBtnColor() {
        if (this.text_color === 'white') {
          return 'btn-text-white';
        }

        if (this.text_color === 'primary') {
          return 'btn-text-primary';
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

    &-text {
      // White
      &-white { color: $light-1; }
      // Primary
      &-primary { color: $primary-orange; }
    }
  }
</style>