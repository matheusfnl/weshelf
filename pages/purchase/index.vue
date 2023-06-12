<template>
  <div>
    <div class="purchase-container">
      <div class="title">
        Finalize a compra do seu livro!
      </div>

      <div v-if="!request_pending" class="form">
        <div class="form-part-1">
          <InputText
            id="emailCompra"
            label="EMAIL DE CONFIRMAÇÃO"
            placeholder="luizpaulo.assuncao98@mail.com"
            required
            :value="email"
            :validations="validate?.errors?.first('email')"
            @input="validate.reset('email')"
            @blur="validate.validate('email', email)"
            @model="email = $event"
          />

          <InputText
            id="nomeCompra"
            label="NOME COMPLETO"
            placeholder="Luiz Paulo Ribeiro Assunção"
            required
            :value="nome"
            :validations="validate?.errors?.first('name')"
            @input="validate.reset('name')"
            @blur="validate.validate('name', nome)"
            @model="nome = $event"
          />

          <div class="personal-info-container">
            <InputText
              id="cpfAnuncio"
              label="CPF"
              required
              type="number"
              placeholder="000.000.000-00"
              :value="cpfcnpj"
              :validations="validate?.errors?.first('cpfcnpj')"
              @input="validate.reset('cpfcnpj')"
              @blur="validate.validate('cpfcnpj', cpfcnpj)"
              @model="cpfcnpj = $event"
            />

            <InputText
              id="telefoneAnuncio"
              label="TELEFONE"
              required
              type="number"
              placeholder="(31) 91234-5678"
              :value="telefone"
              :validations="validate?.errors?.first('phone')"
              @input="validate.reset('phone')"
              @blur="validate.validate('phone', telefone)"
              @model="telefone = $event"
            />
          </div>

          <div class="personal-info-container">
            <div class="content-container">
              <span class="adress-title-container">
                <span class="address-title">
                  Endereço de entrega
                </span>

                <span class="change-address" @click="alterarEndereco">
                  <template v-if="hasEndereco">
                    Alterar endereço
                  </template>

                  <template v-else>
                    Adicionar endereço
                  </template>
                </span>
              </span>

              <span v-if="hasEndereco" class="address-content">
                <span>
                  {{ endereco.rua }}, {{ endereco.numero }} {{ endereco.complemento }}
                </span>

                <span>
                  {{ endereco.bairro }}
                </span>

                <span>
                  {{ getFormattedCep }}
                </span>

                <span>
                  {{ endereco.cidade }}/{{ endereco.uf }}
                </span>
              </span>

              <span v-else class="no-address">
                nenhum endereço cadastrado
              </span>
            </div>

            <div class="content-container">
              <label>
                <div class="transportadora-container">
                  <div class="transportadora-info">
                    <input v-model="sedexChecked" type="checkbox" @change="updateTransportadoraSedex" />

                    <span>
                      {{ sedex.name }}
                    </span>
                  </div>

                  <div class="transportadora-price">
                    <span class="price">
                      R$ {{ formatDoisDecimais(sedex.preco) }}
                    </span>

                    <span class="time">
                      {{ sedex.frete }}
                    </span>
                  </div>
                </div>
              </label>

              <hr />

              <label>
                <div class="transportadora-container">
                  <div class="transportadora-info">
                    <input v-model="pacChecked" type="checkbox" @change="updateTransportadoraPac" />

                    <span>
                      {{ pac.name }}
                    </span>
                  </div>

                  <div class="transportadora-price">
                    <span class="price">
                      R$ {{ formatDoisDecimais(pac.preco) }}
                    </span>

                    <span class="time">
                      {{ pac.frete }}
                    </span>
                  </div>
                </div>
              </label>
            </div>
          </div>

          <hr />

          <div class="payment-container">
            <div class="payment-title">
              PAGAMENTO
            </div>
