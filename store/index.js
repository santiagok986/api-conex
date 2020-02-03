
export const state = () => {
    listCours:null
}

export const getters = {
    LOAD_COURS(state) {
       return state.listCours
    },
}

export const mutations = {
    SET_COURS(state, listCours) {
        state.listCours = listCours
    }
}

export const actions = {
    nuxtServerInit(vuexContext, context) {
        return this.$axios.$get('http://localhost:1337/cours')
            .then(res => {
                const coursArray = []
                
          
                for (const key in res) {
                    coursArray.push({ ...res[key]})
         
                }
                console.log(coursArray)
                vuexContext.commit('SET_COURS', coursArray)
            })
            .catch(error => console.log(error))
    }
}

