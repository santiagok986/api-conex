import defaultFas from '@/assets/defaultFas.json'


export const state = () => ({
    listCours: null,
    infoCours: null,
    infoUser: null,
    colors: defaultFas.colors,
    token: null
})

export const mutations = {
    set_cours(state, listCours) {
        state.listCours = listCours
    },
    set_cour(state, infoCours) {
        state.infoCours = infoCours
    },
    set_info_user(state, infoUser) {
        state.infoUser = infoUser
    },
    set_token(state, token) {
        state.token = token
    },
    clear_token(state) {
        state.token = null
    }
}

export const actions = {
    /* nuxtServerInit(vuexContext, context) {
         return this.$axios.$get('http://localhost:1337/cours')
             .then(res => {
                 const coursArray = []
                 
           
                 for (const key in res) {
                     coursArray.push({ ...res[key]})
          
                 }
                 console.log(coursArray)
                 vuexContext.commit('set_cours', coursArray)
             })
             .catch(error => console.log(error))
     },*/
    authenticateUser(vuexContext, authData) {
        let authURL = "http://localhost:1337/auth/local/";
        let userData = {
            identifier: authData.username,
            password: authData.password
        };

        if (!authData.isLogin) {
            authURL = "http://localhost:1337/auth/local/register";
            userData = {
                username: authData.username,
                email: authData.email,
                password: authData.password
            };
        }

        return this.$axios
            .$post(authURL, userData)
            .then(response => {
                // Handle success.
                vuexContext.commit('set_token', response.jwt)
                vuexContext.commit('set_info_user', response.user)
                localStorage.setItem("myToken", response.jwt)
                console.log("Well done! ", response);
                console.log("User profile", response.user);
                console.log("User token", response.jwt);

                vuexContext.dispatch('get_data')
            })
            .catch(error => {
                // Handle error.
                console.log("An error occurred:", error);
            });
    },
    init_auth(vuexContext) {
        const token = localStorage.getItem('myToken')
        if (!token) {
            return;
        }
        vuexContext.commit('set_token', token)
    },
    get_data(vuexContext) {
        return this.$axios.$get('http://localhost:1337/cours', {
            headers: {
                Authorization: 'Bearer ' + vuexContext.state.token
            }
        }).then(res => {
            const coursArray = []
            for (const key in res) {
                coursArray.push({ ...res[key] })
            }
            console.log(coursArray)
            vuexContext.commit('set_cours', coursArray)
        })
            .catch(error => console.log(error))
    },
    get_data_cour(vuexContext, route) {
        return this.$axios.$get("http://localhost:1337/cours/" + route.params.id, {
            headers: {
                Authorization: 'Bearer ' + vuexContext.state.token
            }
        })
            .then(res => {
                vuexContext.commit('set_cour', res)
            })
            .catch(e => console.log(e));
    },
    add_module(vuexContext, newModule) {
        console.log('new ' , newModule , ' ' , vuexContext.state.token)
        return this.$axios
            .$post("http://localhost:1337/modules",{
                newModule,
                headers: {
                  'Authorization': 'Bearer ' + vuexContext.state.token
                }
            })
            .then(result => {
                console.log("done!");
            })
            .catch(error => console.log(error));
    }
}

