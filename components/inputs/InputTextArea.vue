<template>
  <div class="input-container">
    <label :for="id">
      {{ label }}

      <span v-if="required" class="required-icon">
        *
      </span>
    </label>

    <textarea
      :id="id"
      :value="value"
      :placeholder="placeholder"
      spellcheck="false"
      :type="type"
      @change="$emit('model', $event.target.value)"
      @blur="$emit('blur')"
      @input="$emit('input')"
    />

    <span class="validation">
      {{ validations }}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'InputTextArea',
    props: {
      id: {
        type: String,
        required: true,
      },

      label: {
        type: String,
        default: '',
      },

      value: {
        type: String,
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

  label {
    font-size: 12px;
    line-height: 15px;
    font-weight: 500;
    margin-bottom: 9px;
    margin-left: 4px;

    .required-icon { color: $dark-orange; }
  }

  textarea {
    height: 96px;
    color: $black;
    outline: 0;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    transition: all .3s;
    padding: .5rem .5rem;
    font-size: 12px;
    resize: none;
  }

  .validation {
    position: absolute;
    right: 0;
    font-size: 12px;
    color: $clean-red;
  }

  textarea:focus {
    border-color: $primary-orange;
    outline: 1px normal #000
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D6D6D6;
    opacity: 1; /* Firefox */
  }
</style>