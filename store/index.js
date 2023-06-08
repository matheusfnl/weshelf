import { supabase } from '../src/lib//supabaseClient'

export const state = () => ({
  user: {},
})

export const actions = {
  async registerUser({ dispatch }, { email, password }) {
    await supabase.auth.signUp(
      { email, password },
    );

    dispatch('loginUser', { email, password })
  },

  async loginUser({ commit }, { email, password }) {
    const { data } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    commit('newUser', { data })
  },

  async logoutUser() {
    await supabase.auth.signOut()
  },

  setUser({ commit }, data) {
    commit('newUser', { data })
  },
}

export const mutations = {
  newUser(state, { data }) {
    state.user = data;
  },
}

export const getters = {
  getUser(state) { return state.user },
}