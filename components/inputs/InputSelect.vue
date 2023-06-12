<template>
  <div class="input-container">
    <label v-if="label" :for="id">
      {{ label }}

      <span v-if="required" class="required-icon">
        *
      </span>
    </label>

    <select
      :id="id"
      v-model="input_value"
      placeholder="selecione..."
      :class="getColorStyle"
      @input="$emit('input')"
      @change="$emit('model', $event.target.value)"
      @blur="$emit('blur')"
    >
      <option
        v-if="has_default"
        value=""
        :disabled="default_disabled"
        :hidden="default_hidden"
        selected
      >
        <span class="placeholder">
          {{ default_label }}
        </span>
      </option>

      <option
          v-for="option in options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
    </select>

    <span class="validation">
      {{ validations }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'InputSelect',
    props: {
      id: {
        type: String,
        required: true,
      },

      label: {
        type: String,
        default: '',
      },

      default_label: {
        type: String,
        default: '',
      },

      default_disabled: {
        type: Boolean,
        default: true,
      },

      default_hidden: {
        type: Boolean,
        default: true,
      },

      default_value: {
        type: String,
        default: '',
      },

      required: {
        type: Boolean,
        default: false,
      },

      options: {
        type: Array,
        required: true,
      },

      has_default: {
        type: Boolean,
        default: true,
      },

      color: {
        type: String,
        default: '',
      },

      validations: {
        type: String,
        default: '',
      },
    },

    data() {
      return { input_value: '' }
    },

    computed: {
      getColorStyle() {
        if (this.color) {
          if (this.color === 'clean_red') {
            return 'clean_red_input';
          }

          if (this.color === 'transparent') {
            return 'transparent_input';
          }
        }

        return '';
      },
    },

    mounted() {
      setTimeout(() => {
        this.input_value = this.default_value
      }, 40)
    },
  }
</script>

<style scoped lang="scss">
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  }

  label {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    margin-bottom: 9px;
    margin-left: 4px;

    .required-icon { color: $dark-orange; }
  }

  select {
    height: 38px;
    color: $black;
    outline: 0;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    transition: all .1  s;
    padding: 0px .5rem;
    font-size: 12px;
    cursor: pointer;
  }

  select:focus {
    border-color: $primary-orange;
    outline: 1px normal #000
  }

  .validation {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: $clean-red;
  }

  .placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D6D6D6;
    opacity: 1; /* Firefox */
  }

  .transparent_input {
    border-color: transparent !important;
    font-weight: bold;
  }

  .clean_red_input {
    border-color: $clean-red;
    color: $clean-red;
    font-weight: bold;

    &:hover {
      color: $white;
      background-color: $clean-red;
    }

    option {
      color: $black;
      background-color: $white;
    }
  }
</style>