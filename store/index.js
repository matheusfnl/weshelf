import { v4 as uuid4 } from 'uuid';
import { supabase } from '../src/lib//supabaseClient'

export const state = () => ({
  auth: {},
  user: {},
  catalogo_produtos: [],
})

export const actions = {
  async registerUser({ dispatch }, { email, password, name, arroba }) {
    const { data, error } = await supabase.auth.signUp(
      { email, password },
    );

    if (!error) {
      const { error } = dispatch('loginUser', { email, password })

      if (!error) {
        return await supabase
          .from('user_public_data')
          .insert({
            user_id: data.user.id,
            name,
            arroba,
          })
      }

      return true;
    }
  },

  async loginUser({ commit }, { email, password }) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (!error) {
      const { data: userData, error: error2 } = await supabase
        .from('user_public_data')
        .select()
        .eq('user_id', data.user.id)

      if (! error2) {
        return commit('newAuthentication', userData[0])
      }
    }

    return true;
  },

  async logoutUser({ commit }) {
    const { error } = await supabase.auth.signOut()

    if (!error) {
      return commit('newAuthentication', {})
    }

    return true;
  },

  async fetchUser({ commit }, arroba) {
    const { data, error } = await supabase
      .from('user_public_data')
      .select()
      .eq('arroba', arroba)

    if (! error) {
      return commit('newUser', data[0])
    }

    return true;
  },

  async setAuthentication({ commit }, data) {
    const { data: userData, error: error2 } = await supabase
      .from('user_public_data')
      .select()
      .eq('user_id', data.user.id)

    if (! error2) {
      return commit('newAuthentication', userData[0])
    }

    return true;
  },

  async createProduto(context, {
    userArroba,
    titulo,
    preco,
    livroNome,
    editora,
    trocas,
    genero,
    doacao,
    estado,
    raridade,
    descricao,
    images,
    userId,
  }) {
    try {
      const imagesNames = [];

      images.forEach(async (image) => {
        const imageName = `${userId}/${uuid4()}`;

        imagesNames.push(imageName)

        await supabase
          .storage
          .from('images')
          .upload(imageName, image)
      });

      const response = await supabase
        .from('produto')
        .insert({
          user_arroba: userArroba,
          titulo,
          preco,
          livro_nome: livroNome,
          editora,
          trocas,
          genero,
          doacao,
          estado,
          raridade,
          descricao,
          images: imagesNames,
        })
        .select()

      return {
        ...response.data[0],
        error: false,
      };
    } catch (err) {
      return { error: true };
    }
  },

  async fetchProdutos({ commit }, { search = '', estado, genero, rarity }) {
    const { data, error } = await supabase
      .from('produto')
      .select()
      // .textSearch('titulo', search ? estado : undefined)
      // .eq('estado', estado !== '' ? estado : undefined)
      // .eq('genero', genero !== '' ? genero : undefined)
      // .eq('raridade', rarity !== '' ? rarity : undefined)

    if (! error) {
      commit('newCatalogoProdutos', data);
    }

    return true;
  },
}

export const mutations = {
  newAuthentication(state, data) {
    state.auth = data;
  },

  newUser(state, user) {
    state.user = user;
  },

  newCatalogoProdutos(state, data) {
    state.catalogo_produtos = data;
  },
}

export const getters = {
  getAuthentication(state) { return state.auth },
  getUser(state) {return state.user },
  getCatalogoProdutos(state) {return state.catalogo_produtos },
}