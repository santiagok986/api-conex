import defaultFas from '@/assets/defaultFas.json'


export const state = () => ({
    listCours: null,
    infoCours: null,
    colors: defaultFas.colors,
})

export const mutations = {
    setCours(state, listCours) {
        state.listCours = listCours
    },
    setCour(state, infoCours) {
        state.infoCours = infoCours
    }
}

export const actions = {
    loginUser(vuexContext, authData) {

        this.$auth.loginWith('local', {
            data: {
                identifier: authData.username,
                password: authData.password
            }
        }).then(() => {
            //vuexContext.dispatch('getData')
        })
            .catch(e => console.log('errorx ', e))

    },
    getData(vuexContext) {
        return this.$axios.$get('cours', {
            headers: {
                Authorization: this.$auth.getToken('local')
            }
        }).then(res => {
            const coursArray = []
            for (const key in res) {
                coursArray.push({ ...res[key] })
            }
            console.log(coursArray)
            vuexContext.commit('setCours', coursArray)
        }).catch(error => console.log(error))
    },
    getDataCour(vuexContext, myContext) {
        return this.$axios.$get("cours/" + myContext.route.params.id, {
            headers: {
                Authorization: this.$auth.getToken('local')
            }
        })
            .then(res => {
                vuexContext.commit('setCour', res)
            }).catch((e) => {
                console.log(e)
                myContext.error({ statusCode: 401, message: 'Cour pas trouvé' })
            })
    },
    addModule(vuexContext, newModule) {
        return this.$axios
            .$post("modules/", {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.$auth.getToken('local')
                },
                data: JSON.stringify(newModule)
            })
            .then(result => {
                console.log("done!");
            })
            .catch(error => console.log(error));
    }
}



/*old actions*/

/*
 authenticateUser(vuexContext, authData) {
        let authURL = "auth/local/";
        let userData = {
            identifier: authData.username,
            password: authData.password
        };

        if (!authData.isLogin) {
            authURL = "auth/local/register";
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
                localStorage.setItem("tokenExpirations", new Date().getTime() + 3600 * 1000)

                console.log("User profile", response.user);
                console.log("User token", response.jwt);

                vuexContext.dispatch('getData')
            })
            .catch(error => {
                // Handle error.
                console.log("An error occurred:", error);
            });
    }



    init_auth(vuexContext) {
        const token = localStorage.getItem('myToken')
        const expirationDade = localStorage.getItem('tokenExpirations')

        if (new Date() > expirationDade || !token) {
            return;
        }

        vuexContext.commit('set_token', token)
    },


      nuxtServerInit(vuexContext, context) {
         return this.$axios.$get('cours')
             .then(res => {
                 const coursArray = []


                 for (const key in res) {
                     coursArray.push({ ...res[key]})

                 }
                 console.log(coursArray)
                 vuexContext.commit('setCours', coursArray)
             })
             .catch(error => console.log(error))
     },
*/