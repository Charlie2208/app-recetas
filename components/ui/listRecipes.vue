<template>
    <div>
        <div v-if="recipes.length != 0">
           <v-list>
               <v-list-item-group>
                   <template v-for="recipe in recipes">
                       <v-list-item two-line :key="recipe.id">
                           <v-list-item-content>
                               <v-list-item-title>{{recipe.name}}</v-list-item-title>
                               <v-list-item-subtitle>{{recipe.categoria.name}}</v-list-item-subtitle>
                           </v-list-item-content>
                           <v-list-item-action>
                               <v-row align="center" justify="center">
                                    <v-btn icon :to="{name:'user-edit-id', params:{id:recipe.id}}"><v-icon>mdi-pencil</v-icon></v-btn>
                                    <ui-delete-item @choice="deleteItem($event, recipe.id)"></ui-delete-item>
                               </v-row>
                           </v-list-item-action>
                       </v-list-item>

                   </template>
               </v-list-item-group>
           </v-list>
        </div>
        <div v-else>
            No hay recetas disponibles
        </div>
    </div>
</template>

<script>
export default {
    props:{
        recipes:{
            type:Array,
            default:()=>([])
        }
    },
    methods:{
        deleteItem(choice, id){
            console.log(choice)
            if(choice){
                this.$apollo.mutate({
                    context:{
                        headers:{
                            authorization:this.$auth.strategy.token.get()
                        }
                    },
                    mutation:require("../../graphql/deleteRecipe.gql"),
                    variables:{id}
                }).then(res => {
                    console.log("receta borrada")
                    const miRecipe = this.recipes.find(recipe => recipe.id == id)
                    const index = this.recipes.indexOf(miRecipe)
                    this.recipes.splice(index, 1)
                    this.$store.dispatch("snackbars/setSnack", {
                    text: "Receta eliminada",
                    color: "error",
          });
                })
            }
        }
    }
}
</script>