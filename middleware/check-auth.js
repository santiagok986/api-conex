export default function(context){
    console.log('Check auth')
    if(process.client){
        context.store.dispatch('init_auth')
    }
    
}