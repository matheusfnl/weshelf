
<template>
  <div class="register-container">
    <div class="auth-card">
      <div class="logo-container">
        <NuxtLink to="/">
          <img
            src="../../static/weshelf-logo.png"
            class="logo"
            draggable="false"
          />
        </NuxtLink>
      </div>

      <div class="title"> Recupere sua conta </div>
      <InputText
        id="userEmail"
        label="E-mail"
        :value="email"
        :validations="validate?.errors?.first('email')"
        @input="validate.reset('email')"
        @blur="validate.validate('email', email)"
        @model="email = $event"
      />

      <AppButton
        :rounded="false"
        class="mt-4 w-100"
        @click="recoverUser"
      >
        ENVIAR E-MAIL
      </AppButton>
    </div>

    <div class="outside-card">
      <div class="register-message">
        <div class="line" />
        <span> Lembrou seu login? </span>
        <div class="line" />
      </div>

      <NuxtLink to="/login" class="w-100">
        <AppButton
          :rounded="false"
          class="mt-4 w-100"
          color="primary-yellow"
        >
          ENTRAR
        </AppButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  import { Validator } from 'vee-validate';

  import InputText from '../../components/inputs/InputText.vue';
  import AppButton from '../../components/inputs/AppButton.vue';

  export default {
    name: 'AuthPage',
    components: {
      InputText,
      AppButton,
    },

    data() {
      return {
        email: '',
        validate: {},
      }
    },

    head() {
      return {
        bodyAttrs: { class: 'auth' },
      };
    },

    mounted() {
      this.validate = new Validator();
      this.validate.attach({
        name: 'email',
        rules: 'required|email',
        values: { email: this.email },
      });
    },

    methods: {
      async recoverUser() {
        await this.validate.validate('email', this.email);

        if (this.validate?.errors?.items.length === 0) {
          return true;
        }
      },
    },
  }
</script>

<style scoped lang=scss>
  .register-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .auth-card {
    width: 450px;
    max-height: 620px;
    background-color: white;
    border-radius: 20px;
    padding: 45px;

    display: flex;
    align-items: center;
    flex-direction: column;

    .logo-container {
      margin-bottom: 28px;
      .logo { width: 156px; }
    }

    .title {
      font-size: 24px;
      font-weight: 500;
      margin-bottom: 2rem;
    }
  }

  .outside-card {
    width: 450px;
    padding: 28px 45px;

    display: flex;
    align-items: center;
    flex-direction: column;

    .register-message {
      display: flex;
      align-items: center;
      width: 100%;

      span {
        color: #808080;
        font-size: 10px;
        white-space: nowrap;
        padding: 0 8px;
      }

      .line {
        height: 1px;
        background-color: #808080;
        flex-grow: 1;

      }
    }
  }
</style>