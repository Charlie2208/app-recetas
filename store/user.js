export const state = () => ({
    favorites:null
});

export const getters = {
    favorites(state){
        return state.favorites
    },
    favoritesGQL(state){
        let favorites = []
        if(Array.isArray(state.favorites)){
            favorites = state.favorites.map(fav => fav.id)
        }
        return favorites
    }
}

export const mutations = {
    setFavorites(state, payload){
        state.favorites = payload
    },
    addRecipe(state, data){
        state.favorites.push(data)
    },
    removeRecipe(state,id){
        const miRecipe = state.favorites.find(recipe => recipe.id == id)
        const index = state.favorites.indexOf(miRecipe)
        state.favorites.splice(index,)
    },
    resetFav(state){
        state.favorites = null
    }
}

export const actions = {
    async getFavorites({commit}){
        let client = this.app.apolloProvider.defaultClient
        let id = this.$auth.user.id
        const query = {
            context:{
                headers:{
                    authorization:this.$auth.strategy.token.get()
                }
            },
            query:require("../graphql/userFavorites.gql"),
            fetchPolicy:"no-cache",
            variables:{id}
        }
        await client.query(query).then(res =>{
          const favorites = []
         res.data.usersPermissionsUser.data.attributes.favorites.data.forEach(element => {
             console.log(element)
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
              favorites.push(recipe)
           }) 
  
           commit("setFavorites", favorites)
        }).catch(e => console.log(e))
    }
  }