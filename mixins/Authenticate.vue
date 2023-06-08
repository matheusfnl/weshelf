<script>
  export default {
    name: 'MiddlewareAuthenticate',
    middleware({ store, redirect }) {
      const { getters: { getAuthentication } } = store;

      if (! getAuthentication?.user_id) {
        return redirect('/login')
      }
    },
  }
</script>