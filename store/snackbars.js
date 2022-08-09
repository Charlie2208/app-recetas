export const state = () => ({
    snackbars:[]
});

export const getters = {
    readSnacksbars(state){
        return state.snackbars
    }
}

export const mutations = {
    setSnack(state, payload){
        state.snackbars = state.snackbars.concat(payload)
    }
}

export const actions = {
   setSnack({commit}, payload){
       payload.showing = true
       payload.timeout = payload.timeout || 3000
       payload.color = payload.color || 'info'
       commit('setSnack', payload)
   }
}