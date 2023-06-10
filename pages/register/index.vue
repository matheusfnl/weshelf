
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

      <InputText
        id="userConfirmPassword"
        label="Confirme a senha"
        type="password"
        :value="password_confirmation"
        :validations="validate?.errors?.first('password confirmation')"
        @input="validate.reset('password confirmation')"
        @blur="validate.validate('password confirmation', password_confirmation)"
        @model="password_confirmation = $event"
      />

      <InputText
        id="userName"
        label="Nome do usuário"
        :value="name"
        :validations="validate?.errors?.first('user name')"
        @input="validate.reset('user name')"
        @blur="validate.validate('user name', name)"
        @model="name = $event"
      />

      <InputText
        id="userArroba"
        label="Usuário"
        :value="arroba"
        :validations="validate?.errors?.first('at sign')"
        @input="validate.reset('at sign')"
        @blur="validate.validate('at sign', arroba)"
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
        password_confirmation: '',
        name: '',
        arroba: '',
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

      this.validate.attach({
        name: 'password',
        rules: 'required',
        values: { password: this.password },
      });

      this.validate.attach({
        name: 'password confirmation',
        rules: 'required',
        values: { password_confirmation: this.password_confirmation },
      });

      this.validate.attach({
        name: 'user name',
        rules: 'required',
        values: { name: this.name },
      });

      this.validate.attach({
        name: 'at sign',
        rules: 'required',
        values: { arroba: this.arroba },
      });
    },

    methods: {
      ...mapActions(['registerUser']),
      async registerNewUser() {
        await this.validate.validate('email', this.email);
        await this.validate.validate('password', this.password);
        await this.validate.validate('password confirmation', this.password_confirmation);
        await this.validate.validate('user name', this.name);
        await this.validate.validate('at sign', this.arroba);

        if (this.validate?.errors?.items.length === 0) {
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