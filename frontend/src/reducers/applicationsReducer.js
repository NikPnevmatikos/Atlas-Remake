export const providerApplicationsReducer = (state = {internships:[]}, action) => {
    switch(action.type){
        case 'USER_APPLICATIONS_REQUEST' :
           return{loading: true, internships: [] }
        
        case 'USER_APPLICATIONS_SUCCESS' :
            return {                
                loading: false , 
                internships: action.payload,
                // pages:  action.payload.pages,
                // page: action.payload.page
            }
        
        case 'USER_APPLICATIONS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        } 
}

export const studentApplicationsReducer = (state = {applications:[]}, action) => {
    switch(action.type){
        case 'STUDENT_APPLICATIONS_REQUEST' :
           return{loading: true, internships: [] }
        
        case 'STUDENT_APPLICATIONS_SUCCESS' :
            return {                
                loading: false , 
                applications: action.payload,
                // pages:  action.payload.pages,
                // page: action.payload.page
            }
        
        case 'STUDENT_APPLICATIONS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        } 
}

export const studentApplicationsViewReducer = (state = {applications:[]}, action) => {
    switch(action.type){
        case 'APPLICATIONS_REQUEST' :
           return{loading: true, applications: [] }
        
        case 'APPLICATIONS_SUCCESS' :
            return {                
                loading: false , 
                applications: action.payload,
                // pages:  action.payload.pages,
                // page: action.payload.page
            }
        
        case 'APPLICATIONS_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        } 
}

export const applicationsViewReducer= (state = {applications:[]}, action) => {
    switch(action.type){
        case 'APPLICATION_REQUEST' :
            return{loading: true, applications:[] } 
        
        case 'APPLICATION_SUCCESS' :
            return {loading: false , applications: action.payload }
        
        case 'APPLICATION_FAIL' :
            return {loading: false, error: action.payload}

            
        default:
            return state
        }       
}

export const applicationsUpdateReducer= (state = {application:{}}, action) => {
    switch(action.type){
        case 'APPLICATION_UPDATE_REQUEST' :
            return{loading: true} 
        
        case 'APPLICATION_UPDATE_SUCCESS' :
            return {loading: false , success:true ,application: action.payload }
        
        case 'APPLICATION_UPDATE_FAIL' :
            return {loading: false, error: action.payload}
        
        case 'APPLICATION_UPDATE_RESET' :
            return {}
        default:
            return state
        }       
}

export const createInternshipReducer = (state = {}, action) => {
    switch(action.type){
        case 'CREATE_INTERNSHIP_REQUEST' :
            return{loading: true} 
        
        case 'CREATE_INTERNSHIP_SUCCESS' :
            return {loading: false, success: true, internship: action.payload }
        
        case 'CREATE_INTERNSHIP_FAIL' :
            return {loading: false, error: action.payload}
    
        case 'CREATE_INTERNSHIP_RESET' :
            return {}
            
        default:
            return state
        }       
}

export const internshipViewReducer= (state = {internship:{}}, action) => {
    switch(action.type){
        case 'INTERNSHIP_REQUEST' :
            return{loading: true} 
        
        case 'INTERNSHIP_SUCCESS' :
            return {loading: false , success:true ,internship: action.payload }
        
        case 'INTERNSHIP_FAIL' :
            return {loading: false, error: action.payload}
        
        case 'INTERNSHIP_RESET' :
            return {}
        default:
            return state
        }       
}


export const updateInternshipReducer = (state = {}, action) => {
    switch(action.type){
        case 'UPDATE_INTERNSHIP_REQUEST' :
            return{loading: true} 
        
        case 'UPDATE_INTERNSHIP_SUCCESS' :
            return {loading: false, success: true, internship: action.payload }
        
        case 'UPDATE_INTERNSHIP_FAIL' :
            return {loading: false, error: action.payload}
    
        case 'UPDPATE_INTERNSHIP_RESET' :
            return {}
            
        default:
            return state
        }       
}

export const deleteInternshipReducer = (state = {}, action) => {
    switch(action.type){
        case 'INTERNSHIP_DELETE_REQUEST' :
            return{loading: true}
        
        case 'INTERNSHIP_DELETE_SUCCESS' :
            return {loading: false , success: true}
        
        case 'INTERNSHIP_DELETE_FAIL' :
            return {loading: false, error: action.payload}
            
        default:
            return state
        }       
}