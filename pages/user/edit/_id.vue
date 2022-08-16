<template>
  <v-container>
    <h2>Editar receta</h2>
    <v-divider class="my-5"></v-divider>
    <div v-if="recipe">
      <forms-recipe :recipe="recipe"></forms-recipe>
    </div>
  </v-container>
</template>

<script>
export default {
  middleware: "auth",
  async asyncData({ app, route }) {
    const client = app.apolloProvider.defaultClient;
    const id = route.params.id;
    const query = {
      query: require("../../../graphql/recipe.gql"),
      variables: { id },
      fetchPolicy: "no-cache",
    };
    let recipe = null;
    await client.query(query).then((res) => {
      const id = res.data.recipe.data.id;
      //separo los attributos
      const attributes = res.data.recipe.data.attributes;
      //a recipe le doy un nuevo valor organizando el objeto a mi medida
      //este es el objeto utilizado para renderizar la UI
      recipe = {
        id,
        name: attributes.name,
        duration: attributes.duration,
        servings: attributes.servings,
        img: attributes.img,
        description: attributes.description,
        ingredients: attributes.ingredients,
        steps: attributes.steps,
        likes: attributes.likes,
        categoria: {
          id: attributes.categoria.data.id,
          ...attributes.categoria.data.attributes,
        },
        //add autor to recipe
        autor: attributes.autor.data.attributes.username,
      };
    });
    return { recipe };
  },
};
</script>