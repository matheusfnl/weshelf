<template>
  <div class="default-container">
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
          v-for="(image, index) in product.images"
          :key="index"
          class="image-group"
          :style="{ backgroundImage: `url(${image})` }"
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
            {{ getProfileName  }}
          </div>
          |
          <div>
            <router-link
              :to="{ path: `/profile/${product.seller.id}`, query: { shelf: product.shelf.id } }"
              class="link-style"
            >
              {{ getShelfName  }}
            </router-link>
          </div>
        </div>
      </div>

      <div class="price-container mb-4">
        <span>
          <span class="actual-price">
            R$ {{ getProductPrice }}
          </span>

          <span class="old-price">
            R$ {{ getProductOldPrice }}
          </span>
        </span>
      </div>

      <div class="get-container mb-4">
        <Appbutton
          color="primary-yellow"
          class="w-100"
          bold
        >
          eu quero comprar
        </Appbutton>

        <Appbutton
          bold
          color="orange"
          class="w-100"
        >
          eu vim barganhar
        </Appbutton>

        <Appbutton
          bold
          color="orange"
        >
          <img class="wishlist-icon" :src="wishlistIcon" />
        </Appbutton>
      </div>

      <div class="original-description-container mb-4">
        <div class="top-part description-part">
          <div class="title">
            TÍTULO ORIGINAL
          </div>

          <span>
            Duna
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
                Quase Novo
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
                Aleph
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
                Curitiba PR
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
          primeiro volume da série Duna, capa dura e em ótimo estado. lido só uma vez, tem um pequeno amassado na lombada, em baixo.  aceito troca pelo segundo volume somente.
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
                * * * * *
              </div>

              <span class="rating-quantity">
                6 avaliações
              </span>
            </div>
          </div>

          <div class="container-part">
            <div class="item description-part">
              <div class="title">
                ANUNCIADOS
              </div>

              <span>
                16
              </span>
            </div>
          </div>

          <div class="container-part">
            <div class="item description-part">
              <div class="title">
                VENDIDOS
              </div>

              <span>
                7
              </span>
            </div>
          </div>

          <div class="container-part">
            <div class="item description-part">
              <div class="title">
                BOOKER DESDE
              </div>

              <span>
                nov/2022
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import example1 from '../../static/product/example1.jpg';
  import example2 from '../../static/product/example2.png';
  import example3 from '../../static/product/example3.png';
  import example4 from '../../static/product/example4.png';
  import example5 from '../../static/product/example5.png';

  import Appbutton from '../../components/inputs/AppButton.vue'

  import wishlistIcon from '../../static/utils/wishlist.png';
  import securityIcon from '../../static/utils/security.png';

  export default {
    name: 'ProductPage',
    components: { Appbutton },
    data() {
      return {
        product: {
          id: 1,
          images: [
            example1,
            example2,
            example3,
            example4,
            example5,
          ],

          title: 'duna livro 1 capa dura',
          price: {
            actual: '54.80',
            old: '62.90',
          },
          seller: {
            name: 'Matheus Gabriel',
            id: 1321,
          },
          shelf: {
            name: 'Minha primeira prateleira',
            id: 31,
          },
          badges: [
            {
              type: 'quality',
              value: 'G',
            },

            {
              type: 'trade',
              value: true,
            },
          ],
        },
        wishlistIcon,
        securityIcon,
        selected_image: 0,
      }
    },

    computed: {
      getBookTitle() {
        return this.product.title;
      },

      getProfileName() {
        return this.product.seller.name;
      },

      getShelfName() {
        return this.product.shelf.name;
      },

      getProductPrice() {
        return this.product.price.actual;
      },

      getProductOldPrice() {
        return this.product.price.old;
      },

      getSelectedImage() {
        return this.product.images[this.selected_image]
      },
    },

    methods: {
      getUserProfileRoute() {
        this.$router.push({
          path: `/profile/${this.product.seller.id}`,
          query: { shelf: this.product.shelf.id },
        });
      },

      setSelectedImage(index) {
        this.selected_image = index;
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
</style>