<!--
            <div class="cupom">
              <label>
                <input type="checkbox" />

                <span>
                  Possui código de desconto?
                </span>
              </label>
            </div> -->

            <div class="content-container">
              <label>
                <div class="payment-method-container">
                  <div class="payment-method-info">
                    <input v-model="payment_pix" type="checkbox" @change="checkPix" />

                    <span class="payment-icon">
                      <img :src="pixIcon" />
                    </span>

                    <span>
                      PIX
                    </span>
                  </div>

                  <div class="payment-method-price">
                    <span class="payment-info">
                      Aprovação imediata
                    </span>

                    <span class="incetivo">
                      mais utilizada!
                    </span>
                  </div>
                </div>
              </label>

              <hr />

              <label>
                <div class="payment-method-container">
                  <div class="payment-method-info">
                    <input v-model="payment_mercado_livre" type="checkbox" @change="checkMercadoLivre" />

                    <span class="payment-icon">
                      <img :src="mercadoLivreIcon" />
                    </span>

                    <span>
                      MERCADO LIVRE
                    </span>
                  </div>

                  <div class="payment-method-price">
                    <span class="payment-info">
                      Em até 6x sem juros
                    </span>
                  </div>
                </div>
              </label>

              <hr />

              <label>
                <div class="payment-method-container">
                  <div class="payment-method-info">
                    <input v-model="payment_boleto" type="checkbox" @change="checkBoleto" />

                    <span class="payment-icon">
                      <img :src="boletoIcon" />
                    </span>

                    <span>
                      BOLETO
                    </span>
                  </div>

                  <div class="payment-method-price">
                    <span class="payment-info">
                      Aprovação a partir de 3 dias úteis
                    </span>
                  </div>
                </div>
              </label>
            </div>

            <div class="warning-container mt-2">
              ATENÇÃO! Ao clicar em continuar você será redirecionado ao Mercado Pago para continuar o pagamento.
            </div>
          </div>
        </div>

        <div class="form-part-2">
          <div class="purchase-resume">
            <div class="resume-title mb-2">
              RESUMO DO SEU PEDIDO
            </div>

            <div v-for="(item, index) in getCarrinho" :key="index" class="resume-content" :class="{ 'mb-2' : index !== getCarrinho.length-1 }">
              <div
                class="resume-item-image"
                :style="{ backgroundImage: `url(${getImageUrl(item.images[0])})` }"
              />

              <div class="resume-item-info">
                <span class="profile">
                  @{{ item.user_arroba }}
                </span>

                <div class="nome-price-container">
                  <span class="book-name">
                    {{ item.livro_nome }}
                  </span>

                  <div class="price-remover-container">
                    <span class="price">
                      R$ {{ formatDoisDecimais(item.preco) }}
                    </span>

                    <span class="item-carrinho-remover" @click="removeItemFromCart(item)">
                      Remover
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr />

            <div class="resume-price-container">
              <div class="price-info-container">
                <span class="price-info">
                  Subtotal
                </span>

                <span class="price-info-price">
                  R$ {{ getTotalVendaPreco }}
                </span>
              </div>

              <div class="price-info-container">
                <span class="price-info">
                  Frete
                </span>

                <span class="price-info-price">
                  R$ {{ getFrete }}
                </span>
              </div>

              <div class="frete">
                {{ getFreteFeedback }}
              </div>
            </div>

            <hr />

            <div>
              <div class="resume-price-info-container">
                <span class="price-info">
                  Frete
                </span>

                <span class="price-info-price">
                  R$ {{ getTotalValorComFrete }}
                </span>
              </div>
            </div>
          </div>

          <div class="cotinue-container mt-3">
            <AppButton :request_pending="compra_request_pending" bold @click="finalizarCompra">
              CONTINUAR
            </AppButton>
          </div>
        </div>
      </div>

      <div v-else>
        <div class="loader-centralize">
          <MoonLoader
            color="#FE8133"
          />
        </div>
      </div>
    </div>

    <transition name="modal">
      <div v-if="should_show_modal" class="endereco-modal">
        <div class="backdrop" @click="closeModal" />

        <div class="content">
          <div class="endereco-title mb-4">
            Alterar o endereço
          </div>

          <InputText
            id="rua"
            label="RUA"
            required
            placeholder="Rua 1"
            :value="endereco_novo.rua"
            :validations="validate?.errors?.first('street')"
            @input="validate.reset('street')"
            @blur="validate.validate('street', endereco_novo.rua)"
            @model="endereco_novo.rua = $event"
          />

          <InputText
            id="numero"
            label="NUMERO"
            required
            type="number"
            placeholder="68"
            :value="endereco_novo.numero"
            :validations="validate?.errors?.first('number')"
            @input="validate.reset('number')"
            @blur="validate.validate('number', endereco_novo.numero)"
            @model="endereco_novo.numero = $event"
          />

          <InputText
            id="complemento"
            label="COMPLEMENTO"
            placeholder="APTO 421"
            :value="endereco_novo.complemento"
            @model="endereco_novo.complemento = $event"
          />

          <InputText
            id="bairro"
            label="BAIRRO"
            required
            placeholder="Vila Olímpica"
            :value="endereco_novo.bairro"
            :validations="validate?.errors?.first('neighbor')"
            @input="validate.reset('neighbor')"
            @blur="validate.validate('neighbor', endereco_novo.bairro)"
            @model="endereco_novo.bairro = $event"
          />

          <InputText
            id="cep"
            label="CEP"
            required
            placeholder="010101-010"
            type="number"
            :value="endereco_novo.cep"
            :validations="validate?.errors?.first('cep')"
            @input="validate.reset('cep')"
            @blur="validate.validate('cep', endereco_novo.cep)"
            @model="endereco_novo.cep = $event"
          />

          <InputText
            id="cidade"
            label="CIDADE"
            required
            placeholder="Betim"
            :value="endereco_novo.cidade"
            :validations="validate?.errors?.first('city')"
            @input="validate.reset('city')"
            @blur="validate.validate('city', endereco_novo.cidade)"
            @model="endereco_novo.cidade = $event"
          />

          <InputText
            id="estado"
            label="ESTADO"
            required
            placeholder="Minas Gerais"
            :value="endereco_novo.uf"
            :validations="validate?.errors?.first('state')"
            @input="validate.reset('state')"
            @blur="validate.validate('state', endereco_novo.uf)"
            @model="endereco_novo.uf = $event"
          />

          <div class="button-container mt-3">
            <AppButton bold @click="substituirEndereco">
              ALTERAR
            </AppButton>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import { Validator } from 'vee-validate';
  import { mapGetters, mapActions } from 'vuex';

  import MoonLoader from 'vue-spinner/src/MoonLoader.vue';
  import InputText from '../../components/inputs/InputText.vue';
  import AppButton from '../../components/inputs/AppButton.vue';

  import Authenticate from '../../mixins/Authenticate.vue'

  import pixIcon from '../../static/utils/pix.png';
  import mercadoLivreIcon from '../../static/utils/mercadolivre.png';
  import boletoIcon from '../../static/utils/boleto.png';
  import example1 from '../../static/product/example1.jpg';

  export default {
    name: 'PurchasePage',
    components: {
      InputText,
      AppButton,
      MoonLoader,
    },

    mixins: [Authenticate],
    data() {
      return {
        email: '',
        nome: '',
        cpfcnpj: '',
        telefone: '',
        pixIcon,
        mercadoLivreIcon,
        boletoIcon,
        example1,
        validate: {},
        payment_mercado_livre: false,
        payment_pix: false,
        payment_boleto: false,
        request_pending: false,
        should_show_modal: false,
        compra_request_pending: false,
        sedexChecked: false,
        pacChecked: false,
        endereco_novo: {
          rua: '',
          numero: '',
          complemento: '',
          bairro: '',
          cep: '',
          cidade: '',
          uf: '',
        },

        endereco: {},
        transportadora: {},
        sedex: {
          name: 'SEDEX',
          preco: 45.80,
          frete: 'Em até 1 dia útil',
        },

        pac: {
          name: 'PAC',
          preco: 24.20,
          frete: 'Em até 6 dias úteis',
        },
      }
    },

    computed: {
      ...mapGetters([
        'getCarrinho',
        'getAuthentication',
        'getVenda',
        'getBarganhaCompra',
      ]),

      getTotalVendaPreco() {
        let totalPreco = 0

        this.getCarrinho.forEach(item => {
          totalPreco += parseFloat(item.preco);
        });

        return this.formatDoisDecimais(parseFloat(totalPreco))
      },

      getFrete() {
        return this.formatDoisDecimais(parseFloat(this.transportadora.preco || 0))
      },

      getFreteFeedback() {
        return this.transportadora.frete || ''
      },

      getTotalValorComFrete() {
        return this.formatDoisDecimais(parseFloat(this.getFrete) + parseFloat(this.getTotalVendaPreco))
      },

      getFormattedCep() {
        const cep = this.endereco.cep.toString();

        return cep.slice(0, cep.length - 3) + "-" + cep.slice(-3);
      },

      hasEndereco() {
        return Object.keys(this.endereco).length
      },

      checkCanFinish() {
        return !! (this.validate?.errors?.items.length === 0 &&
          (this.payment_mercado_livre || this.payment_pix || this.payment_boleto) &&
          (this.sedexChecked || this.pacChecked) &&
          this.hasEndereco)
      },
    },

    watch: {
      getCarrinho: {
        handler(state) {
          if (! state.length) {
            return this.$router.push({ path: '/' })
          }
        },
        immediate: true,
      },
    },

    async mounted() {
      this.request_pending = true;

      await this.fetchVenda({ compradorArroba: this.getAuthentication.arroba })

      if (! this.getCarrinho.length) return;

      this.request_pending = false;

      this.validate = new Validator();
      this.validate.attach({
        name: 'email',
        rules: 'required|email',
        values: { email: this.email },
      });

      this.validate.attach({
        name: 'name',
        rules: 'required',
        values: { name: this.nome },
      });

      this.validate.attach({
        name: 'cpfcnpj',
        rules: 'required|max:11',
        values: { cpfcnpj: this.cpfcnpj },
      });

      this.validate.attach({
        name: 'phone',
        rules: 'required',
        values: { phone: this.telefone },
      });

      this.validate.attach({
        name: 'street',
        rules: 'required',
        values: { street: this.endereco_novo.rua },
      });

      this.validate.attach({
        name: 'number',
        rules: 'required',
        values: { number: this.endereco_novo.numero },
      });

      this.validate.attach({
        name: 'neighbor',
        rules: 'required',
        values: { neighbor: this.endereco_novo.bairro },
      });

      this.validate.attach({
        name: 'cep',
        rules: 'required|max:8',
        values: { cep: this.endereco_novo.cep },
      });

      this.validate.attach({
        name: 'city',
        rules: 'required',
        values: { city: this.endereco_novo.cidade },
      });

      this.validate.attach({
        name: 'state',
        rules: 'required',
        values: { state: this.endereco_novo.estado },
      });
    },

    methods: {
      ...mapActions([
        'removeProdutoVendaLocal',
        'removeProdutoVenda',
        'finishVenda',
        'fetchVenda',
        'payBarganha',
      ]),

      async finalizarCompra() {
        await this.validate.validate('email', this.email);
        await this.validate.validate('name', this.nome);
        await this.validate.validate('cpfcnpj', this.cpfcnpj);
        await this.validate.validate('phone', this.telefone);

        if (this.checkCanFinish) {
          if (! this.getBarganhaCompra?.id) {
            this.compra_request_pending = true;

            const error = await this.finishVenda({ idVenda: this.getVenda.id });

            if (! error) {
              this.$router.push({ path: '/' })
            }

            this.compra_request_pending = false;

            return;
          }

          this.compra_request_pending = true;

          const error = await this.payBarganha();

          if (! error) {
            this.$router.push({ path: '/' })
          }

          this.compra_request_pending = false;
        }
      },

      getImageUrl(image) {
        return `https://ybhmnejynxteqinaedha.supabase.co/storage/v1/object/public/images/${image}`;
      },

      updateTransportadoraPac() {
        this.transportadora = this.pac;
        this.sedexChecked = false;

        if (! this.pacChecked && ! this.sedexChecked) {
          this.transportadora = {};
        }
      },

      updateTransportadoraSedex() {
        this.transportadora = this.sedex;
        this.pacChecked = false;

        if (! this.pacChecked && ! this.sedexChecked) {
          this.transportadora = {};
        }
      },

      formatDoisDecimais(value) {
        return parseFloat(value).toFixed(2)
      },

      alterarEndereco() {
        this.should_show_modal = true;

        this.endereco_novo = {
          rua: this.endereco.rua || '',
          numero: this.endereco.numero || '',
          complemento: this.endereco.complemento || '',
          bairro: this.endereco.bairro || '',
          cep: this.endereco.cep || '',
          cidade: this.endereco.cidade || '',
          uf: this.endereco.uf || '',
        };
      },

      async closeModal() {
        this.should_show_modal = false;
        this.endereco_novo = {}

        await this.validate.reset('street')
        await this.validate.reset('number')
        await this.validate.reset('neighbor')
        await this.validate.reset('cep')
        await this.validate.reset('city')
        await this.validate.reset('state')
      },

      async substituirEndereco() {
        await this.validate.reset('email')
        await this.validate.reset('name')
        await this.validate.reset('cpfcnpj')
        await this.validate.reset('phone')

        await this.validate.validate('street', this.endereco_novo.rua);
        await this.validate.validate('number', this.endereco_novo.numero);
        await this.validate.validate('neighbor', this.endereco_novo.bairro);
        await this.validate.validate('cep', this.endereco_novo.cep);
        await this.validate.validate('city', this.endereco_novo.cidade);
        await this.validate.validate('state', this.endereco_novo.uf);

        if (this.validate?.errors?.items.length === 0) {
          this.endereco = {
            rua: this.endereco_novo.rua,
            numero: this.endereco_novo.numero,
            complemento: this.endereco_novo.complemento,
            bairro: this.endereco_novo.bairro,
            cep: this.endereco_novo.cep,
            cidade: this.endereco_novo.cidade,
            uf: this.endereco_novo.uf,
          };

          this.closeModal();
        }
      },

      async removeItemFromCart(produto) {
        const arrayDeArrobas = this.getCarrinho.map(objeto => objeto.user_arroba)
        const arrobasSemRepeticao = [...new Set(arrayDeArrobas)];
        const ocorrencias = arrayDeArrobas.filter(item => item === produto.user_arroba).length

        if (ocorrencias === 1) {
          arrobasSemRepeticao.splice(arrobasSemRepeticao.indexOf(produto.user_id), 1);
        }

        const error = await this.removeProdutoVenda({
          id: produto.id,
          compradorArroba: this.getAuthentication.arroba,
          vendedorArroba: arrobasSemRepeticao,
        })

        if (! error) {
          this.removeProdutoVendaLocal({ produto })
        }
      },

      checkPix() {
        this.payment_mercado_livre = false;
        this.payment_boleto = false;
      },

      checkMercadoLivre() {
        this.payment_pix = false;
        this.payment_boleto = false;
      },

      checkBoleto() {
        this.payment_mercado_livre = false;
        this.payment_pix = false;
      },
    },
  }
