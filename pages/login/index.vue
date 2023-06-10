
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
        :validations="validate?.errors?.first('email')"
        @input="validate.reset('email')"
        @blur="validate.validate('email', email)"
        @model="email = $event"
      />

      <InputText
        id="userPassword"
        label="Senha"
        type="password"
        :value="password"
        :validations="validate?.errors?.first('password')"
        @input="validate.reset('password')"
        @blur="validate.validate('password', password)"
        @model="password = $event"
      />

      <AppButton
        :rounded="false"
        class="mt-4 w-100"
        :request_pending="request_pending"
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
        <span>Novo por aqui? </span>
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
        password: '',
        validate: {},
        request_pending: false,
      };
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

      this.validate.attach({
        name: 'password',
        rules: 'required',
        values: { password: this.password },
      });
    },

    methods: {
      ...mapActions(['loginUser']),
      async loginUserData() {
        await this.validate.validate('email', this.email);
        await this.validate.validate('password', this.password);

        if (this.validate?.errors?.items.length === 0) {
          this.request_pending = true;

          const error = await this.loginUser({
            email: this.email,
            password: this.password,
          });

          if (! error) {
            this.$router.push({ path: '/' })
          }

          this.request_pending = false;
        }
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