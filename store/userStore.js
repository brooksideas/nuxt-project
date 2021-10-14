
export const state = () => ({ 
    allUsers: []
  })
  
  export const mutations = {
    add (state, user) {   
          user.data.map((element,index) => { 
          state.allUsers.splice(index,0,element);
        }) 
    }, 
  }
 
 
