<template>
    <v-btn small color="primary" @click="back()">{{label}}</v-btn>
</template>

<script>
export default {
    props:{
        label:{
            type:String,
            default:'Volver'
        }
    },
    methods:{
        back(){
            this.$router.go(-1)
        }
    }
}
</script>