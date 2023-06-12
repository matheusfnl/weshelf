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
  barganha_compra: {},
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

  async createProduto({ commit, getters }, {
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
    prateleira,
    criarPreteleira,
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
          prateleira,
        })
        .select()

      const { data } = await supabase.from('user_public_data').select().eq('arroba', userArroba)
      const {
        qtd_anuncios: qtdAnuncios,
        prateleiras,
      } = data[0];
      const newQuantity = qtdAnuncios + 1;

      const novaPrateleira = prateleiras || []

      if (criarPreteleira && prateleira) {
        if (! novaPrateleira.includes(prateleira)) {
          novaPrateleira.push(prateleira);
        }
      }

      await supabase
        .from('user_public_data')
        .update({
          qtd_anuncios: newQuantity,
          prateleiras: novaPrateleira,
        })
        .eq('arroba', userArroba);

      const { getAuthentication } = getters

      commit('newAuthentication', {
        ...getAuthentication,
        prateleiras: novaPrateleira,
      })

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

  async addProdutoVenda({ getters, commit }, { id, vendedorArroba, compradorArroba }) {
    try {
      const { data: oldData } = await supabase.from('venda').select().eq('comprador_arroba', compradorArroba).neq('finalizada', true);
      const { getCarrinho } = getters

      if (getCarrinho.length && getCarrinho[0].barganha) {
        commit('newVendaLocal', [])
        commit('newBarganhaCompra', {})
      }

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

  async deleteVenda({ commit }, { compradorArroba }) {
    try {
      await supabase
      .from('venda')
      .delete()
      .eq('comprador_arroba', compradorArroba);
    } catch (err) {
      return true;
    }
  },

  async createBarganha(context, { compradorArroba, vendedorArroba, produtoOferecido, produtoRequerido, mensagem }) {
    try {
      await supabase
        .from('barganha')
        .insert({
          comprador_arroba: compradorArroba,
          vendedor_arroba: vendedorArroba,
          produto_oferecido: produtoOferecido,
          produto_requerido: produtoRequerido,
          mensagem,
        })

    } catch (err) {
      return true;
    }
  },

  async fetchMinhasBarganhas(context, { arroba }) {
    try {
      const { data } = await supabase
        .from('barganha')
        .select()
        .eq('comprador_arroba', arroba)

      return data;
    } catch (err) {
      return true;
    }
  },

  async fetchMinhasPropostas(context, { arroba }) {
    try {
      const { data } = await supabase
        .from('barganha')
        .select()
        .eq('vendedor_arroba', arroba)

      return data;
    } catch (err) {
      return true;
    }
  },

  async adicionaRemoveWishlist({ commit, getters }, { id, nome, imagem, arroba, userArroba }) {
    try {
      const { getAuthentication } = getters;
      const { wishlist } = getAuthentication;

      const wishlistOriginal = Array.from(wishlist);

      const wishlistIds = wishlistOriginal.map(item => item.id)

      if (wishlistIds.includes(id)) {
        const newWishlist = wishlistOriginal.filter(item => item.id !== id)

        await supabase
          .from('user_public_data')
          .update({ wishlist: newWishlist })
          .eq('arroba', userArroba)

        return commit('newAuthentication', {
          ...getAuthentication,
          wishlist: newWishlist,
        })
      }

      wishlistOriginal.push({
        id,
        nome,
        imagem,
        arroba,
      })

      await supabase
        .from('user_public_data')
        .update({ wishlist: wishlistOriginal })
        .eq('arroba', userArroba)

      return commit('newAuthentication', {
        ...getAuthentication,
        wishlist: wishlistOriginal,
      })
    } catch (err) {
      return true;
    }
  },

  async deleteBarganha(context, { id }) {
    try {
      await supabase
        .from('barganha')
        .delete()
        .eq('id', id);
    } catch (err) {
      return true
    }
  },

  async changeBarganhaStatus(context, { id, status }) {
    try {
      await supabase
        .from('barganha')
        .update({ status })
        .eq('id', id);
    } catch (err) {
      return true
    }
  },

  async payBarganha({ getters, commit }) {
    try {
      let field = {}

      const {
        getBarganhaCompra,
        getAuthentication,
      } = getters

      const {
        produto_oferecido: produtoOferecido,
        produto_requerido: produtoRequerido,
        id,
        comprador_pago: compradorPago,
        vendedor_pago: vendedorPago,
      } = getBarganhaCompra;

      if (produtoOferecido.arroba === getAuthentication.arroba) {
        if (vendedorPago) {
          field = {
            'comprador_pago': true,
            'status': 'finished',
          }

          await supabase
            .from('produto')
            .update({ visivel: false })
            .eq('id', produtoOferecido.id)

          await supabase
            .from('produto')
            .update({ visivel: false })
            .eq('id', produtoRequerido.id)
        }
        else {
          field = {'comprador_pago': true}
        }
      }
      else if (compradorPago) {
        field = {
          'vendedor_pago': true,
          'status': 'finished',
        }

        await supabase
          .from('produto')
          .update({ visivel: false })
          .eq('id', produtoOferecido.id)

        await supabase
          .from('produto')
          .update({ visivel: false })
          .eq('id', produtoRequerido.id)
      } else {
        field = {'vendedor_pago': true}
      }

      await supabase
        .from('barganha')
        .update(field)
        .eq('id', id);

      commit('newVendaLocal', [])
      commit('newVenda', {})
    } catch (err) {
      return true
    }
  },

  async addVendaLocal({ commit }, { id }) {
    try {
      const { data } = await supabase
        .from('produto')
        .select()
        .eq('id', id);

      commit('newVendaLocal', [{
        ...data[0],
        barganha: true,
        preco: 0,
      }])
    } catch (err) {
      return true;
    }
  },

  addBarganhaCompra({ commit }, data) {
    commit('newBarganhaCompra', data)
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

  newBarganhaCompra(state, data) {
    state.barganha_compra = data;
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
  getBarganhaCompra(state) { return state.barganha_compra },
}