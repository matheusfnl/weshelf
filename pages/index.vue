<template>
  <div>
    <WSCarousel :resources="carousel_resources" />
    <div class="default-margin">
      <WSFavHistory :resources="fav_histories" />
      <WSGenderFilter />
      <WSMostWanted />
    </div>
  </div>
</template>

<script>
  import WSCarousel from '../components/home/WSCarousel.vue'
  import WSFavHistory from '../components/home/WSFavHistory.vue'
  import WSGenderFilter from '../components/home/WSGenderFilter.vue'
  import WSMostWanted from '../components/home/WSMostWanted.vue'

  import carouselBanner1 from '../static/home/banner1.png'

  import favHistory1 from '../static/home/favh-1.png'
  import favHistory2 from '../static/home/favh-2.png'
  import favHistory3 from '../static/home/favh-3.png'
  import favHistory4 from '../static/home/favh-4.jpg'

  export default {
    name: 'MainPage',
    components: {
      WSCarousel,
      WSFavHistory,
      WSGenderFilter,
      WSMostWanted,
    },

    data() {
      return {
        carousel_resources: [ {
          src: carouselBanner1,
          link: '#',
        }],

        fav_histories: [
          {
            title: 'sucessos de Stephen King',
            subtitle: 'entretando não recomendamos ler antes de dormir',
            image: favHistory1,
            search: {
              keyword: 'Stephen King',
              gender: '',
            },
          },
          {
            title: 'aquele dos anéis',
            subtitle: 'a saga mais famosa de todos os tempos e blá blá blá',
            image: favHistory2,
            search: {
              keyword: 'Senhor dos anéis',
              gender: '',
            },
          },
          {
            title: 'amorzinho para suspirar',
            subtitle: 'de Romeu e Julieta até histórias de princesas, tem tudo',
            image: favHistory3,
            search: {
              keyword: '',
              gender: 'romance',
            },
          },
          {
            title: 'uma jornada épica',
            subtitle: 'universos inexplorados e histórias de outro mundo',
            image: favHistory4,
            search: {
              keyword: '',
              gender: 'fiction',
            },
          },
        ],
      }
    },
  }
</script>

<style scoped>
  .default-margin {
    padding: 52px 100px;
    display: flex;
    flex-direction: column;
    gap: 52px;
    overflow: hidden;
  }
</style>