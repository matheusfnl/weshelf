<template>
  <div class="input-container">
    <label :for="id">
      {{ label }}

      <span v-if="required" class="required-icon">
        *
      </span>
    </label>

    <select
      :id="id"
      placeholder="selecione..."
      @input="$emit('input')"
      @change="$emit('model', $event.target.value)"
      @blur="$emit('blur')"
    >
      <option
        value=""
        :disabled="default_disabled"
        selected
        hidden
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
        required: true,
      },

      default_label: {
        type: String,
        default: '',
      },

      default_disabled: {
        type: Boolean,
        default: true,
      },

      required: {
        type: Boolean,
        default: false,
      },

      options: {
        type: Array,
        required: true,
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
    transition: all .3s;
    padding: 0px .5rem;
    font-size: 12px;
  }

  select:focus {
    border-color: $primary-orange;
    outline: 1px normal #000
  }

  .placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D6D6D6;
    opacity: 1; /* Firefox */
  }
</style>