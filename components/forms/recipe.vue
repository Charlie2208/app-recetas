<template>
  <div>
    <v-card max-width="800" class="mx-auto">
      <v-card-title class="heading">Mi receta</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="onsubmit">
          <v-container>
            <v-row>
              <v-col cols="12"
                ><v-text-field
                  dense
                  label="Nombre de la receta"
                  outlined
                  v-model="recipe.name"
                ></v-text-field
              ></v-col>
              <v-col cols="4"
                ><v-text-field
                  dense
                  label="Duración de la receta en minutos"
                  outlined
                  v-model="recipe.duration"
                  type="number"
                ></v-text-field>
                <v-icon>mdi-clock</v-icon> {{ formatedTime }} hrs
              </v-col>
              <v-col cols="4"
                ><v-text-field
                  dense
                  label="Cantidad de platos"
                  outlined
                  v-model="recipe.servings"
                  type="number"
                ></v-text-field
              ></v-col>
              <v-col cols="4">
                <v-select
                  dense
                  outlined
                  v-model="recipe.categoria"
                  label="Categoría"
                  :items="categorias"
                  item-text="name"
                  item-value="id"
                ></v-select>
              </v-col>
              <v-col cols="12"
                ><v-text-field
                  dense
                  label="Foto de la receta"
                  outlined
                  v-model="recipe.img"
                ></v-text-field
              ></v-col>
              <v-col cols="12"
                ><v-textarea
                  dense
                  label="Descripción"
                  outlined
                  v-model="recipe.description"
                ></v-textarea
              ></v-col>
              <v-col cols="12">
                <h3 class="mb-5">Ingredientes</h3>
                <div
                  v-for="(ingredient, i) in recipe.ingredients"
                  :key="i + 'ingrediente'"
                >
                  <v-text-field
                    dense
                    outlined
                    :label="`Ingrediente ${i + 1}`"
                    v-model="recipe.ingredients[i]"
                  ></v-text-field>
                </div>
                <v-btn class="primary" small @click="addItem('ingredients')"
                  >Agregar ingrediente</v-btn
                >
                <v-divider class="my-5"></v-divider>
              </v-col>
              <v-col cols="12">
                <h3 class="mb-5">Pasos</h3>
                <div v-for="(steps, i) in recipe.steps" :key="i + 'paso'">
                  <v-textarea
                    dense
                    outlined
                    :label="`paso ${i + 1}`"
                    v-model="recipe.steps[i]"
                  ></v-textarea>
                </div>
                <v-btn class="primary" small @click="addItem('steps')"
                  >Agregar paso</v-btn
                >
              </v-col>
            </v-row>

            <v-btn type="submit" class="secondary my-5" small
              >{{hasId ?'Guardar cambios' : 'Guardar recetas'}}</v-btn
            >
          </v-container>

        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    recipe: {
      type: Object,
      default: () => ({
        name: "",
        duration: 0,
        servings: 0,
        img: "",
        description: "",
        ingredients: [""],
        steps: [""],
        categoria: 1,
      }),
    },
  },
  computed: {
    categorias() {
      return this.$store.getters.readCategorias;
    },
    formatedTime() {
      let hours = Math.floor(this.recipe.duration / 60);
      let minutes = this.recipe.duration % 60;
      let total = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
      return total;
    },
    hasId(){
      return this.recipe.hasOwnProperty("id")
    }
  },
  methods: {
    addItem(item) {
      if (this.recipe[item] == null) {
        this.recipe[item] = [];
      }
      this.recipe[item].push("");
    },
    async onsubmit() {
      const id = this.$auth.user.id;
      this.recipe.autor = id;
      this.recipe.duration = Number(this.recipe.duration);
      this.recipe.servings = Number(this.recipe.servings);
      const token = this.$auth.strategy.token.get();

      const mutation = this.hasId ? "updateRecipe" : "createRecipe";
      if(typeof this.recipe.categoria == "object"){
        this.recipe.categoria = this.recipe.categoria.id
      }

      await this.$apollo
        .mutate({
          context: {
            headers: {
              authorization: token,
            },
          },
          mutation: require("../../graphql/" + mutation + ".gql"),
          variables: this.recipe,
          update: (cache, myrecipe) => {
            if (mutation == "createRecipe") {
              const data = cache.readQuery({
                query: require("../../graphql/userRecipes.gql"),
                variables: { id },
              });
              data.recipes.data.push(myrecipe.data[mutation].data);
              cache.writeQuery({
                query: require("../../graphql/userRecipes.gql"),
                variables: { id },
                data,
              });
            }
          },
        })
        .then((data) => {
          console.log(data);
          this.$router.push({ name: "user" });
          this.$store.dispatch("snackbars/setSnack", {
            text: "Receta guardada",
            color: "info",
          });
        })
        .catch((e) => {
          console.log(e);
          this.$store.dispatch("snackbars/setSnack", {
            text: "Hay un error intenta más tarde",
            color: "error",
          });
        });
    },
  },
};
</script>