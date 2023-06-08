
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

      <div class="title"> Crie a sua conta </div>
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

      <InputText
        id="userConfirmPassword"
        label="Confirme a senha"
        type="password"
        :value="password_confirmation"
        @model="password_confirmation = $event"
      />

      <InputText
        id="userName"
        label="Nome do usuário"
        :value="name"
        @model="name = $event"
      />

      <InputText
        id="userArroba"
        label="Usuário"
        :value="arroba"
        @model="arroba = $event"
      />

      <AppButton
        :rounded="false"
        class="mt-4 w-100"
        @click="registerNewUser"
      >
        CADASTRAR
      </AppButton>
    </div>

    <div class="outside-card">
      <div class="register-message">
        <div class="line" />
        <span> Já possui uma conta? </span>
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
        password_confirmation: '',
        name: '',
        arroba: '',
      }
    },

    head() {
      return {
        bodyAttrs: { class: 'auth' },
      };
    },

    methods: {
      ...mapActions(['registerUser']),
      async registerNewUser() {
        if (this.password === this.password_confirmation) {
          const error = await this.registerUser({
            email: this.email,
            password: this.password,
            name: this.name,
            arroba: this.arroba,
          })

          if (!error) {
            this.$router.push({ path: '/' })
          }
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