</script>

<style scoped lang="scss">
  .purchase-container {
    padding: 60px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .title {
      font-size: 45px;
      line-height: 54px;
      font-weight: bold;
      color: $primary-yellow;
    }

    .form {
      display: flex;
      width: 100%;
      padding: 0 10%;
      margin-top: 40px;

      &-part-1 {
        margin-right: 24px;
        flex: 1 0 auto;
      }

      &-part-2 { flex: 0 1 auto; }

      .purchase-resume {
        width: 410px;
      }

      .personal-info-container {
        display: flex;
        gap: 12px;

        .adress-title-container {
          display: flex;
          justify-content: space-between;

          .address-title {
            color: #777777;
            font-size: 12px;
          }

          .change-address {
            color: $primary-orange;
            font-size: 10px;
            cursor: pointer;

            &:hover { text-decoration: underline; }
          }
        }

        .no-address {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70%;
          font-weight: 400;
          opacity: 0.4;
        }

        .address-content {
          display: flex;
          flex-direction: column;

          span {
            font-size: 12px;
            font-weight: bold;
          }
        }

        .transportadora-container {
          display: flex;
          align-items: center;
          justify-content: space-between;

          .transportadora-info {
            display: flex;
            gap: 12px;
            color: #777777;
            font-size: 12px;
            align-items: center;
          }

          .transportadora-price {
            display: flex;
            flex-direction: column;
            text-align: end;

            .price {
              font-size: 12px;
              font-weight: bold;
              color: #404040;
            }

            .time {
              font-size: 10px;
              color: #404040;
            }
          }
        }
      }

      .payment-container {
        .payment-title {
          font-size: 14px;
          font-weight: bold;
          margin-bottom: 15px;
        }

        .cupom {
          margin-bottom: 1rem;

          label {
            display: flex;
            align-items: center;
            gap: 10px;

            span {
              color: #3D3D3D;
              font-size: 12px;
            }
          }
        }

        .warning-container {
          font-size: 12px;
          color: $primary-orange;
        }
      }

      .payment-method-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .payment-method-info {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #777777;
          font-size: 12px;

          .payment-icon {
            img { width: 30px; }
          }

          span { font-weight: bold; }
        }

        .payment-method-price {
          display: flex;
          flex-direction: column;
          text-align: end;

          .payment-info {
            font-size: 12px;
            color: #404040;
          }

          .incetivo {
            font-size: 10px;
            color: $primary-orange;
          }
        }
      }
    }

    .purchase-resume {
      background-color: #FAFAFA;
      border: 1px solid #E2E2E2;
      border-radius: 5px;
      padding: 16px;

      .resume-title {
        font-size: 11px;
        font-weight: bold;
      }

      .resume-content {
        display: flex;
        gap: 16px;

        &:hover {
          .resume-item-info {
            .nome-price-container {
              .price-remover-container {
                .item-carrinho-remover { opacity: 1; }
              }
            }
          }
        }

        .resume-item-image {
          min-width: 80px;
          aspect-ratio: 1/1;
          background-color: rgb(225, 225, 225);
          border-radius: 4px;
          background-position: center;
          background-size: cover;
        }

        .resume-item-info {
          display: flex;
          flex-direction: column;
          width: 100%;

          .profile { font-size: 11px; }
          .nome-price-container {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;

            .book-name {
              font-size: 14px;
              font-weight: bold;
            }

            .price-remover-container {
              display: flex;
              justify-content: space-between;
              align-items: center;

              .item-carrinho-remover {
                font-size: 12px;
                color: $clean-red;
                font-weight: 400;
                cursor: pointer;
                opacity: 0;
                transition: opacity .3s ease;
              }

              .price {
                font-size: 16px;
                font-weight: bold;
                color: $primary-orange;
              }
            }
          }
        }
      }

      .resume-price-container {
        .price-info-container {
          display: flex;
          justify-content: space-between;

          .price-info {
            font-size: 14px;
            font-weight: 500;
          }

          .price-info-price {
            font-size: 14px;
            font-weight: bold;
          }
        }

        .frete {
          display: flex;
          justify-content: end;
          font-size: 11px;
        }
      }

      .resume-price-info-container {
        display: flex;
        justify-content: space-between;

        .price-info {
          font-size: 16px;
          font-weight: 500;
        }

        .price-info-price {
          font-size: 16px;
          font-weight: bold;
        }
      }
    }

    .cotinue-container {
      display: flex;
      justify-content: end;
    }
  }

  .content-container {
    width: 100%;
    background-color: #FAFAFA;
    border: 1px solid #E2E2E2;
    border-radius: 5px;
    padding: 15px;
  }

  label {
    display: block;
    cursor: pointer;
    margin-bottom: 0;
  }

  .endereco-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;

    .backdrop {
      width: inherit;
      height: inherit;
      background-color: $lighter-grey;
      opacity: .6;
      filter: blur(8px);
      -webkit-filter: blur(8px);
    }

    .content {
      margin-top: 100px;
      position: absolute;
      width: 800px;
      background-color: $white;
      border-radius: 8px;
      box-shadow: 0px 0px 5px 1px rgba($black, .16);
      padding: 32px 64px;
      display: flex;
      align-items: center;
      flex-direction: column;

      .endereco-title {
        font-size: 32px;
        color: $primary-orange;
        font-weight: bold;
      }

      .button-container {
        display: flex;
        width: 100%;
        justify-content: end;
      }
    }
  }

  .loader-centralize {
    position: fixed;
    top: 50%;
  }
</style>