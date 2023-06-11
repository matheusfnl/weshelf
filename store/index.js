import { v4 as uuid4 } from 'uuid';
import { supabase } from '../src/lib//supabaseClient'

export const state = () => ({
  auth: {},
  user: {},
  catalogo_produtos: [],
  produto: {},
  user_produtos: [],
  venda_local: [],
  venda: {},
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
      commit('newAuthentication', {})
      commit('newCatalogoProdutos', [])
      commit('newProduto', {})
      commit('newUserProducts', [])
      commit('newVendaLocal', [])
      commit('newVenda', {})
      commit('newUser', {})

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
          preco: parseFloat(preco),
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

      const { data } = await supabase.from('user_public_data').select().eq('arroba', userArroba)
      const { qtd_anuncios: qtdAnuncios } = data[0];
      const newQuantity = qtdAnuncios + 1;

      await supabase
        .from('user_public_data')
        .update({ qtd_anuncios: newQuantity })
        .eq('arroba', userArroba);

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
      .eq('visivel', true)
      // .textSearch('titulo', search ? estado : undefined)
      // .eq('estado', estado !== '' ? estado : undefined)
      // .eq('genero', genero !== '' ? genero : undefined)
      // .eq('raridade', rarity !== '' ? rarity : undefined)

    if (! error) {
      return commit('newCatalogoProdutos', data);
    }

    return true;
  },

  async fetchProduto({ commit }, { id }) {
    const { data, error }= await supabase
      .from('produto')
      .select()
      .eq('id', id)

    if (! error) {
      return commit('newProduto', data[0])
    }

    return true;
  },

  async fetchUserProducts({ commit }, { arroba }) {
    const { data, error } = await supabase
      .from('produto')
      .select()
      .eq('user_arroba', arroba);

    if (! error) {
      return commit('newUserProducts', data);
    }

    return true;
  },

  async removeProdutoVenda(context, { id, compradorArroba, vendedorArroba }) {
    try {
      const { data: oldData } = await supabase.from('venda').select().eq('comprador_arroba', compradorArroba).neq('finalizada', true);

      if (oldData.length) {
        const { produtos_id: produtosId } = oldData[0];

        if (produtosId.includes(id)) {
          produtosId.splice(produtosId.indexOf(id), 1);

          if (produtosId.length) {
            await supabase
              .from('venda')
              .update({
                produtos_id: produtosId,
                vendedor_arroba: vendedorArroba,
              })
              .eq('comprador_arroba', compradorArroba)
              .single();
          } else {
            await supabase
              .from('venda')
              .delete()
              .eq('comprador_arroba', compradorArroba);
          }

          await supabase
            .from('produto')
            .update({ visivel: true })
            .eq('id', id)
        }
      }
    } catch (err) {
      return true
    }
  },

  async addProdutoVenda(context, { id, vendedorArroba, compradorArroba }) {
    try {
      const { data: oldData } = await supabase.from('venda').select().eq('comprador_arroba', compradorArroba).neq('finalizada', true);

      if (oldData.length) {
        const {
          produtos_id: produtosId,
          vendedor_arroba: oldVendedorArroba,
        } = oldData[0];

        if (! produtosId.includes(id)) {
          produtosId.push(id);

          const novoArroba = oldVendedorArroba

          if (!oldVendedorArroba.includes(vendedorArroba)) {
            novoArroba.push(vendedorArroba)
          }

          await supabase
            .from('venda')
            .update({
              produtos_id: produtosId,
              vendedor_arroba: novoArroba,
            })
            .eq('comprador_arroba', compradorArroba)

          await supabase
            .from('produto')
            .update({ visivel: false })
            .eq('id', id)
        }

        return;
      }

      await supabase
        .from('venda')
        .insert({
          comprador_arroba: compradorArroba,
          vendedor_arroba: [vendedorArroba],
          produtos_id: [id],
        })

      await supabase
        .from('produto')
        .update({ visivel: false })
        .eq('id', id)
    } catch (err) {
      return true
    }
  },

  async fetchVenda({ commit }, { compradorArroba }) {
    try {
      const { data } = await supabase
        .from('venda')
        .select()
        .eq('comprador_arroba', compradorArroba)
        .neq('finalizada', true);

      commit('newVenda', data[0]);

      const { produtos_id: produtosId } = data[0]

      const { data: produtos } = await supabase
        .from('produto')
        .select()
        .in('id', produtosId);

      commit('newVendaLocal', produtos);
    } catch (err) {
      return true;
    }
  },

  async finishVenda({ commit, getters }, { idVenda }) {
    try {
      const { getCarrinho } = getters;
      const itemsQuantidade = []

      for (const item of getCarrinho) {
        const { user_arroba: userArroba } = item;

        if (itemsQuantidade[userArroba]) {
          itemsQuantidade[userArroba].quantity++;
        } else {
          itemsQuantidade[userArroba] = { arroba: userArroba, quantity: 1 };
        }
      }

      await supabase
        .from('venda')
        .update({ finalizada: true })
        .eq('id', idVenda)

      Object.values(itemsQuantidade).forEach(async (item) => {
        const { data } = await supabase.from('user_public_data').select().eq('arroba', item.arroba);
        const { qtd_vendidos: qtdVendidos } = data[0];

        const newQuantity = parseInt(qtdVendidos) + parseInt(item.quantity);

        await supabase
          .from('user_public_data')
          .update({ qtd_vendidos: newQuantity })
          .eq('arroba', item.arroba);
      });

      commit('newVendaLocal', [])
      commit('newVenda', {})
    } catch (err) {
      return true;
    }
  },

  addProdutoVendaLocal({ commit }, { produto }) {
    commit('newAddProdutoVendaLocal', produto)
  },

  removeProdutoVendaLocal({ commit }, { produto }) {
    commit('newRemoveProdutoVendaLocal', produto.id)
  },
}

export const mutations = {
  newAuthentication(state, data) {
    state.auth = data;
  },

  newUser(state, data) {
    state.user = data;
  },

  newCatalogoProdutos(state, data) {
    state.catalogo_produtos = data;
  },

  newProduto(state, data) {
    state.produto = data;
  },

  newUserProducts(state, data) {
    state.user_produtos = data;
  },

  newAddProdutoVendaLocal(state, data) {
    state.venda_local.push(data);
  },

  newRemoveProdutoVendaLocal(state, data) {
    state.venda_local.splice(state.venda_local.findIndex(objeto => objeto.id === data), 1);
  },

  newVendaLocal(state, data) {
    state.venda_local = data;
  },

  newVenda(state, data) {
    state.venda = data;
  },
}

export const getters = {
  getAuthentication(state) { return state.auth },
  getUser(state) { return state.user },
  getCatalogoProdutos(state) { return state.catalogo_produtos },
  getProduto(state) { return state.produto },
  getUserProductsData(state) { return state.user_produtos },
  getCarrinho(state) { return state.venda_local },
  getVenda(state) { return state.venda },
}