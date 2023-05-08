<template>
  <div>
    <WSCarousel :resources="resources" />
  </div>
</template>

<script>
  import WSCarousel from '../components/home/WSCarousel.vue'

  import banner1 from '../static/home/banner1.png'

  export default {
    name: 'MainPage',
    components: {
      WSCarousel,
    },

    data() {
      return {
        resources: [
          {
            src: banner1,
            link: '#',
          },
          {
            src: banner1,
            link: '#',
          },
        ],
      }
    },
  }
</script>
