<template>
    <v-card :to="{
       name:'categorias-recipe',
       params:{categorias:recipe.categoria.slug, recipe:recipe.id}
     }">
        <v-img :src="recipe.img" height="170"></v-img>
        <v-card-text>
            <v-row>
                <v-col cols="7">
                    <h3>{{recipe.name}}</h3>
                    {{recipe.autor}}
                </v-col>
                <v-col cols="5" class="d-flex justify-end">
                    <div>
                        <v-icon>mdi-heart</v-icon>
                        <span>{{recipe.likes}}</span>
                    </div>
                </v-col>
            </v-row>
        </v-card-text>
    </v-card>
</template>

<script>
export default {
    props:{
        recipe:{
            type:Object,
            required:true
        }
    }
}
</script>