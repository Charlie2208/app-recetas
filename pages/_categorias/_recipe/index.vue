<template>
  <v-container>
    <h1 class="secundary--text">{{recipe.name}}</h1>
    <h5 class="secundary--text">{{recipe.categoria.name}}</h5>

    <v-card class="mt-3">
      <v-card-title>
        <v-icon class="mr-3">mdi-information</v-icon>
        Información
      </v-card-title>
      <v-card-text class="black--text">
        <v-row>
          <v-col cols="6">
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-group</v-icon>
              Servicios : {{recipe.servings}}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-clock</v-icon>
              Tiempo : {{formatedTime}}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-edit</v-icon>
              Autor : autor
            </v-chip>

            <v-divider class="my-3"></v-divider>

            <h4 class="body-1">Descripción</h4>
            <div v-html="recipe.description"></div>
          </v-col>
          <v-col cols="6">
            <v-img :src="recipe.img" max-height="500"></v-img>
          </v-col>
         
        </v-row>
      </v-card-text>
    </v-card>

    <div class="mt-3">
      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-fridge</v-icon>Ingredientes
            </v-card-title>
            <v-list>
              <v-list-item v-for="(ingredient, i) in recipe.ingredients" :key="i">
                {{ingredient}}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
         <v-col cols="7">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-stove</v-icon>Pasos
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item v-for="(step, k) in recipe.steps" :key="k+Math.random()" color="secondary" small>
                {{step}}
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>

    <div class="mt-3">
    <ui-back-btn label="Volver a recetas"></ui-back-btn>
  </div>
  </v-container>
</template>

<script>
export default {

    computed:{
      formatedTime(){
        let hours = Math.floor(this.recipe.duration / 60)
        let minutes = this.recipe.duration % 60
        let total = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2)
        return total
      }
    },
    async asyncData({ app, route }) {
    const client = app.apolloProvider.defaultClient;
    const id = route.params.recipe;
    const query = {
      query: require("../../../graphql/recipe.gql"),
      variables: { id },
    };
    let recipe = null;
    await client
      .query(query)
      .then((res) => {
        //recuerda analizar los datos en consola
        console.log(res.data.recipe.data)
        //capturo el id de recipe data
        const id = res.data.recipe.data.id
        //separo los attributos
        const attributes = res.data.recipe.data.attributes
        //a recipe le doy un nuevo valor organizando el objeto a mi medida
        //este es el objeto utilizado para renderizar la UI
        recipe = {
          id,
          name:attributes.name,
          duration:attributes.duration,
          servings:attributes.servings,
          img:attributes.img,
          description:attributes.description,
          ingredients:attributes.ingredients,
          steps:attributes.steps,
          likes:attributes.likes,
          categoria:{id:attributes.categoria.data.id, ...attributes.categoria.data.attributes}
        }
      })
      .catch((e) => console.log(e));
 
    return { recipe };
  }
}
</script>