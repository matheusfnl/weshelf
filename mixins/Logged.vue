<script>
  export default {
    name: 'MiddlewareLogged',
    middleware({ store, redirect }) {
      const user = JSON.parse(localStorage.getItem('sb-ybhmnejynxteqinaedha-auth-token'))

      if (user?.user?.id) {
        return redirect('/')
      }
    },
  }
</script>