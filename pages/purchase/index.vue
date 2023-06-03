<template>
  <div class="purchase-container">
    <div class="title">
      Finalize a compra do seu livro!
    </div>

    <div class="form">
      <div class="form-part-1">
        <InputText
          id="emailCompra"
          label="EMAIL DE CONFIRMAÇÃO"
          placeholder="luizpaulo.assuncao98@mail.com"
          required
          :value="email"
          @model="email = $event"
        />

        <InputText
          id="nomeCompra"
          label="NOME COMPLETO"
          placeholder="Luiz Paulo Ribeiro Assunção"
          required
          :value="nome"
          @model="nome = $event"
        />

        <div class="personal-info-container">
          <InputText
            id="cpfAnuncio"
            label="CPF"
            required
            type="number"
            :value="cpfcnpj"
            @model="cpfcnpj = $event"
          />

          <InputText
            id="telefoneAnuncio"
            label="TELEFONE"
            required
            type="number"
            :value="telefone"
            @model="telefone = $event"
          />
        </div>

        <div class="personal-info-container">
          <div class="content-container">
            <span class="adress-title-container">
              <span class="address-title">
                Minha Casa
              </span>

              <a class="change-address" href="#">
                Alterar endereço
              </a>
            </span>

            <span class="address-content">
              <span>
                Rua José Carlos de Resende, 502 AP 101
              </span>

              <span>
                Conj Residencial Vista Verde
              </span>

              <span>
                05171-010
              </span>

              <span>
                São Paulo/SP
              </span>
            </span>
          </div>

          <div class="content-container">
            <label>
              <div class="transportadora-container">
                <div class="transportadora-info">
                  <input type="checkbox" />

                  <span>
                    SEDEX
                  </span>
                </div>

                <div class="transportadora-price">
                  <span class="price">
                    R$ 45,80
                  </span>

                  <span class="time">
                    Em até 1 dia útil
                  </span>
                </div>
              </div>
            </label>

            <hr />

            <label>
              <div class="transportadora-container">
                <div class="transportadora-info">
                  <input type="checkbox" />

                  <span>
                    PAC
                  </span>
                </div>

                <div class="transportadora-price">
                  <span class="price">
                    R$ 24,20
                  </span>

                  <span class="time">
                    Em até 6 dias úteis
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

          <div class="cupom">
            <label>
              <input type="checkbox" />

              <span>
                Possui código de desconto?
              </span>
            </label>
          </div>

          <div class="content-container">
            <label>
              <div class="payment-method-container">
                <div class="payment-method-info">
                  <input type="checkbox" />

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
                  <input type="checkbox" />

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
                  <input type="checkbox" />

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

          <div class="resume-content">
            <div
              class="resume-item-image"
              :style="{ backgroundImage: `url(${example1})` }"
            />

            <div class="resume-item-info">
              <span class="profile">
                @julinha2022.23
              </span>

              <span class="book-name">
                Os Sete Maridos de Evelyn Hugo edição tag inéditos
              </span>

              <span class="price">
                R$ 36,90
              </span>
            </div>
          </div>

          <hr />

          <div class="resume-content">
            <div
              class="resume-item-image"
              :style="{ backgroundImage: `url(${example1})` }"
            />

            <div class="resume-item-info">
              <span class="profile">
                @julinha2022.23
              </span>

              <span class="book-name">
                Os Sete Maridos de Evelyn Hugo edição tag inéditos
              </span>

              <span class="price">
                R$ 36,90
              </span>
            </div>
          </div>

          <hr />

          <div class="resume-price-container">
            <div class="price-info-container">
              <span class="price-info">
                Subtotal
              </span>

              <span class="price-info-price">
                R$ 74,90
              </span>
            </div>

            <div class="price-info-container">
              <span class="price-info">
                Frete
              </span>

              <span class="price-info-price">
                R$ 24,20
              </span>
            </div>

            <div class="frete">
              Em até 6 dias úteis
            </div>
          </div>

          <hr />

          <div>
            <div class="resume-price-info-container">
              <span class="price-info">
                Frete
              </span>

              <span class="price-info-price">
                R$ 99,10
              </span>
            </div>
          </div>
        </div>

        <div class="cotinue-container mt-3">
          <AppButton bold>
            CONTINUAR
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import InputText from '../../components/inputs/InputText.vue';
  import AppButton from '../../components/inputs/AppButton.vue';

  import pixIcon from '../../static/utils/pix.png';
  import mercadoLivreIcon from '../../static/utils/mercadolivre.png';
  import boletoIcon from '../../static/utils/boleto.png';
  import example1 from '../../static/product/example1.jpg';

  export default {
    name: 'PurchasePage',
    components: {
      InputText,
      AppButton,
    },

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
      }
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
          }
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

          span {
            color: #3D3D3D;
            font-size: 12px;
            margin-bottom: 12px;
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

          .profile { font-size: 11px; }
          .book-name {
            font-size: 14px;
            font-weight: bold;
          }

          .price {
            font-size: 16px;
            font-weight: bold;
            color: $primary-orange;
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
</style>