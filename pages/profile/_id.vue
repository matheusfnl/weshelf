<template>
  <div>
    <div
      class="banner"
      :style="{ backgroundImage: `url(${banner})` }"
    />

    <div class="profile-container">
      <div class="profile">
        <div class="profile-picture" />

        <div class="profile-header">
          <div class="d-flex justify-content-center align-items-center">
            <span class="name">
              {{ getProfileName }}
            </span>

            <span class="division">●</span>

            <span class="location">
              {{ getLocation }}
            </span>
          </div>

          <div class="profile-part">
            @{{ getProfile }}
          </div>
        </div>
      </div>

      <div class="content-container">
        <div class="first-part">
          <div class="divisor-container">
            <div class="title">BARGANHAS</div>

            <div class="content barganhas mt-2">
              <template v-if="getBarganhas.length">
                <div
                  v-for="(barganha, index) in getBarganhas"
                  :key="index"
                  class="barganha-card"
                >
                  <div
                    class="book-image"
                    :style="{ backgroundImage: `url(${barganha.image})` }"
                  />

                  <div class="book-info">
                    <span class="status">{{ getBarganhaStatus(index) }}</span>

                    <span class="barganha-name">{{ getBarganhaName(index) }}</span>
                    <span class="barganha-profile">@{{ getBarganhaProfile(index) }}</span>
                    <span class="offer">
                      você ofereceu: <b>{{ getBarganhaBook(index) }}</b>
                    </span>

                    <span class="date">atualizado em {{ getBarganhaDate(index) }}</span>
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

          <div class="divisor-container">
            <div class="title">MINHAS PRATELEIRAS</div>

            <div class="content shelfs mt-2">
              <div
                v-for="(shelf, index) in getShelfs"
                :key="index"
                class="shelf-card"
              >
                <span class="shelf-name">{{ getShelfName(index) }}</span>
                <span class="shelf-quantity">{{ getShelfQuantity(index) }} livros publicados</span>
                <div class="books-container">
                  <div
                    v-for="(image, book_index) in getShelfBooks(shelf)"
                    :key="`image-${index}-${book_index}`"
                    :style="{ backgroundImage: `url(${image.src})` }"
                    class="shelf-book-card"
                    :class="{'last-one' : book_index === 2 }"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="divisor-container">
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
                16
              </span>
            </div>

            <div class="item">
              <span class="item-title">
                VENDIDOS
              </span>

              <span class="item-result">
                7
              </span>
            </div>

            <div class="item">
              <span class="item-title">
                BOOKER DESDE
              </span>

              <span class="item-result">
                nov/2022
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

                4,85
              </span>
            </div>

            <div class="rating-preview">
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import banner from '../../static/profile/banner.png';
  import example from '../../static/product/example1.jpg';
  import ratingStar from '../../static/utils/rating-star.png'

  export default {
    name: 'ProfilePage',
    data() {
      return {
        banner,
        ratingStar,
        profile: {
          image: '',
          name: 'Pedro Nunes',
          profile: 'pedronunesbooks',
          city: 'Curitiba | PR',
          barganhas: [
            {
              image: example,
              status: 'pending',
              name: 'Tudo é Rio | Carla Madeira',
              profile: 'lucianaalves.usados',
              offer: [
                {
                  id: 1,
                  name: 'biblioteca da meia noite novo bem conservado',
                },
              ],
              updated_date: '01/05',
            },
            {
              image: example,
              status: 'pending',
              name: 'Tudo é Rio | Carla Madeira',
              profile: 'lucianaalves.usados',
              offer: [
                {
                  id: 1,
                  name: 'biblioteca da meia noite novo bem conservado',
                },
              ],
              updated_date: '01/05',
            },
          ],
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
      getBarganhas() {
        return this.profile.barganhas || []
      },

      getProfileName() {
        return this.profile.name;
      },

      getLocation() {
        return this.profile.city;
      },

      getShelfs() {
        return this.profile.shelfs || []
      },

      getProfile() {
        return this.profile.profile
      },

      getWishlist() {
        return this.profile.wishlist
      },
    },

    methods: {
      getBarganhaStatus(index) {
        if (this.getBarganhas[index].status === 'pending') {
          return 'aguardando resposta'
        }

        return ''
      },

      getBarganhaName(index) {
        return this.getBarganhas[index].name
      },

      getBarganhaProfile(index) {
        return this.getBarganhas[index].profile
      },

      getBarganhaBook(index) {
        return this.getBarganhas[index].offer[0].name
      },

      getBarganhaDate(index) {
        return this.getBarganhas[index].updated_date
      },

      getShelfName(index) {
        return this.getShelfs[index].name
      },

      getShelfQuantity(index) {
        return this.getShelfs[index].books.length
      },

      getShelfBooks(shelf) {
        if (shelf.books.length > 3) {
          return shelf.books.slice(0, 3);
        }

        return shelf.books;
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
  }

  .profile-header {
    padding: 0px 78px 0px 48px;
    display: flex;
    flex-direction: column;
    margin-top: 90px;

    .profile-part { font-size: 18px; }

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
        flex-basis: 32.3%;
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

    .barganhas {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;

      .empty-barganhas {
        color: rgb(189, 189, 189);
        font-size: 12px;
      }

      .barganha-card {
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

          .barganha-name {
            font-size: 12px;
            font-weight: bold;
            line-height: 12px;
          }

          .barganha-profile {
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
</style>