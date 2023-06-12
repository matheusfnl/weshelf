<template>
  <div class="gender-filter-container">
    <div class="title mb-3">
      navegue por gênero
    </div>

    <div class="all-items-container">
      <div class="filter-container">
        <div
          v-for="(filter, index) in filters"
          :key="index"
          class="filter-item"
          @click="getSearchRoute(filter)"
        >
          <div class="icon-container mb-2">
            <img
              :src="filter.icon"
              class="icon"
            >
          </div>

          <div class="name">
            {{ filter.name }}
          </div>
        </div>
      </div>

      <div class="bottom-line" />
    </div>
  </div>
</template>

<script>
  import actionIcon from '../../static/home/filters/action.png'
  import allIcon from '../../static/home/filters/all.png'
  import childishIcon from '../../static/home/filters/childish.png'
  import dystopiaIcon from '../../static/home/filters/dystopia.png'
  import fantasyIcon from '../../static/home/filters/fantasy.png'
  import fictionIcon from '../../static/home/filters/fiction.png'
  import horrorIcon from '../../static/home/filters/horror.png'
  import newadultIcon from '../../static/home/filters/newadult.png'
  import policeIcon from '../../static/home/filters/police.png'
  import romanceIcon from '../../static/home/filters/romance.png'
  import selfhelpIcon from '../../static/home/filters/selfhelp.png'
  import thrillerIcon from '../../static/home/filters/thriller.png'

  export default {
    name: 'GenderFilter',
    data() {
      return {
        filters: [
          {
            name: 'Todos',
            icon: allIcon,
            search: '',
          },
          {
            name: 'Ação',
            icon: actionIcon,
            search: 'action',
          },
          {
            name: 'Autoajuda',
            icon: selfhelpIcon,
            search: 'selfhelp',
          },
          {
            name: 'Distopia',
            icon: dystopiaIcon,
            search: 'dystopia',
          },
          {
            name: 'Fantasia',
            icon: fantasyIcon,
            search: 'fantasy',
          },
          {
            name: 'Ficção',
            icon: fictionIcon,
            search: 'fiction',
          },
          {
            name: 'Horror',
            icon: horrorIcon,
            search: 'horror',
          },
          {
            name: 'infantil',
            icon: childishIcon,
            search: 'childish',
          },
          {
            name: 'Jovem adulto',
            icon: newadultIcon,
            search: 'newadult',
          },
          {
            name: 'Policial',
            icon: policeIcon,
            search: 'police',
          },
          {
            name: 'Romance',
            icon: romanceIcon,
            search: 'romance',
          },
          {
            name: 'Suspense',
            icon: thrillerIcon,
            search: 'thriller',
          },
        ],
      }
    },

    methods: {
      getSearchRoute(filter) {
        return this.$router.push({
          path: '/search',
          query: { g: filter.search },
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .gender-filter-container {
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .title {
    color: $dark-orange;
    font-size: 20px;
    line-height: 24px;
    font-weight: bold;
  }

  .filter-container {
    padding: 0 24px;
    display: flex;

    .filter-item {
      width: 120px;
      height: 80px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;
      box-sizing: border-box;

      &:hover { border-bottom: 4px solid $dark-orange; box-sizing: border-box; }

      .name {
        color: $dark-orange;
        font-size: 12px;
        line-height: 15px;
        font-weight: 600;
      }

      .icon-container {
        .icon {
          width: 29px;
          height: 29px;
          -webkit-filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
          filter: drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.2));
        }
      }
    }
  }

  .all-items-container {
    display: flex;
    flex-direction: column;
    align-items: center;

    .bottom-line {
      width: calc(100% - 48px);
      height: 2px;
      background-color: #E3E3E3;
    }
  }
</style>