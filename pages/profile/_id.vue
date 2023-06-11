<template>
  <div>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${banner})` }"
    />

    <div class="profile-container">
      <div class="profile">
        <div class="profile-picture" :style="{ backgroundImage: `url(${profileIcon})` }" />

        <div class="profile-header">
          <div class="d-flex justify-content-center align-items-center">
            <span class="name">
              {{ getProfileName }}
            </span>

            <!-- <span class="division">●</span>

            <span class="location">
              {{ getLocation }}
            </span> -->
          </div>

          <div class="profile-part mt-2">
            @{{ getProfile }}
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="first-part">
          <div v-if="getIsMyProfile" class="divisor-container">
            <div class="title">BARGANHAS</div>

            <div class="content barganhas mt-2">
              <template v-if="barganhas.length">
                <div
                  v-for="(barganha, index) in barganhas"
                  :key="index"
                  class="barganha-card"
                >
                  <div
                    class="book-image"
                    :style="{ backgroundImage: `url(${getImageUrl(barganha.produto_requerido.image)})` }"
                  />

                  <div class="book-info">
                    <span class="status">{{ getStatus(barganha) }}</span>

                    <span class="barganha-name">{{ getBarganhaName(barganha) }}</span>
                    <span class="barganha-profile">@{{ getBarganhaProfile(barganha) }}</span>
                    <span class="offer">
                      você ofereceu: <b>{{ getBarganhaBook(barganha) }}</b>
                    </span>

                    <span class="date">atualizado em {{ getBarganhaDate(barganha) }}</span>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="w-100 d-flex justify-content-center py-3 empty-barganhas">
                  Você não tem barganhas :0
                </div>
              </template>
            </div>
          </div>

          <div v-if="getIsMyProfile" class="divisor-container">
            <div class="title">PROPOSTAS</div>

            <div class="content propostas mt-2">
              <template v-if="propostas.length">
                <div
                  v-for="(proposta, index) in propostas"
                  :key="index"
                  class="propostas-card"
                >
                  <div
                    class="book-image"
                    :style="{ backgroundImage: `url(${getImageUrl(proposta.produto_requerido.image)})` }"
                  />

                  <div class="book-info">
                    <span class="status">{{ getStatus(proposta) }}</span>

                    <span class="propostas-name">{{ getBarganhaName(proposta) }}</span>
                    <span class="propostas-profile">@{{ getBarganhaProfile(proposta) }}</span>
                    <span class="offer">
                      pessoa ofereceu: <b>{{ getBarganhaBook(proposta) }}</b>
                    </span>

                    <span class="date">atualizado em {{ getBarganhaDate(proposta) }}</span>
                  </div>
                </div>
              </template>

              <template v-else>
                <div class="w-100 d-flex justify-content-center py-3 empty-barganhas">
                  Você não tem propostas :)
                </div>
              </template>
            </div>
          </div>

          <div class="divisor-container">
            <div class="title">MINHAS PRATELEIRAS</div>

            <div v-if="prateleiras.length" class="content shelfs mt-2">
              <div
                v-for="(shelf, index) in prateleiras"
                :key="index"
                class="shelf-card"
              >
                <span class="shelf-name">{{ getPrateleiraNome(shelf) }}</span>
                <span class="shelf-quantity">{{ shelf.items.length }} livros publicados</span>
                <div class="books-container">
                  <div
                    v-for="(produto, book_index) in shelf.items"
                    :key="`image-${index}-${book_index}`"
                  >
                    <div
                      v-if="book_index < 3"
                      :style="{ backgroundImage: `url(${getImageUrl(produto.images[0])})` }"
                      class="shelf-book-card"
                      :class="{'last-one' : book_index === 2 }"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div v-else>
              <div class="w-100 d-flex justify-content-center py-3 empty-prateleira">
                  Você não tem prateleiras :(
                </div>
            </div>
          </div>

          <div v-if="getIsMyProfile" class="divisor-container">
            <div class="title">WISHLIST</div>

            <div class="content wishlist mt-2">
              <div
                v-for="(item, index) in profile.wishlist"
                :key="index"
                class="wishlist-card"
                :style="{ backgroundImage: `url(${item.image})` }"
              />
            </div>
          </div>
        </div>

        <div class="vertical-hr" />

        <div class="second-part">
          <div class="info-container">
            <div class="item">
              <span class="item-title">
                ANUNCIADOS
              </span>

              <span class="item-result">
                {{ getQuantidadeAnunciados }}
              </span>
            </div>

            <div class="item">
              <span class="item-title">
                VENDIDOS
              </span>

              <span class="item-result">
                {{ getQuantidadeVendidos }}
              </span>
            </div>

            <div class="item">
              <span class="item-title">
                BOOKER DESDE
              </span>

              <span class="item-result">
                {{ getProfileCreatedAt }}
              </span>
            </div>
          </div>

          <div class="rating-container">
            <div class="title-container">
              <span class="title">
                ÚLTIMAS AVALIAÇÕES
              </span>

              <span class="rating">
                <img :src="ratingStar" />

                {{ getUserRate }}
              </span>
            </div>

            <div v-if="getUserAvaliacoes.length" class="rating-preview">
              <div class="rating-content">
                <div class="info">
                  <div class="rating">
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                  </div>

                  <div class="rating-info">
                    <span class="aval">
                      <span class="label">
                        Entrega:
                      </span>

                      <span class="value">
                        5
                      </span>
                    </span>

                    <span class="aval">
                      <span class="label">
                        Comunicação:
                      </span>

                      <span class="value">
                        4
                      </span>
                    </span>

                    <span class="aval">
                      <span class="label">
                        Livros:
                      </span>

                      <span class="value">
                        5
                      </span>
                    </span>
                  </div>
                </div>

                <div class="text">
                  Obrigado, Pedro pelo excelente livro. Por mais pessoas como você!!
                </div>
              </div>

              <hr />

              <div class="rating-content">
                <div class="info">
                  <div class="rating">
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                    <img :src="ratingStar" />
                  </div>

                  <div class="rating-info">
                    <span class="aval">
                      <span class="label">
                        Entrega:
                      </span>

                      <span class="value">
                        5
                      </span>
                    </span>

                    <span class="aval">
                      <span class="label">
                        Comunicação:
                      </span>

                      <span class="value">
                        4
                      </span>
                    </span>

                    <span class="aval">
                      <span class="label">
                        Livros:
                      </span>

                      <span class="value">
                        5
                      </span>
                    </span>
                  </div>
                </div>

                <div class="text">
                  Obrigado, Pedro pelo excelente livro. Por mais pessoas como você!!
                </div>
              </div>
            </div>

            <div class="no-rate-container">
              Não há avaliações aqui!
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';

  import banner from '../../static/profile/banner.png';
  import example from '../../static/product/example1.jpg';
  import ratingStar from '../../static/utils/rating-star.png'
  import profileIcon from '../../static/utils/profile-icon.png'

  export default {
    name: 'ProfilePage',
    data() {
      return {
        banner,
        ratingStar,
        profileIcon,
        prateleiras: [],
        barganhas: [],
        propostas: [],
        profile: {
          image: '',
          name: 'Pedro Nunes',
          profile: 'pedronunesbooks',
          city: 'Curitiba | PR',
          shelfs: [
            {
              name: 'terror',
              books: [
                { src: example },
                { src: example },
                { src: example },
              ],
            },
            {
              name: 'terror',
              books: [
                { src: example },
                { src: example },
                { src: example },
              ],
            },
            {
              name: 'terror',
              books: [
                { src: example },
                { src: example },
                { src: example },
              ],
            },
          ],

          wishlist: [
            {
              id: 1,
              image: example,
            },
            {
              id: 2,
              image: example,
            },
            {
              id: 3,
              image: example,
            },
            {
              id: 4,
              image: example,
            },
            {
              id: 5,
              image: example,
            },
            {
              id: 6,
              image: example,
            },
            {
              id: 7,
              image: example,
            },
            {
              id: 8,
              image: example,
            },
          ],
        },
      };
    },

    computed: {
      ...mapGetters([
        'getUser',
        'getAuthentication',
        'getUserProductsData',
      ]),

      getProfileName() {
        return this.getUser.name;
      },

      getProfile() {
        return this.getUser.arroba
      },

      getUserRate() {
        return this.getUser.rate;
      },

      getUserAvaliacoes() {
        return []
      },

      getQuantidadeAnunciados() {
        return this.getUser.qtd_anuncios
      },

      getQuantidadeVendidos() {
        return this.getUser.qtd_vendidos
      },

      getProfileCreatedAt() {
        const { created_at: createdAt = '' } = this.getUser || {};

        const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

        const partes = createdAt.split('-');
        const ano = partes[0];
        const mes = parseInt(partes[1]) - 1;

        return meses[mes] + '/' + ano;
      },

      getLocation() {
        return this.profile.city;
      },

      getShelfs() {
        return this.getUser.prateleiras || []
      },

      getWishlist() {
        return this.profile.wishlist
      },

      getIsMyProfile() {
        if (this.getUser) {
          return this.getUser.arroba === this.getAuthentication.arroba
        }

        return false
      },
    },

    async mounted() {
      await this.fetchUser(this.$route.params.id);
      await this.fetchUserProducts({ arroba: this.$route.params.id });

      this.prateleiras = Object.values(
        this.getUserProductsData.reduce((acc, item) => {
          const prateleira = item.prateleira;
          if (!acc[prateleira]) {
            acc[prateleira] = {
              prateleira,
              items: [],
            };
          }
          acc[prateleira].items.push(item);
          return acc;
        }, {}),
      );

      if (this.getIsMyProfile) {
        this.barganhas = await this.fetchMinhasBarganhas({ arroba: this.$route.params.id })
        this.propostas = await this.fetchMinhasPropostas({ arroba: this.$route.params.id })
      }
    },

    methods: {
      ...mapActions([
        'fetchUser',
        'fetchMinhasBarganhas',
        'fetchMinhasPropostas',
        'fetchUserProducts',
      ]),

      getStatus(barganha) {
        if (barganha.status === 'waiting') {
          return 'aguardando resposta'
        }

        if (barganha.status === 'refused') {
          return 'recusada'
        }

        if (barganha.status === 'waiting_payment_self') {
          return 'Aguardando seu pagamento'
        }

        if (barganha.status === 'waiting_payment_other') {
          return 'Aguardando pagamento do vendedor'
        }

        return ''
      },

      getBarganhaName(barganha) {
        return barganha.produto_requerido.livro_nome
      },

      getBarganhaProfile(barganha) {
        return barganha.produto_requerido.arroba
      },

      getBarganhaBook(barganha) {
        return barganha.produto_oferecido.livro_nome
      },

      getBarganhaDate(barganha) {
        const dia = barganha.updated_date.substring(8, 10);
        const mes = barganha.updated_date.substring(5, 7);

        return `${dia}/${mes}`
      },

      getShelfQuantity(index) {
        return 0
      },

      getShelfBooks(shelf) {
        if (shelf.books.length > 3) {
          return shelf.books.slice(0, 3);
        }

        return shelf.books;
      },

      getImageUrl(image) {
        return `https://ybhmnejynxteqinaedha.supabase.co/storage/v1/object/public/images/${image}`;
      },

      getPrateleiraNome(shelf) {
        if (shelf.prateleira !== null) {
          return shelf.prateleira
        }

        return 'outros'
      },
    },
  }
