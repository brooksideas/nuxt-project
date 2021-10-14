import createPersistedState from 'vuex-persistedstate' 
export default ({ store, isHMR}) => {
    // In case of HMR, mutation occurs before nuxReady, so previously saved state
    // gets replaced with original state received from server. So, we've to skip HMR.
    // Also nuxtReady event fires for HMR as well, which results multiple registration of
    // vuex-persistedstate plugin 

    if (isHMR) return;
    if (process.server) { 
          /*Server Side MiddleWare Configuration Required
            to be able to pre-render data and send it to 
            the Client */
     }
    if (process.client) {
        window.onNuxtReady(() => { 
            createPersistedState({
                key: 'Users',
                paths: ['userStore'], /// Save all the Data on creation to the Modules of the Store modules  
                arrayMerger: (store, saved) => ({ userStore: store }) , //merging arrays when rehydrating state
                filter: (mutation) => mutation.type == 'userStore/add'  // store on this Mutation
            })(store)
        })
    }

}