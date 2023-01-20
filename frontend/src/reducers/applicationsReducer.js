export const providerApplicationsReducer = (state = {applications:[]}, action) => {
    switch(action.type){
        case 'USER_APPLICATIONS_REQUEST' :
           return{loading: true, applications: [] }
        
        case 'USER_APPLICATIONS_SUCCESS' :
            return {                
                loading: false , 
                applications: action.payload,
                // pages:  action.payload.pages,
                // page: action.payload.page
            }
        
        case 'USER_APPLICATIONS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        } 
}