<template>
  <v-container>
    <h1 class="secondary--text">
      {{categoria.name}}
      <v-icon large class="secondary--text">{{categoria.icon}}</v-icon>
    </h1>
    <p class="secondary--text">{{categoria.description}}</p>
    <v-row>
      <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
        <ui-nav-card-recipe :recipe="recipe"></ui-nav-card-recipe>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-alert type="info" v-if="recipes.length == 0" class="text-center">
        <p>No hay recetas disponibles en esta categoría</p>
      </v-alert>
    </div>
  <div class="mt-3">
    <ui-back-btn></ui-back-btn>
  </div>
  </v-container>
</template>

<script>


export default {
  data() {
    return {
    
    };
  },
  computed:{
    categoria(){
      const slug = this.$route.params.categorias 
      return this.$store.getters.readCategorias.find(categoria => categoria.slug == slug)
    }
  },
  async asyncData({app, route}){
    const slug = route.params.categorias
    const client = app.apolloProvider.defaultClient
    const query = {
      query:require("../../graphql/recipes.gql"),
      variables:{slug}
    }
    let recipes = []
    await client.query(query).then(res => {
      //en consola puedes ver el resultado de tu query y analizar su estructura
      console.log(res)
      res.data.recipes.data.forEach(element => {
        //creo un nuevo objeto con el formato deseado
        const recipe = {
          id:element.id,
          name:element.attributes.name,
          likes:element.attributes.likes,
          img:element.attributes.img,
          //en la propiedad category conservo un objeto
          //pero filtro las propiedades data y attributos para facil uso
          categoria:{id:element.attributes.categoria.data.id, 
          ...element.attributes.categoria.data.attributes},
          //autor
          autor:element.attributes.autor.data.attributes.username
        }
        //recuerda analizar los datos que recibes en la respuesta
        recipes.push(recipe)
      });
    }).catch(error => console.log(JSON.stringify(error, null, 2)))
 
    return { recipes }
  }
};
</script>