</script>

<style scoped lang="scss">
  .banner {
    width: 100%;
    height: 180px;
    background-position: center;
    background-size: cover;
  }

  .profile-container {
    padding: 0 5vw;
    display: flex;
    flex-direction: column;

    .profile {
      display: flex;
      top: 220px;
      position: absolute;
    }
  }

  .profile-picture {
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: rgb(226, 160, 160);
    background-position: center;
    background-size: cover;
  }

  .profile-header {
    padding: 0px 78px 0px 48px;
    display: flex;
    flex-direction: column;
    margin-top: 90px;

    .profile-part { font-size: 18px; font-weight: 300; }

    .name {
      font-size: 32px;
      font-weight: bold;
      line-height: 0px;
    }

    .division {
      padding: 0px 18px;
      padding-top: 2px;
    }

    .location {
      font-size: 16px;
      font-weight: 400;
      padding-top: 4px;
    }
  }

  .content-container {
    margin-top: 180px;
    display: flex;

    .first-part {
      width: 66%;
      padding: 0px 20px;
    }
    .second-part {
      width: 34%;
      padding: 0px 20px;
    }

    .vertical-hr {
      height: 800px;
      width: 1px;
      background-color: #D9D9D9;
    }
  }

  .divisor-container {
    padding-bottom: 20px;

    .title {
      font-size: 18px;
      font-weight: bold;
    }

    .shelfs {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .shelf-card {
        padding: 8px;
        flex-basis: 22.3%;
        box-sizing: border-box;
        border: 1px solid #D4D4D4;
        border-radius: 5px;
        display: flex;
        flex-direction: column;

        .shelf-name {
          color: $light-orange;
          font-size: 16px;
          font-weight: bold;
        }

        .shelf-quantity {
          font-size: 11px;
          margin-bottom: 8px;
        }

        .books-container {
          display: flex;
          gap: 10px;
        }

        .shelf-book-card {
          width: 70px;
          height: 93px;
          background-color: rgb(227, 205, 205);
          border-radius: 2px;
          background-position: center;
          background-size: cover;
          position: relative;

          &.last-one::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 2px;
            background-color: rgb(227, 205, 205);
            background-image: inherit;
            background-position: center;
            background-size: cover;
            filter: brightness(60%);
          }

          &.last-one::after {
            content: "• • •";
            color: white;
            font-size: 12px;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
          }
        }
      }
    }

    .wishlist {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .wishlist-card {
        width: 142px;
        height: 190px;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        cursor: pointer;
      }
    }

    .barganhas, .propostas {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .empty-barganhas, .empty-propostas {
        color: rgb(189, 189, 189);
        font-size: 12px;
      }

      .barganha-card, .propostas-card {
        padding: 8px;
        flex-basis: 49%;
        box-sizing: border-box;
        border: 1px solid #E2E2E2;
        background-color: #FAFAFA;
        border-radius: 5px;
        display: flex;
        height: 150px;
        gap: 10px;

        .book-image {
          height: 100%;
          min-width: 99px;
          width: 99px;
          border-radius: 3px;
          background-position: center;
          background-size: cover;
        }

        .book-info {
          display: flex;
          flex-direction: column;

          .status {
            color: #DE4B28;
            font-size: 10px;
            font-weight: bold;
            margin-bottom: 12px;
          }

          .barganha-name, .propostas-name {
            font-size: 12px;
            font-weight: bold;
            line-height: 12px;
          }

          .barganha-profile, .propostas-profile {
            font-size: 10px;
            color: #777777;
            margin-bottom: 12px;
          }

          .offer {
            font-size: 12px;
            color: #777777;
            margin-bottom: 12px;
          }

          .date {
            font-size: 8px;
            color: #AAAAAA;
          }
        }
      }
    }
  }

  .info-container {
    display: flex;
    align-items: center;
    border: 1px solid #D4D4D4;
    border-radius: 6px;
    padding: 16px;
    justify-content: space-around;
    margin-top: 2.25rem;

    .item {
      display: flex;
      flex-direction: column;
      align-items: center;

      .item-title {
        font-size: 10px;
        font-weight: 500;
      }

      .item-result {
        font-size: 12px;
        font-weight: bold;
      }
    }
  }

  .rating-container {
    margin-top: 40px;

    .title-container {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 18px;
        font-weight: bold;
      }

      .rating {
        color: $light-orange;
        font-size: 16px;
        display: flex;
        align-items: center;
        gap: 6px;
        font-weight: bold;

        img { width: 18px; }
      }
    }

    .rating-preview {
      margin-top: 6px;
      border: 1px solid #E2E2E2;
      border-radius: 6px;
      background-color: #FAFAFA;
      padding: 17px;

      .rating-content {
        display: flex;
        gap: 22px;

        .info {
          display: flex;
          flex-direction: column;
          flex: 1 0 auto;

          .rating { img { width: 18px; } }
          .rating-info {
            display: flex;
            flex-direction: column;

            .aval {
              .label { font-size: 12px; }
              .value {
                font-size: 12px;
                font-weight: bold;
              }
            }
          }
        }

        .text {
          flex: 0 1 auto;
          max-width: 100%;
        }
      }
    }
  }

  .no-rate-container {
    height: 100px;
    width: 100%;
    display: flex;
    align-items:center;
    justify-content: center;
    opacity: .4;
  }

  .empty-prateleira {
    color: rgb(189, 189, 189);
    font-size: 12px;
  }
</style>