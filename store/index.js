export const strict = false

export const state = () => ({
    counter:0,
    categorias:[],
    loadedRecipes:[],
});

export const getters = {
    readCategorias(state){
        return state.categorias
    },
    readLoadRecipes(state){
        return state.loadedRecipes
    },
    readCounter(state){
        return state.counter
    }
}

export const mutations = {
    addCategorias(state, payload){
        const categorias = []
        payload.forEach(element => {
            categorias.push({id:element.id, ...element.attributes})
        });
        state.categorias = categorias
},
    addLoadedRecipes(state,payload){
        const recipes = []
        payload.forEach(element =>{
            recipes.push({
                id:element.id,
                name:element.attributes.name,
                categoria:{
                    id:element.attributes.categoria.data.id,
                    ...element.attributes.categoria.data.attributes
                }
            })
        })
        state.loadedRecipes = recipes

    },
    increment(state){
        state.counter ++
    }
}

export const actions = {
   async nuxtServerInit({commit}){
        
        //return new Promise((resolve, reject) => {

            const client = this.app.apolloProvider.defaultClient
            const query = {
                query:require("../graphql/categorias.gql")
            }
    
           await client.query(query).then(data => {
                commit("addCategorias", data.data.categorias.data)
                //commit('addLoadedRecipes', data.data.recipes.data)
                console.log(data)
                //resolve()
            }).catch(error => {
                console.log(error)
                //reject()
            })
      //  })
    },
    searchRecipe({commit}, payload){
        let client = this.app.apolloProvider.defaultClient
        const query = {
            query:require('../graphql/searchRecipe.gql'),
            variables:{term:payload}
        }
        client.query(query).then(data => {
            //console.log(data)
            commit('addLoadedRecipes', data.data.recipes.data)
        }).catch(e => console.log(e))
    },

    increment(context){
        setTimeout(() => {
            context.commit("increment")
        },1000)
    }
}


