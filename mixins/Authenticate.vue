<script>
  export default {
    name: 'MiddlewareAuthenticate',
    middleware({ store, redirect }) {
      const { getters: { getUser } } = store;

      if (! getUser?.user?.id) {
        return redirect('/login')
      }
    },
  }
</script>