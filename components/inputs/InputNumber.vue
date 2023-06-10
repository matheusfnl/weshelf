<template>
  <div class="input-container">
    <label :for="id">
      {{ label }}

      <span v-if="required" class="required-icon">
        *
      </span>
    </label>

    <div class="input-area">
      <input
        :id="id"
        :value="value"
        :placeholder="placeholder"
        spellcheck="false"
        type="number"
        min="0"
        :disabled="disabled"
        @change="$emit('model', $event.target.value)"
        @blur="$emit('blur')"
        @input="$emit('input')"
      />

      <div class="input-label">
        R$
        <span>|</span>
      </div>
    </div>

    <span class="validation">
      {{ validations }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'InputNumber',
    props: {
      id: {
        type: String,
        required: true,
      },

      label: {
        type: String,
        required: true,
      },

      value: {
        type: Number,
        required: true,
      },

      placeholder: {
        type: String,
        default: '',
      },

      type: {
        type: String,
        default: 'text',
      },

      required: {
        type: Boolean,
        default: false,
      },

      validations: {
        type: String,
        default: '',
      },

      disabled: {
        type: Boolean,
        default: false,
      },
    },
  }
</script>

<style scoped lang="scss">
  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 1rem;
    position: relative;
  }

  .input-area {
    position: relative;
    width: 100%;

    .input-label {
      position: absolute;
      transform: translateY(-8px);
      top: 50%;
      left: 8px;
      font-size: 12px;

      span {
        color: #DDDDDD;
      }
    }
  }

  label {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    margin-bottom: 9px;
    margin-left: 4px;

    .required-icon { color: $dark-orange; }
  }

  .validation {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: $clean-red;
  }

  input {
    height: 38px;
    color: $black;
    outline: 0;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    transition: all .3s;
    font-size: 12px;
    width: 100%;
    padding-left: 36px;
  }

  input:focus {
    border-color: $primary-orange;
    outline: 1px normal #000
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D6D6D6;
    opacity: 1; /* Firefox */
  }
</style>