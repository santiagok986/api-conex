export default function(context){
    console.log('is ', !context.store.getters.isAuthenticated)
    if(!context.store.getters.isAuthenticated){
        console.log('no token')
        context.redirect('/')
    }
}