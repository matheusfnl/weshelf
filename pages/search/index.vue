<template>
  <div class="default-container">
    <div class="search-container mb-4">
      <div class="input-container">
        <input
          :value="search_value"
          placeholder="digite o que você quer procurar"
          spellcheck="false"
          type="textx"
        />
      </div>

      <div class="search-inputs">
        <InputSelect
          id="selectCondition"
          default_label="condição"
          color="clean_red"
          :default_disabled="false"
          :default_hidden="false"
          :options="getConditionOptions"
          @model="condition = $event"
        />

        <InputSelect
          id="selectGender"
          default_label="gênero"
          color="clean_red"
          :default_disabled="false"
          :default_hidden="false"
          :options="getGenderOptions"
          @model="gender = $event"
        />

        <InputSelect
          id="selectEditor"
          default_label="editora"
          color="clean_red"
          :default_disabled="false"
          :default_hidden="false"
          :options="getEditorOptions"
          @model="editor = $event"
        />

        <InputSelect
          id="selectRegion"
          default_label="região"
          color="clean_red"
          :default_disabled="false"
          :default_hidden="false"
          :options="getRegionOptions"
          @model="region = $event"
        />

        <InputSelect
          id="selectRarity"
          default_label="raridade"
          color="clean_red"
          :default_disabled="false"
          :default_hidden="false"
          :options="getRarityOptions"
          @model="rarity = $event"
        />

        <InputSelect
          id="filterOptions"
          class="filter-input"
          color="transparent"
          :default_disabled="false"
          :default_hidden="false"
          :has_default="false"
          :options="getFilterOptions"
          @model="rarity = $event"
        />
      </div>
    </div>

    <div class="mb-4">
      <hr class="mb-0 pb-0" />

      <span class="items-quantity-text">
        {{ getItemsQuantity }} resultados encontrados
      </span>
    </div>

    <div class="result-container">
      <div
        v-for="(item, index) in catalog_items"
        :key="index"
        class="item-container"
      >
        <div
          :style="{ backgroundImage: `url(${item.image})` }"
          class="item-image"
        />

        <span class="item-title">
          {{  item.title  }}
        </span>

        <span class="item-price">
          R$ {{  item.price.actual  }}

          <span class="old-price">
            R$ {{  item.price.old  }}
          </span>
        </span>

        <div class="discount-badge-container">
          <div v-if="itemHasDiscount(item.price)" class="discount-badge">
            {{ getDiscountValue(item.price) }}% OFF
          </div>
        </div>

        <div class="badge-container">
          <div
            v-for="(badge, index_badge) in item.badges"
            :key="`badge-${index_badge}`"
            class="item-badge"
          >
            <template v-if="badge.type === 'quality'">
              {{ badge.value }}
            </template>

            <template v-else-if="badge.type === 'trade'">
              TRADE
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputSelect from '../../components/inputs/InputSelect.vue';
  import bookImage from '../../static/search/book-example.png';

  export default {
    name: 'SearchPage',
    components: {
      InputSelect,
    },

    data() {
      return {
        search_value: '',
        condition: '',
        gender: '',
        editor: '',
        region: '',
        rarity: '',
        catalog_items: [
          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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

          {
            id: 1,
            image: bookImage,
            title: 'O Pequeno Príncipe, edição especial muito boa mesmo :D',
            price: {
              actual: '54.80',
              old: '62.90',
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
        ],
      }
    },

    computed: {
      getConditionOptions() {
        return [
          {
            value: 'great',
            label: 'Ótimo, nenhum defeito',
          },

          {
            value: 'good',
            label: 'Bom, poucos amassados',
          },

          {
            value: 'medium',
            label: 'Alguns amassados',
          },

          {
            value: 'bad',
            label: 'Um pouco acabado',
          },

          {
            value: 'horrible',
            label: 'Muito acabado',
          },
        ];
      },

      getGenderOptions() {
        return [
          {
            label: 'Ação',
            value: 'action',
          },
          {
            label: 'Autoajuda',
            value: 'selfhelp',
          },
          {
            label: 'Distopia',
            value: 'dystopia',
          },
          {
            label: 'Fantasia',
            value: 'fantasy',
          },
          {
            label: 'Ficção',
            value: 'fiction',
          },
          {
            label: 'Horror',
            value: 'horror',
          },
          {
            label: 'infantil',
            value: 'childish',
          },
          {
            label: 'Jovem adulto',
            value: 'newadult',
          },
          {
            label: 'Policial',
            value: 'police',
          },
          {
            label: 'Romance',
            value: 'romance',
          },
          {
            label: 'Suspense',
            value: 'thriller',
          },
        ];
      },

      getEditorOptions() {
        return [
          {
            label: 'Adicionar depois',
            value: 'aa',
          },
        ]
      },

      getRegionOptions() {
        return [
          {
            label: 'Adicionar depois',
            value: 'aa',
          },
        ]
      },

      getRarityOptions() {
        return [
          {
            label: 'Adicionar depois',
            value: 'aa',
          },
        ]
      },

      getFilterOptions() {
        return [
          {
            value: 'more_relevant',
            label: 'mais relevantes',
          },
          {
            value: 'recently',
            label: 'mais recentes',
          },
          {
            value: 'lower_price',
            label: 'menor preço',
          },
          {
            value: 'biggest_price',
            label: 'maior preço',
          },
        ];
      },

      getRouteQuerySearch() {
        return this.$route.query.q
      },

      getItemsQuantity() {
        return this.catalog_items.length;
      },
    },

    watch: {
      getRouteQuerySearch() {
        this.search_value = this.getRouteQuerySearch;
      },
    },

    mounted() {
      this.search_value = this.getRouteQuerySearch;
    },

    methods: {
      itemHasDiscount(price) {
        if (parseInt(price.old) > parseInt(price.actual)) {
          return true;
        }

        return false;
      },

      getDiscountValue(price) {
        const discount = price.old - price.actual;
        const percentageDiscount = (discount / price.old) * 100;

        return percentageDiscount.toFixed(2);
      },
    },
  }
</script>

<stytle scoped lang=scss>
  .default-container {
    padding: 60px 100px;
  }

  .search-container {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .input-container {
    display: flex;
    width: 50%;
    flex-direction: column;
  }

  .search-inputs {
    gap: 10px;
    width: 100%;
    display: flex;
  }

  .items-quantity-text {
    font-size: 12px;
  }

  .result-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 10px;

    .item-container {
      display: flex;
      flex-direction: column;
      width: 250px;
      cursor: pointer;
      position: relative;

      .discount-badge-container {
        position: absolute;
        display: flex;
        padding: 10px;
        gap: 6px;
        left: 0;
        top: 0;

        .discount-badge {
          color: $white;
          background-color: rgba(green, .3);
          font-weight: bold;
          font-size: 12px;
          border-radius: 5px;
          padding: 0px 12px;
          min-height: 30px;
          max-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .badge-container {
        position: absolute;
        display: flex;
        padding: 10px;
        gap: 6px;
        right: 0;
        top: 0;

        .item-badge {
          color: $white;
          background-color: rgba($black, .3);
          font-weight: bold;
          font-size: 12px;
          border-radius: 5px;
          padding: 0px 12px;
          min-height: 30px;
          max-height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .item-image {
        width: inherit;
        height: 333px;
        background-position: center;
        background-size: cover;
        border-radius: 5px;
        box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
      }

      .item-title {
        font-size: 14px;
        line-height: 22px;
        margin-top: 0.5rem;
        font-weight: bold;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .item-price {
        font-size: 18px;
        color: #FA9C0A;

        .old-price {
          font-size: 14px;
          color: #DBDBDB;
          text-decoration-line: line-through;
        }
      }
    }
  }

  .filter-input {
    width: 140px !important;
  }

  input {
    height: 38px;
    color: $black;
    outline: 0;
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    border-color: $light-grey;
    transition: all .3s;
    padding: 0px .5rem;
    font-size: 12px;
  }

  input:focus {
    border-color: $primary-orange;
    outline: 1px normal #000
  }

  ::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #D6D6D6;
    opacity: 1; /* Firefox */
  }
</stytle>