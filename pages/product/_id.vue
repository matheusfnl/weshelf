<template>
  <div class="default-container">
    <div class="images-container">
      asda
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

      <div class="description-container">
          <span>
            DESCRIÇÂO
          </span>
        </div>
    </div>
  </div>
</template>

<script>
  import bookImage from '../../static/search/book-example.png';
  import Appbutton from '../../components/inputs/AppButton.vue'

  import wishlistIcon from '../../static/utils/wishlist.png';

  export default {
    name: 'ProductPage',
    components: { Appbutton },
    data() {
      return {
        product: {
          id: 1,
          image: bookImage,
          title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
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
    },

    methods: {
      getUserProfileRoute() {
        this.$router.push({
          path: `/profile/${this.product.seller.id}`,
          query: { shelf: this.product.shelf.id },
        });
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
</style>