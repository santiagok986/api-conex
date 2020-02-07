export const load_cours = (state) => {
    return state.listCours
}

export const load_cour = (state) => {
    return state.infoCours
}

export const user_info = (state) => {
    return state.infoUser
}

export const load_colors = (state) => {
    return state.colors
}

export const isAuthenticated = (state) => {
    return state.token != null
}