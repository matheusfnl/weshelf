<script>
  export default {
    name: 'MiddlewareAuthenticate',
    middleware({ store, redirect }) {
      const user = JSON.parse(localStorage.getItem('sb-ybhmnejynxteqinaedha-auth-token'))

      if (! user.user.id) {
        return redirect('/login')
      }
    },
  }
</script>