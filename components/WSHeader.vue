<template>
  <transition name="header">
    <div
      v-if="shouldShowHeader"
      class="header"
    >
      <div class="d-flex header-max-width">
        <NuxtLink to="/">
          <img
            src="../static/weshelf-logo.png"
            class="logo"
            draggable="false"
          />
        </NuxtLink>

        <div class="header-options">
          <div class="mr-4 d-flex">
            <div
              class="options-icon"
              :class="{ 'upscale-animation' : ! should_show_search_bar }"
              @click="showSearchBar"
            >
              <label v-click-outside="closeSearchBar" class="m-0 position-absolute">
                <transition name="input-field" mode="out-in">
                  <div
                    v-show="should_show_search_bar"
                    class="input-field expand"
                  >
                    <input
                      ref="searchInput"
                      v-model="search_value"
                      type="text"
                      @keyup.enter="searchValue"
                    />
                  </div>
                </transition>

                <img
                  src="../static/header/search-icon.svg"
                  class="search-icon"
                  :class="{'sm-icon' : should_show_search_bar}"
                  @click="searchValueOnClick"
                />
              </label>
            </div>

            <div class="options-icon upscale-animation bag-icon">
              <b-dropdown ref="dropdownCarrinho" right size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <img src="../static/header/bag-icon.svg" />

                  <span v-if="getCarrinhoItemsQtd" class="items-quantity-badge">
                    {{ getCarrinhoItemsQtd  }}
                  </span>
                </template>

                <template v-if="getCarrinho.length">
                  <div class="carrinho-container">
                    <div v-for="(item, index) in getCarrinho" :key="index" class="item-carrinho">
                      <div class="item-carrinho-imagem" :style="getProductImage(item)" @click="getItemRoute(item)" />

                      <div class="item-carrinho-info">
                        <span class="item-carrinho-nome">
                          {{ item.livro_nome }}
                        </span>

                        <div class="item-carrinho-options">
                          <span class="item-carrinho-preco">
                            R$ {{ item.preco }}
                          </span>

                          <span class="item-carrinho-remover" @click="removeItemFromCart(item)">
                            Remover
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr />

                  <div class="item-carrinho-resume">
                    <div class="resume-total">
                      <span class="total">
                        TOTAL:
                      </span>

                      <span class="total-price">
                        {{ getTotalVendaPreco }}
                      </span>
                    </div>

                    <div class="header-button">
                      <button class="btn-custom btn-primary btn-text-white" @click="getCompraRoute">
                        Finalizar compra
                      </button>
                    </div>
                  </div>
                </template>

                <div v-else class="empty-carrinho">
                  <span>
                    Não há nada aqui!
                  </span>
                </div>
              </b-dropdown>
            </div>

            <div v-if="hasUser" class="options-icon upscale-animation">
              <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" no-caret>
                <template #button-content>
                  <img src="../static/header/user-icon.svg" />
                </template>
                <b-dropdown-item @click="perfilRoute">Perfil</b-dropdown-item>
                <b-dropdown-item @click="signOutUser">Sair</b-dropdown-item>
              </b-dropdown>
            </div>
          </div>

          <template v-if="! hasUser">
            <div class="vertical-line" />

            <NuxtLink to="/login">
              <AppButton
                color="white"
                text_color="primary"
                bold
              >
                ENTRAR
              </AppButton>
            </NuxtLink>
          </template>

          <AppButton bold @click="publicarClick">
            PUBLICAR
          </AppButton>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  import AppButton from '../components/inputs/AppButton.vue';
  import '../directives/click-outside'

  export default {
    name: 'WSHeader',
    components: { AppButton },
    data() {
      return {
        should_show_search_bar: false,
        search_value: '',
      };
    },

    computed: {
      ...mapGetters([
        'getAuthentication',
        'getCarrinho',
      ]),

      shouldShowHeader() {
        return ! [
          'login',
          'register',
          'recover',
        ].includes(this.$route.name);
      },

      hasUser() {
        return !! this.getAuthentication?.user_id
      },

      getCarrinhoItemsQtd() {
        return this.getCarrinho.length;
      },

      getTotalVendaPreco() {
        let totalPreco = 0

        this.getCarrinho.forEach(item => {
          totalPreco += parseFloat(item.preco);
        });

        return totalPreco
      },
    },

    watch: {
      async getAuthentication(state, prevState) {
        if (state.arroba && ! prevState.arroba) {
          await this.fetchVenda({ compradorArroba: this.getAuthentication.arroba})
        }
      },
    },

    methods: {
      ...mapActions([
        'logoutUser',
        'fetchVenda',
        'removeProdutoVenda',
        'removeProdutoVendaLocal',
      ]),

      publicarClick() {
        if (! this.hasUser) {
          return this.$router.push({ path: '/login' })
        }

        this.$router.push({ path: '/announce'})
      },

      getCompraRoute() {
        if (! this.hasUser) {
          return this.$router.push({ path: '/login' })
        }

        this.$refs.dropdownCarrinho.hide(true)
        this.$router.push({ path: '/purchase'})
      },

      showSearchBar() {
        if (! this.should_show_search_bar) {
          this.should_show_search_bar = true;

          this.$nextTick(() => {
            this.$refs.searchInput.focus();
          })
        }
      },

      getItemRoute(item) {
        return this.$router.push({ path: `/product/${item.id}` })
      },

      closeSearchBar() {
        if (this.should_show_search_bar) {
          this.should_show_search_bar = false;
        }
      },

      searchValue() {
        this.$router.push({
          path: '/search',
          query: { q: this.search_value },
        })
      },

      searchValueOnClick() {
        if (this.should_show_search_bar) {
          this.$router.push({
            path: '/search',
            query: { q: this.search_value },
          })
        }
      },

      perfilRoute() {
        return this.$router.push({
          path: `/profile/${this.getAuthentication.arroba}`,
        });
      },

      async signOutUser() {
        const error = await this.logoutUser();

        if (! error) {
          this.$router.push({ path: '/login' })
        }
      },

      getProductImage(product) {
        return { backgroundImage: `url(https://ybhmnejynxteqinaedha.supabase.co/storage/v1/object/public/images/${product.images[0]})` };
      },

      async removeItemFromCart(produto) {
        this.$refs.dropdownCarrinho.hide(true)

        const error = await this.removeProdutoVenda({
          id: produto.id,
          compradorArroba: this.getAuthentication.arroba,
        })

        if (! error) {
          this.removeProdutoVendaLocal({ produto })
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  .logo {
    width: 156px;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    cursor: pointer;
  }

  .header {
    background-color: $light-1;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0px 52px;
    z-index: 1000;
    position: relative;

    .header-max-width {
      max-width: 1920px;
      width: 100%;
    }
  }

  .header-options {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 5px;

    div { gap: 8px; }
  }

  .vertical-line {
    width: 1px;
    height: 50px;
    background-color: $light-3;
  }

  .options-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    img {
      width: 32px;
      height: 32px;
      transition: all .3s ease;
      filter: invert(78%) sepia(67%) saturate(2843%) hue-rotate(324deg) brightness(100%) contrast(101%);
    }
  }

  .upscale-animation { img { transition: all .3s ease; } }
  .upscale-animation:hover { img { transform: scale(1.1) } }
  .search-icon {
    cursor: pointer;
    &:hover { transform: scale(1); }
  }

  .sm-icon { transform: scale(0.8); }
  .input-field {
    position: absolute;
    right: 0;
    background-color: transparent;
    border: 1px solid $light-3;
    height: 100%;
    border-radius: 10px;
    padding: 0px 32px 0px 0px;

    input {
      border: 0px;
      background-color: transparent;
      height: 100%;
      width: 340px;
      padding-left: 8px;

      &:focus { outline: 0 }
    }
  }

  //Animação do input
  .input-field-enter-active { animation: expand-enter 0.2s ease-out forwards; }
  .input-field-leave-active { animation: expand-leave 0.2s ease-in forwards; }
  @keyframes expand-enter {
    from { width: 0; opacity: 0; }
    to { width: 340px; opacity: 1; }
  }
  @keyframes expand-leave {
    from { width: 340px; opacity: 1; }
    to { width: 0; opacity: 0; }
  }
  .input-field-enter-active input { opacity: 0; }
  .input-field-leave-active input {
    transition: opacity 0.05s ease-in;
    opacity: 0;
  }

  .header-enter-active,
  .header-leave-active { transition: opacity 0.1s; }
  .header-enter,
  .header-leave-to { opacity: 0; }

  .bag-icon {
    position: relative;

    .items-quantity-badge {
      font-size: 10px;
      position: absolute;
      left: 50%;
      top: 45%;
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: red;
      display: flex;
      justify-content: center;
      color: white;
      font-weight: bold;
      border: 2px solid white;
      align-items: center;
      transition: all .3s ease;
    }

    &:hover {
      .items-quantity-badge { transform: scale(1.1) }
    }
  }

  .empty-carrinho {
    padding: 0px 10px;
    display: flex;
    align-items: center;
    justify-content: center;;
    font-weight: 500;
    opacity: 0.5;
  }

  .item-carrinho-resume {
    padding: 0px 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .resume-total {
      display: flex;
      gap: 8px;

      .total {
        font-size: 16px;
        font-weight: 500;
      }

      .total-price {
        font-size: 16px;
        color: $primary-orange;
        font-weight: 500;
      }
    }
  }

  .carrinho-container {
    padding: 0 10px;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .item-carrinho {
      display: flex;

      &:hover {
        .item-carrinho-info {
          .item-carrinho-options {
            .item-carrinho-remover { opacity: 1; }
          }
        }
      }

      .item-carrinho-imagem {
        width: 60px;
        height: 72px;
        min-width: 60px;
        background-color: rgb(201, 201, 201);
        background-position: center;
        background-size: cover;
      }

      .item-carrinho-info {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;

        .item-carrinho-nome {
          font-size: 14px;
          font-weight: 500;
          line-height: 1rem;
        }

        .item-carrinho-options {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .item-carrinho-preco {
            font-size: 14px;
            color: $primary-orange;
            font-weight: 500;
          }

          .item-carrinho-remover {
            font-size: 12px;
            color: $clean-red;
            font-weight: 400;
            opacity: 0;
            transition: opacity .3s ease;
          }
        }
      }
    }
  }

  .header-button {
    .btn-custom {
      width: 120px;
      height: 28px;
      border-radius: 15px;
      border: 0px;
      transition: all .3s;
      font-size: 12px;
    }

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

      &-text {
        &-white { color: $light-1; }
      }
    }
  }
</style>