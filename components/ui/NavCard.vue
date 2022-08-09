<template>
    <v-card :to="{name: 'categorias', params:{categorias:category.slug}}">
        <v-img :src="category.img" height="170"></v-img>
        <v-card-title class="body-1">
            {{category.name}}
            <v-icon class="ml-2" color="primary">{{category.icon}}</v-icon>
        </v-card-title>
    </v-card>
</template>

<script>
export default {
    props:{
        category:{
            type: Object,
            require:true
        }
    }
}
</script>