<template>
  <div class="announce-container">
    <div class="title">
      Anuncie o seu livro usado na WeShelf!
    </div>

    <div class="description">
      Fique atento as informações obrigatórias e confirme os

      <a class="description-link">
        termos de publicação de livros aqui
      </a>
    </div>

    <div class="form">
      <div class="form-part-1">
        <label class="big-image-label">
          <div class="big-image-container">
            <div class="big-image" :style="getUploadedImage(0)">
              <input type="file" accept=".jpg, .jpeg, .png" hidden multiple @change="getUploadedImages" />
              <div class="icon-container">
                <template v-if="! uploaded_images[0]">
                  <img :src="addImageIcon" />
                  <span>
                    Adicione até 5 imagens
                  </span>
                </template>
              </div>
            </div>
          </div>

          <div class="small-image-container">
            <div class="small-image" :style="getUploadedImage(1)">
              <img v-if="! uploaded_images[1]" class="small-img" :src="addImageIcon" />
            </div>

            <div class="small-image" :style="getUploadedImage(2)">
              <img v-if="! uploaded_images[2]" class="small-img" :src="addImageIcon" />
            </div>
          </div>

          <div class="small-image-container bottom-images">
            <div class="small-image" :style="getUploadedImage(3)">
              <img v-if="! uploaded_images[3]" class="small-img" :src="addImageIcon" />
            </div>

            <div class="small-image" :style="getUploadedImage(4)">
              <img v-if="! uploaded_images[4]" class="small-img" :src="addImageIcon" />
            </div>
          </div>
        </label>

        <span class="validation">
          {{ validate?.errors?.first('images') }}
        </span>
      </div>

      <div class="form-part-2">
        <InputText
          id="tituloAnuncio"
          label="TÍTULO DO ANÚNCIO"
          placeholder="utilize palavras chaves, como o nome do livro e suas principais características"
          required
          :value="titulo_anuncio"
          :validations="validate?.errors?.first('announce title')"
          @input="validate.reset('announce title')"
          @blur="validate.validate('announce title', titulo_anuncio)"
          @model="titulo_anuncio = $event"
        />

        <div class="checkbox-container">
          <InputNumber
            id="precoAnuncio"
            label="PREÇO"
            class="price-input"
            required
            :value="price_anuncio"
            :validations="getPriceValidation"
            :disabled="doacao"
            @input="validate.reset('price')"
            @blur="validate.validate('price', price_anuncio)"
            @model="price_anuncio = $event"
          />

          <label class="checkbox-label">
            <input v-model="doacao" type="checkbox" />
            <span class="checkbox-text">
              O livro é para doação?
            </span>
          </label>
        </div>

        <InputText
          id="tituloLivro"
          label="TÍTULO ORIGINAL DO LIVRO"
          placeholder="igualzinho na capa ou na ficha catalográfica ;)"
          required
          :value="titulo_do_livro"
          :validations="validate?.errors?.first('book title')"
          @input="validate.reset('book title')"
          @blur="validate.validate('book title', titulo_do_livro)"
          @model="titulo_do_livro = $event"
        />

        <div class="book-container">
          <InputText
            id="editoraLivro"
            label="EDITORA"
            placeholder="essa aqui você acha na capa ou na lateral"
            required
            :value="editora"
            :validations="validate?.errors?.first('publisher')"
            @input="validate.reset('publisher')"
            @blur="validate.validate('publisher', editora)"
            @model="editora = $event"
          />

          <InputSelect
            id="generoLivro"
            label="GÊNERO"
            default_label="selecione..."
            class="mb-3"
            required
            :options="getBookGenderOptions"
            :validations="validate?.errors?.first('gender')"
            @input="validate.reset('gender')"
            @blur="validate.validate('gender', genero)"
            @model="genero = $event"
          />
        </div>

        <div class="checkbox-container">
          <InputSelect
            id="conservacaoLivro"
            label="ESTADO DE CONSERVAÇÃO DO LIVRO"
            class="mb-3"
            default_label="selecione..."
            required
            :options="getBookConservationOptions"
            :validations="validate?.errors?.first('conservation')"
            @input="validate.reset('conservation')"
            @blur="validate.validate('conservation', conservacao)"
            @model="conservacao = $event"
          />

          <label class="rarity checkbox-label">
            <input v-model="raridade" type="checkbox" />
            <span class="checkbox-text rarity-container">
              Esse livro é uma raridade?

              <img class="info-icon" :src="infoIcon" />
            </span>
          </label>
        </div>

        <div class="description-container">
          <InputTextArea
            id="descricaoLivro"
            label="DESCRIÇÃO"
            placeholder="faça a publi do livro aqui, se você quiser, mas não esqueça de adicionar detalhes sobre as condições dele, por exemplo, se o livro possui amassados ou alguma folha rasgadinha..."
            required
            :value="descricao"
            :validations="validate?.errors?.first('description')"
            @input="validate.reset('description')"
            @blur="validate.validate('description', descricao)"
            @model="descricao = $event"
          />

          <span>
            máx. 400 carateres
          </span>
        </div>

        <label class=checkbox-label>
          <input v-model=trocas type="checkbox" />
          <span class="checkbox-text">
            Aceita trocas?
          </span>
        </label>

        <div class="w-100 d-flex justify-content-end mt-4">
          <AppButton bold @click="publicarClick">
            PUBLICAR
          </AppButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import { Validator } from 'vee-validate';

  import InputText from '../../components/inputs/InputText.vue';
  import InputNumber from '../../components/inputs/InputNumber.vue';
  import InputTextArea from '../../components/inputs/InputTextArea.vue';
  import InputSelect from '../../components/inputs/InputSelect.vue';
  import AppButton from '../../components/inputs/AppButton.vue';

  import infoIcon from '../../static/announce/info.png';
  import addImageIcon from '../../static/announce/add-image.png';

  export default {
    name: 'AnnouncePage',
    components: {
      InputText,
      InputNumber,
      InputTextArea,
      InputSelect,
      AppButton,
    },

    data() {
      return {
        titulo_anuncio: '',
        price_anuncio: 0,
        titulo_do_livro: '',
        genero: '',
        editora: '',
        conservacao: '',
        descricao: '',
        edicao: '',
        isbn: '',
        infoIcon,
        addImageIcon,
        uploaded_images: [],
        trocas: false,
        raridade: false,
        doacao: false,
        unformatted_images: [],
        validate: {},
      }
    },

    computed: {
      ...mapGetters(['getAuthentication']),
      getBookGenderOptions() {
        return [
          {
            label: 'Ação',
            value: 'action',
          },
          {
            label: 'Autoajuda',
            value: 'selfhelp',
          },
          {
            label: 'Distopia',
            value: 'dystopia',
          },
          {
            label: 'Fantasia',
            value: 'fantasy',
          },
          {
            label: 'Ficção',
            value: 'fiction',
          },
          {
            label: 'Horror',
            value: 'horror',
          },
          {
            label: 'infantil',
            value: 'childish',
          },
          {
            label: 'Jovem adulto',
            value: 'newadult',
          },
          {
            label: 'Policial',
            value: 'police',
          },
          {
            label: 'Romance',
            value: 'romance',
          },
          {
            label: 'Suspense',
            value: 'thriller',
          },
        ];
      },

      getBookConservationOptions() {
        return [
          {
            value: 'great',
            label: 'Ótimo, nenhum defeito',
          },

          {
            value: 'good',
            label: 'Bom, poucos amassados',
          },

          {
            value: 'medium',
            label: 'Alguns amassados',
          },

          {
            value: 'bad',
            label: 'Um pouco acabado',
          },

          {
            value: 'horrible',
            label: 'Muito acabado',
          },
        ];
      },

      getPriceValidation() {
        if (this.doacao) {
          return '';
        }

        return this.validate?.errors?.first('price')
      },

      getHasNoErrors() {
        if (this.doacao) {
          return this.validate?.errors?.items.length === 1 && this.validate?.errors?.items[0]?.field === 'price';
        }

        return this.validate?.errors?.items.length === 0;
      },
    },

    mounted() {
      this.validate = new Validator();
      this.validate.attach({
        name: 'announce title',
        rules: 'required|max:30',
        values: { titulo_anuncio: this.titulo_anuncio },
      });

      this.validate.attach({
        name: 'price',
        rules: 'required|min_value:1',
        values: { price_anuncio: this.price_anuncio },
      });

      this.validate.attach({
        name: 'book title',
        rules: 'required|max:30',
        values: { titulo_do_livro: this.titulo_do_livro },
      });

      this.validate.attach({
        name: 'publisher',
        rules: 'required',
        values: { editora: this.editora },
      });

      this.validate.attach({
        name: 'gender',
        rules: 'required',
        values: { genero: this.genero },
      });

      this.validate.attach({
        name: 'conservation',
        rules: 'required',
        values: { genero: this.conservacao },
      });

      this.validate.attach({
        name: 'description',
        rules: 'required|max:400',
        values: { descricao: this.descricao },
      });

      this.validate.attach({
        name: 'images',
        rules: 'required',
        values: { descricao: this.unformatted_images },
      });
    },

    methods: {
      ...mapActions(['createProduto']),
      async publicarClick() {
        await this.validate.validate('announce title', this.titulo_anuncio);
        await this.validate.validate('price', this.price_anuncio);
        await this.validate.validate('book title', this.titulo_do_livro);
        await this.validate.validate('publisher', this.editora);
        await this.validate.validate('gender', this.genero);
        await this.validate.validate('conservation', this.conservacao);
        await this.validate.validate('description', this.descricao);
        await this.validate.validate('images', this.unformatted_images)

        if (this.getHasNoErrors) {
          const response = await this.createProduto({
            userArroba: this.getAuthentication.arroba,
            userId: this.getAuthentication.user_id,
            titulo: this.titulo_anuncio,
            preco: parseInt(this.price_anuncio),
            livroNome: this.titulo_do_livro,
            editora: this.editora,
            trocas: this.trocas,
            genero: this.genero,
            doacao: this.doacao,
            estado: this.conservacao,
            raridade: this.raridade,
            descricao: this.descricao,
            images: this.unformatted_images,
          })

          if (! response.error) {
            this.$router.push({
              path: `/product/${response.id}`,
            })
          }
        }
      },

      getUploadedImage(index) {
        if (this.uploaded_images[index]) {
          return { backgroundImage: `url(${this.uploaded_images[index]})` }
        }

        return {}
      },

      getUploadedImages(event) {
        const files = event.target.files;

        this.uploaded_images = []
        this.unformatted_images = []

        Array.from(files).forEach((image, index) => {
          if (index < 5) {
            const imageURL = URL.createObjectURL(image);

            this.unformatted_images[index] = image
            this.uploaded_images[index] = imageURL;
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">
  .announce-container {
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

    .description {
      font-size: 14px;
      line-height: 17px;
      margin-top: 8px;

      &-link {
        color: $orange;
        cursor: pointer;
      }
    }

    .form {
      display: flex;
      width: 100%;
      padding: 0 10%;
      margin-top: 40px;

      &-part-1 { margin-right: 24px; position: relative; }
      &-part-2 { flex-grow: 1; }

      .checkbox-container {
        display: flex;
        gap: 24px;
        align-items: center;
        .price-input { width: 460px;}
      }

      .rarity { width: 100%; }
      .advanced-options-title {
        font-size: 14px;
        line-height: 17px;
        font-weight: 500;
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        img {
          margin-left: 4px;
          cursor: pointer;
        }
      }
    }

    .book-container {
      display: flex;
      gap: 12px;
    }

    .checkbox-label {
      margin-top: 16px;
      display: flex;
      gap: 8px;
    }

    .checkbox-text {
      font-size: 12px;
      font-weight: 500;
      cursor: pointer;
    }

    .description-container, .rarity-container {
      position: relative;

      span {
        position: absolute;
        right: 0;
        bottom: -16px;
        font-size: 9px;
        font-weight: bold;
        line-height: 11px;
      }
    }
  }

  .info-icon {
    width: 20px;
    height: 20px;
  }

  .big-image-label {
    margin-bottom: 0px;

    .big-image {
      width: 300px;
      height: 300px;
      background-color: #F7F7F7;
      border-radius: 5px;
      border: dashed 2px #D9D9D9;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-position: center;
      background-size: cover;

      .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 10px;

        img {
          height: 42px;
          width: 42px;
        }

        span {
          font-size: 14px;
          line-height: 17px;
          color: #AFAFAF;
          max-width: 84px;
          text-align: center;
        }
      }
    }
  }

  .big-image-container {
    display: flex;
    margin-bottom: 10px;
  }

  .bottom-images { margin-top: 10px; }

  .small-image-container {
    display: flex;
    gap: 10px;
    .small-image {
      height: 145px;
      width: 145px;
      background-color: #F7F7F7;
      border: dashed 2px #D9D9D9;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      justify-content: center;
      align-items: center;
      background-position: center;
      background-size: cover;

      .small-img {
        width: 35px;
        height: 35px;
      }
    }
  }

  .validation {
    position: absolute;
    right: 0;
    top: -24px;
    font-size: 12px;
    color: $clean-red;
  }
</style>