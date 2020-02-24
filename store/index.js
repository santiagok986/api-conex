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
    nuxtServerInit(vuexContext) {
        if (this.$auth.loggedIn) {
            console.log('get from initx')
            vuexContext.dispatch('getData')
        }
    },
    loginUser(vuexContext, authData) {

        this.$auth.loginWith('local', {
            data: {
                identifier: authData.username,
                password: authData.password
            }
        }).then(() => {
            this.$apolloHelpers.onLogin(this.$auth.getToken('local'))
            vuexContext.dispatch('getData')
        })
            .catch(e => console.log('errorx ', e))

    },
    newUser(vuexContext, authData) {
        var authURL = "auth/local/register";
        var userData = {
            username: authData.username,
            email: authData.email,
            password: authData.password
        };
        return this.$axios
            .$post(authURL, userData)
            .then(response => console.log(response))
    },
    getData(vuexContext) {
        let client = this.app.apolloProvider.defaultClient
        return client
            .query({
                query: require("../graphql/querys/courses.gql")
            })
            .then(res => {
                const coursArray = []
                console.log('res', res)
                for (const key in res.data.courses) {
                    coursArray.push({ ...res.data.courses[key] })
                }
                vuexContext.commit('setCours', coursArray)
            })
            .catch(e => console.log('Error ', e));

    },
    getDataCour(vuexContext, myContext) {
        let client = this.app.apolloProvider.defaultClient
        return client
            .query({
                query: require('../graphql/querys/course.gql'),
                variables: { id: myContext }
            })
            .then(res => {
                vuexContext.commit('setCour', res.data.course)
            })
    },
    addModule(vuexContext, newModule) {
        
        let client = this.app.apolloProvider.defaultClient
        return client
            .mutate({
                mutation: require('../graphql/mutations/createModule.gql'),
                variables: { 
                    course:newModule.course.id,
                    Identity:newModule.Identity,
                    Icon:newModule.Icon,
                    Active:newModule.Active
                 }
            })
            .then(res => {
                console.log('res ', res)
                vuexContext.dispatch('getDataCour', newModule.course.id)
            }).catch(e => console.log('e ', e))

        // this.$axios({
        //     method: 'post',
        //     url: 'modules',
        //     headers: {
        //         Authorization: this.$auth.getToken('local')
        //     },
        //     data: newModule
        // }).then(() => vuexContext.dispatch('getDataCour', newModule.cour.id))
    }
}

/*  axios actions*/

/*

export const actions = {
    nuxtServerInit(vuexContext) {
        if (this.$auth.loggedIn) {
            console.log('get from init')
            vuexContext.dispatch('getData')
        }
    },
    loginUser(vuexContext, authData) {

        this.$auth.loginWith('local', {
            data: {
                identifier: authData.username,
                password: authData.password
            }
        }).then(() => {
            this.$apolloHelpers.onLogin(this.$auth.getToken('local'))
            //vuexContext.dispatch('getData')
        })
            .catch(e => console.log('errorx ', e))

    },
    newUser(vuexContext, authData) {
        var authURL = "auth/local/register";
        var userData = {
            username: authData.username,
            email: authData.email,
            password: authData.password
        };
        return this.$axios
            .$post(authURL, userData)
            .then(response => console.log(response))
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
            vuexContext.commit('setCours', coursArray)
        }).catch(error => console.log(error))


    },
    getDataCour(vuexContext, myContext) {
        return this.$axios.$get("cours/" + myContext, {
            headers: {
                Authorization: this.$auth.getToken('local')
            }
        })
            .then(res => {
                vuexContext.commit('setCour', res)
            }).catch((e) => {
                return e
                //myContext.error({ statusCode: 401, message: 'Cour pas trouvé' })
            })
    },
    addModule(vuexContext, newModule) {
        console.log(newModule)
        this.$axios({
            method: 'post',
            url: 'modules',
            headers: {
                Authorization: this.$auth.getToken('local')
            },
            data: newModule
        }).then(() => vuexContext.dispatch('getDataCour', newModule.cour.id))
    }
}

*/

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