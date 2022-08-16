<template>
    <div>
        <v-btn icon @click="dialog = true"><v-icon>mdi-delete</v-icon></v-btn>
        <v-dialog v-model="dialog" max-width="590">
            <v-card>
                <v-card-title class="headline">Borrar receta</v-card-title>
                <v-card-text>
                    Realmente quieres borrar esta receta?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="error" @click="returnChoice(true)">Borrar</v-btn>
                    <v-btn color="primary" @click="returnChoice(false)">Volver</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data(){
        return{
            dialog:false
        }
    },
    methods:{
        returnChoice(choice){
            this.dialog = false
            this.$emit("choice", choice)
        }
    }
}
</script>