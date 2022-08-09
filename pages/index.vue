<template>
  <v-container>
    
    <v-row>
      <v-col cols="3" v-for="category in categorias" :key="category.id">
        <ui-nav-card :category="category"></ui-nav-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

export default {
  name: "IndexPage",
  middleware:"initData",
  data() {
    return {
      // categorias:[],
      // query: categorias,
    };
  },
  computed:{
    categorias(){
      return this.$store.getters.readCategorias
    } 
  }
  // async fetch(){
  //   //const client = this.$apollo.getClient()

  //   const query = {
  //     query:require("../graphql/categorias.gql")
  //   }

  //   await this.$apollo.query(query).then(data => {
  //     console.log(data)

  //     this.categorias = data.data.categorias
  //     // data.data.categorias.data.forEach(categoria => {
  //     //   //agrego a mi array de categorias cada uno de los valores
  //     //   //organizandolos al mismo nivel con ayuda del spread operator donde copio todos los atributos
  //     //   categorias.push({id:categoria.id, ...categoria.attributes })
  //     // });
      
  //   })
  // }
  // async asyncData(context) {
  //   const client = context.app.apolloProvider.defaultClient

  //   const query = {
  //     query:require("../graphql/categorias.gql")
  //   }

  //   let categorias = []
  //   await client.query(query).then(res => {
  //    //en consola puedes ver el resultado de tu query
  //     console.log(res)
  //    //quiero entrar hasta el array que contiene toda la información
  //    //y hacer un bucle en cada uno de los resultados
  //     res.data.categorias.data.forEach(categoria => {
  //       //agrego a mi array de categorias cada uno de los valores
  //       //organizandolos al mismo nivel con ayuda del spread operator donde copio todos los atributos
  //       categorias.push({id:categoria.id, ...categoria.attributes })
  //     });
  //   })
  //   return {categorias}
  // }
  
  // async asyncData(context) {
  //   const client = context.app.apolloProvider.defaultClient

  //   const query = {
  //     query:require("../graphql/categorias.gql")
  //   }

  //   let categorias = []
  //   await client.query(query).then(data => {
  //     console.log(data)
  //     categorias = data.data.categorias
  //   })

  //   return {categorias}
  // },
};
</script>
