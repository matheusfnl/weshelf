<template>
  <div>
    <div v-if="!request_pending" class="default-container">
      <div class="images-container">
        <div
          class="image-preview-backdrop"
          :style="{ backgroundImage: `url(${getSelectedImage})` }"
        >
          <div
            :style="{ backgroundImage: `url(${getSelectedImage})` }"
            class="actual-image"
          />
        </div>

        <div class="image-group-container">
          <div
            v-for="(image, index) in getProductImages"
            :key="index"
            class="image-group"
            :style="{ backgroundImage: `url(${getImageUrl(image)})` }"
            @click="setSelectedImage(index)"
          />
        </div>
      </div>

      <div class="info-container">
        <div class="breadcrumb-container mb-4">
          <router-link class="search-breadcrumb" to="/search">
            busca
          </router-link>
          >
          <span>
            {{ getBookTitle }}
          </span>
        </div>

        <div class="title-container mb-4">
          <span class="title">
            {{ getBookTitle }}
          </span>

          <div class="profile-container">
            <div>
              <router-link
                :to="{ path: `/profile/${getUserArroba}` }"
                class="link-style"
              >
                {{ getProfileName  }}
              </router-link>
            </div>

              |
              <div>
                <template v-if="getShelfName">
                  <router-link
                    :to="{ path: `/profile/${getUserArroba}`, query: { shelf: getShelfName } }"
                    class="link-style"
                  >
                    {{ getShelfName  }}
                  </router-link>
                </template>

                <template v-else>
                  <span class="no-shelf">
                    Não possui uma prateleira!
                  </span>
                </template>
              </div>
          </div>
        </div>

        <div class="price-container mb-4">
          <span>
            <span class="actual-price">
              R$ {{ getProductPrice }}
            </span>

            <span v-if="getProductOldPrice" class="old-price">
              R$ {{ getProductOldPrice }}
            </span>
          </span>
        </div>

        <div class="get-container mb-4">
          <div class="compra-button-container">
            <AppButton
              color="primary-yellow"
              class="w-100"
              bold
              :disabled="getIsMyProduct || getIsOnCart"
              :request_pending="add_produto_request_pending"
              @click="getPurchaseRoute"
            >
              eu quero comprar
            </AppButton>
          </div>

          <AppButton
            v-if="getAceitaBarganha"
            bold
            color="orange"
            class="w-100"
            :disabled="getIsMyProduct"
            @click="barganharClick"
          >
            eu vim barganhar
          </AppButton>

          <AppButton
            bold
            color="orange"
            :disabled="getIsMyProduct"
            :request_pending="wishlist_request_pending"
            @click="wishlistClick"
          >
            <img class="wishlist-icon" :src="getWishlistIcon" />
          </AppButton>
        </div>

        <div class="original-description-container mb-4">
          <div class="top-part description-part">
            <div class="title">
              TÍTULO ORIGINAL
            </div>

            <span>
              {{  getBookOriginalTitle  }}
            </span>
          </div>

          <hr />

          <div class="bottom-part">
            <div class="container-part">
              <div class="top-part description-part">
                <div class="title">
                  CONDIÇÃO
                </div>

                <span>
                  {{  getBookCondicao  }}
                </span>
              </div>
            </div>

            <div class="vertical-hr" />

            <div class="container-part">
              <div class="top-part description-part">
                <div class="title">
                  EDITORA
                </div>

                <span>
                  {{ getBookEditora }}
                </span>
              </div>
            </div>

            <div class="vertical-hr" />

            <div class="container-part">
              <div class="top-part description-part">
                <div class="title">
                  LOCALIZAÇÃO
                </div>

                <span>
                  {{ getBookLocalizacao }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div class="description-container mb-4">
          <div class="title">
            DESCRIÇÃO
          </div>

          <span>
            {{ getBookDescricao }}
          </span>
        </div>

        <hr />

        <div class="security-container mb-4">
          <img class="icon-size mr-1" :src="securityIcon" />

          <span>
            Sua compra no ambiente WeShelf é segura. Nunca realize transações fora dos meios oficiais.

            <a href="#" class="security-link">
              Confira mais dicas de segurança.
            </a>
          </span>
        </div>

        <div class="user-container">
          <div
            class="profile-part"
            @click="getUserProfileRoute"
          >
            <div class="user-icon" />

            <div class="user-info">
              <span class="label">
                PUBLICADOR
              </span>

              <span class="name">
                {{ getProfileName }}
              </span>
            </div>
          </div>

          <hr />

          <div class="info-part">
            <div class="container-part">
              <div class="rating-container item description-part">
                <div class="stars">
                  <img class="rating-start" :src="ratingStar" />
                </div>

                <span class="rating-quantity">
                  nota {{ getProfileAvalicao }}
                </span>
              </div>
            </div>

            <div class="container-part">
              <div class="item description-part">
                <div class="title">
                  ANUNCIADOS
                </div>

                <span>
                  {{  getProfileQtdAnunciado  }}
                </span>
              </div>
            </div>

            <div class="container-part">
              <div class="item description-part">
                <div class="title">
                  VENDIDOS
                </div>

                <span>
                  {{ getProfileQtdVendidos }}
                </span>
              </div>
            </div>

            <div class="container-part">
              <div class="item description-part">
                <div class="title">
                  BOOKER DESDE
                </div>

                <span>
                  {{ getProfileCreatedAt }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="loader-container">
      <MoonLoader
        color="#FE8133"
      />
    </div>

    <transition name="modal">
      <div v-if="should_show_modal" class="barganhar-modal">
        <div class="backdrop" @click="closeModal" />

        <div class="content">
          <p class="title">
            alô... chefe, ele escolheu barganhar!
          </p>

          <p class="subtitle">
            Escolha um livro para oferecer em troca por

            <span>
              {{ getBookTitle }}
            </span>
          </p>

          <p class="warning">
            <span>
              ATENÇÃO!
            </span>

            Você só pode escolher um livro já publicado para oferecer
          </p>

          <div class="products-container">
            <template v-if="products_request_pending">
              <div class="barganha-centralize">
                <MoonLoader
                  color="#FE8133"
                />
              </div>
            </template>

            <template v-else-if="getUserProductsDataVisible.length">
              <div
                v-for="(seller_product, index) in getUserProductsDataVisible"
                :key="index"
                class="item-to-select"
                :class="{ 'selected' : selected_item === index }"
                :style="{ backgroundImage: `url(${getImageUrl(seller_product.images[0])})` }"
                @click="setItemSelected(index)"
              />
            </template>

            <template v-else>
              <div class="barganha-centralize">
                <span>
                  Parece que você não tem nada anunciado!
                </span>
              </div>
            </template>
          </div>

          <p class="subtitle mt-3">
            Deixe um recado para

            <span>
              {{ getProfileName }}
            </span>
          </p>

          <p class="info">
            Você receberá uma resposta em até 4 dias.
          </p>

          <div class="send-container">
            <InputTextArea
              id="textArea"
              class="text-area"
              placeholder="opcional, mas aqui você pode explicar melhor a sua oferta :)"
              :value="barganha_text"
              @model="barganha_text = $event"
            />

            <AppButton class="send-barganha-button" bold @click="enviarBarganha">
              <img class="send-barganha" :src="sendIcon" />
            </AppButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import MoonLoader from 'vue-spinner/src/MoonLoader.vue';

  import { mapGetters, mapActions } from 'vuex';

  import AppButton from '../../components/inputs/AppButton.vue'
  import InputTextArea from '../../components/inputs/InputTextArea.vue'

  import wishlistIcon from '../../static/utils/wishlist.png';
  import wishlistRemoveIcon from '../../static/utils/wishlist-remove.png';
  import securityIcon from '../../static/utils/security.png';
  import sendIcon from '../../static/utils/send.png';
  import ratingStar from '../../static/utils/rating-star.png'

  export default {
    name: 'ProductPage',
    components: {
      AppButton,
      InputTextArea,
      MoonLoader,
    },

    data() {
      return {
        ratingStar,
        wishlistIcon,
        wishlistRemoveIcon,
        sendIcon,
        securityIcon,
        selected_image: 0,
        should_show_modal: false,
        wishlist_request_pending: false,
        barganha_text: '',
        selected_item: -1,
        request_pending: false,
        products_request_pending: false,
        add_produto_request_pending: false,
      }
    },

    computed: {
      ...mapGetters([
        'getAuthentication',
        'getProduto',
        'getUser',
        'getUserProductsData',
        'getCarrinho',
      ]),

      getBookTitle() {
        const { titulo = '' } = this.getProduto || {};

        return titulo;
      },

      getBookOriginalTitle() {
        const { livro_nome: livroNome = '' } = this.getProduto || {};

        return livroNome;
      },

      getUserProductsDataVisible() {
        return this.getUserProductsData.filter(item => item.visivel)
      },

      getBookCondicao() {
        const { estado = '' } = this.getProduto || {};

        if (estado === 'great') {
          return 'Ótimo, nenhum defeito'
        }

        if (estado === 'good') {
          return 'Bom, poucos amassados'
        }

        if (estado === 'medium') {
          return 'Alguns amassados'
        }

        if (estado === 'bad') {
          return 'Um pouco acabado'
        }

        if (estado === 'horrible') {
          return 'Muito acabado'
        }

        return '';
      },

      getBookEditora() {
        const { editora = '' } = this.getProduto || {};

        return editora;
      },

      getBookLocalizacao() {
        const { uf = 'Brazil' } = this.getProduto || {};

        return uf;
      },

      getBookDescricao() {
        const { descricao = '' } = this.getProduto || {};

        return descricao;
      },

      getUserArroba() {
        const { user_arroba: userArroba = '' } = this.getProduto || {};

        return userArroba;
      },

      getProfileName() {
        const { name = '' } = this.getUser || {};

        return name;
      },

      getProfileAvalicao() {
        const { rate = 3 } = this.getUser || {};

        return rate;
      },

      getProfileQtdAnunciado() {
        const { qtd_anuncios: qtdAnuncios = 0 } = this.getUser || {};

        return qtdAnuncios;
      },

      getProfileQtdVendidos() {
        const { qtd_vendidos: qtdVendidos = 0 } = this.getUser || {};

        return qtdVendidos;
      },

      getProfileCreatedAt() {
        const { created_at: createdAt = '' } = this.getUser || {};

        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        const partes = createdAt.split('-');
        const ano = partes[0];
        const mes = parseInt(partes[1]) - 1;

        return meses[mes] + '/' + ano;
      },

      getShelfName() {
        const { shelf = '' } = this.getProduto || {};

        return shelf;
      },

      getProductPrice() {
        const { preco = 0 } = this.getProduto || {};

        return preco;
      },

      getProductOldPrice() {
        const { old_preco: oldPreco = 0 } = this.getProduto || {};

        return oldPreco;
      },

      getProductImages() {
        const { images = [] } = this.getProduto || {};

        return images;
      },

      getAceitaBarganha() {
        const { trocas = false } = this.getProduto || {};

        return trocas;
      },

      getSelectedImage() {
        return this.getImageUrl(this.getProductImages[this.selected_image]);
      },

      getIsMyProduct() {
        if (this.getProduto?.user_arroba && this.getAuthentication?.arroba) {
          return this.getProduto.user_arroba === this.getAuthentication.arroba;
        }

        return false;
      },

      getIsOnCart() {
        if (this.getCarrinho?.id) {
          return this.getCarrinho.some(produto => produto.id === this.getProduto.id)
        }

        return false;
      },

      getWishlistIcon() {
        const {
          wishlist,
          id,
        } = this.getAuthentication

        const { id: idProduto } = this.getProduto

        if (id && idProduto) {
          if (wishlist.some(item => {
            return item.id === idProduto;
          })) {
            return wishlistRemoveIcon
          }

          return wishlistIcon;
        }

        return wishlistIcon
      },
    },

    async mounted() {
      this.request_pending = true;

      await this.fetchProduto({ id: this.$route.params.id })

      await this.fetchUser(this.getUserArroba)

      this.request_pending = false;

      this.products_request_pending = true;

      await this.fetchUserProducts({ arroba: this.getAuthentication.arroba });

      this.products_request_pending = false;

      if (! this.getProduto.id) {
        this.$router.push({ path: '/search' })
      }
    },

    methods: {
      ...mapActions([
        'fetchProduto',
        'fetchUser',
        'fetchUserProducts',
        'addProdutoVendaLocal',
        'addProdutoVenda',
        'createBarganha',
        'adicionaRemoveWishlist',
      ]),

      getUserProfileRoute() {
        this.$router.push({
          path: `/profile/${this.getUserArroba}`,
          query: { shelf: this.getShelfName },
        });
      },

      setSelectedImage(index) {
        this.selected_image = index;
      },

      async barganharClick() {
        if (! this.getAuthentication?.user_id) {
          return this.$router.push({ path: '/login' })
        }

        this.should_show_modal = true;

        if (!this.getUserProductsData.length) {
          this.products_request_pending = true;

          await this.fetchUserProducts({ arroba: this.getAuthentication.arroba });

          this.products_request_pending = false;
        }
      },

      async wishlistClick() {
        if (! this.getAuthentication?.user_id) {
          return this.$router.push({ path: '/login' })
        }

        this.wishlist_request_pending = true;

        await this.adicionaRemoveWishlist({
          id: this.getProduto.id,
          nome: this.getProduto.livro_nome,
          imagem: this.getProduto.images[0],
          arroba: this.getProduto.user_arroba,
          userArroba: this.getAuthentication.arroba,
        })

        this.wishlist_request_pending = false;
      },

      closeModal() {
        this.should_show_modal = false;
        this.selected_item = -1;
      },

      setItemSelected(index) {
        if (this.selected_item === index) {
          this.selected_item = -1;

          return;
        }

        this.selected_item = index;
      },

      getImageUrl(image) {
        return `https://ybhmnejynxteqinaedha.supabase.co/storage/v1/object/public/images/${image}`;
      },

      async getPurchaseRoute() {
        if (! this.getCarrinho.some(produto => produto.id === this.getProduto.id)) {
          this.add_produto_request_pending = true

          const error = await this.addProdutoVenda({
            id: this.getProduto.id,
            vendedorArroba: this.getProduto.user_arroba,
            compradorArroba: this.getAuthentication.arroba,
          })

          if (! error) {
            this.addProdutoVendaLocal({ produto: this.getProduto })
          }

          this.add_produto_request_pending = false
        }
      },

      async enviarBarganha() {
        if (this.selected_item !== -1) {
          await this.createBarganha({
            compradorArroba: this.getAuthentication.arroba,
            vendedorArroba: this.getProduto.user_arroba,
            produtoOferecido: {
              id: this.getUserProductsData[this.selected_item].id,
              image: this.getUserProductsData[this.selected_item].images[0],
              arroba: this.getUserProductsData[this.selected_item].user_arroba,
              livro_nome: this.getUserProductsData[this.selected_item].livro_nome,
            },
            produtoRequerido: {
              id: this.getProduto.id,
              image: this.getProduto.images[0],
              arroba: this.getProduto.user_arroba,
              livro_nome: this.getProduto.livro_nome,
            },
            mensagem: this.barganha_text,
          })

          this.should_show_modal = false;
        }
      },
    },
  }
</script>

<style scoped lang=scss>
  .default-container {
    padding: 60px 240px;
    display: flex;
    width: 100%;

    .images-container {
      margin-right: 24px;
      width: 50%;
      max-width: 600px;

      .image-preview-backdrop {
        width: 100%;
        aspect-ratio: 1/1;
        background-position: center;
        background-size: cover;
        margin-bottom: 9px;
        border-radius: 3px;
        overflow: hidden;
        position: relative;
        display: flex;
        justify-content: center;

        .actual-image {
          z-index: 10;
          background-size: contain;
          background-repeat: no-repeat;
          background-position: center;
          width: 100%;
        }
      }

      .image-preview-backdrop::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: inherit;
        filter: blur(12px);
      }

      .image-group-container {
        display: flex;
        gap: 9px;

        .image-group {
          background-position: center;
          background-size: cover;
          width: 113px;
          height: 113px;
          border-radius: 3px;
          cursor: pointer;
        }
      }
    }

    .info-container {
      flex-grow: 1;

      .title-container {
        display: flex;
        flex-direction: column;
        .title {
          font-size: 22px;
          font-weight: bold;
        }

        .profile-container {
          display: flex;
          gap: 10px;
          font-size: 12px;

          .link-style { color: $primary-orange; }
        }
      }
    }

    .price-container {
      .actual-price {
        font-size: 26px;
        color: $primary-orange;
        font-weight: bold;
      }

      .old-price {
        font-size: 20px;
        color: #DBDBDB;
        text-decoration-line: line-through;
      }
    }

    .get-container {
      display: flex;
      gap: 12px;

      .compra-button-container { min-width: 45%; }
      .wishlist-icon {
        width: 26px;
        height: 26px;
      }
    }
  }

  .breadcrumb-container {
    color: #9E9E9E;
    font-size: 10px;

    .search-breadcrumb {
      color: #9E9E9E;
      font-size: 10px;
      text-decoration: underline;
    }
  }

  .original-description-container {
    border-radius: 6px;
    border: 1px solid #D4D4D4;
    padding: 15px;

    .top-part {
      display: flex;
      align-items: center;
      flex-direction: column;
    }

    .bottom-part {
      display: flex;
      align-items: center;
      height: 100%;

      .container-part {
        width: 33.3%;
      }
    }
  }

  .description-part {
    .title {
      font-weight: 300;
      font-size: 10px;
      line-height: 12px;
      margin-bottom: 6px;
    }

    span {
      font-weight: bold;
      font-size: 12px;
      line-height: 15px;
    }
  }

  .vertical-hr {
    width: 1px;
    height: 32px;
    background-color: #D4D4D4;
  }

  .description-container {
    .title {
      color: $primary-yellow;
      font-size: 14px;
      font-weight: 500;
    }

    span { font-size: 14px; }
  }

  .security-container {
    display: flex;
    align-items: center;

    .icon-size { width: 20px; }
    span { font-size: 9px; }
    .security-link { color: $clean-red; }
  }

  .user-container {
    border-radius: 6px;
    border: 1px solid #D4D4D4;
    padding: 15px;

    .profile-part {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .user-icon {
        width: 34px;
        height: 34px;
        border-radius: 50%;
        background-color: rgb(211, 175, 175);
        margin-right: 10px;
      }

      .user-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .label {
          font-size: 8px;
          line-height: 6px;
        }

        .name {
          font-size: 14px;
          font-weight: bold;
        }
      }
    }

    .info-part {
      display: flex;
      align-items: center;
      height: 100%;

      .container-part {
        width: 25%;

        .rating-container {
          color: $primary-yellow;
          .stars {
            font-size: 16px;
            line-height: 6px;
          }
          .rating-quantity { font-size: 10px; }
        }

        .item {
          display: flex;
          align-items: center;
          flex-direction: column;
        }
      }
    }
  }

  .loader-container {
    display: flex;
    justify-content: center;
    align-items:center;
    height: 75vh;
  }

  .barganhar-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .backdrop {
      width: inherit;
      height: inherit;
      background-color: $lighter-grey;
      opacity: .6;
      filter: blur(8px);
      -webkit-filter: blur(8px);
    }

    .content {
      margin-top: 100px;
      position: absolute;
      width: 800px;
      background-color: $white;
      border-radius: 8px;
      box-shadow: 0px 0px 5px 1px rgba($black, .16);
      padding: 32px 64px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .title {
        color: $primary-orange;
        font-size: 20px;
        font-weight: bold;
      }

      .subtitle {
        font-size: 16px;
        span { font-weight: bold; }
        margin-bottom: 0.25rem;
      }

      .warning {
        font-size: 12px;
        color: #5A5A5A;

        span { font-weight: bold; }
      }

      .info {
        color: #5A5A5A;
        font-size: 12px;
      }
    }
  }

  .products-container {
    display: flex;
    max-width: 100%;
    gap: 10px;
    height: 180px;
    padding: 10px;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;

    .item-to-select {
      min-width: 121px;
      min-height: 145px;
      background-position: center;
      background-size: cover;
      cursor: pointer;
      border-radius: 8px;
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.25);

      &.selected {
        border: 3px solid $primary-orange;
      }
    }
  }

  .barganha-centralize {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    overflow:hidden;

    span { opacity: .5; }
  }

  .modal-enter-active,
  .modal-leave-active { transition: opacity 0.1s; }
  .modal-enter,
  .modal-leave-to { opacity: 0; }
  .no-shelf { opacity: .5 }
  .text-area {
    min-width: 90%;
  }
  .send-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;

    .send-barganha-button {
      min-width: 0px !important;
      min-height: 0px !important;

      .send-barganha {
        width: 24px;
        height: 24px;
      }
    }
  }

  .rating-start {
    width: 14px;
    height: 14px;
  }
</style>