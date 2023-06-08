
<template>
  <div class="login-container">
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

      <div class="title"> Acesse a sua conta </div>
      <InputText
        id="userEmail"
        label="E-mail"
        :value="email"
        @model="email = $event"
      />

      <InputText
        id="userPassword"
        label="Senha"
        type="password"
        :value="password"
        @model="password = $event"
      />

      <AppButton
        :rounded="false"
        class="mt-4 w-100"
        @click="loginUserData"
      >
        ENTRAR
      </AppButton>

      <NuxtLink to="/recover" class="nuxt-forgot-password">
        <div class="forgot-password">
          Esqueceu sua senha?
        </div>
      </NuxtLink>
    </div>

    <div class="outside-card">
      <div class="register-message">
        <div class="line" />
        <span> Novo por aqui? </span>
        <div class="line" />
      </div>

      <NuxtLink to="/register" class="w-100">
        <AppButton
          :rounded="false"
          class="mt-4 w-100"
          color="primary-yellow"
        >
          CADASTRE-SE
        </AppButton>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex';

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
        password: '',
      }
    },

    head() {
      return {
        bodyAttrs: { class: 'auth' },
      };
    },

    methods: {
      ...mapActions(['loginUser']),
      async loginUserData() {
        await this.loginUser({
          email: this.email,
          password: this.password,
        });
      },
    },
  }
</script>

<style scoped lang=scss>
  .login-container {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .auth-card {
    width: 450px;
    height: 520px;
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

    .nuxt-forgot-password {
      outline: 0;
      border: 0;
      text-decoration: none;
    }

    .forgot-password {
      margin-top: 1.5rem;
      font-size: 12px;
      line-height: 15px;
      font-weight: 500;
      color: $grey;
      border-bottom: 2px solid $lighter-grey;
      cursor: pointer;
      transition: all .2s;

      &:hover {
        color: $primary-orange;
        border-bottom: 2px solid rgba($primary-orange, 0.5);
      }
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