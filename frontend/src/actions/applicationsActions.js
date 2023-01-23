import axios from 'axios'

export const providerApplications = () => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'USER_APPLICATIONS_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/provider/internships/`,
            config
        )

        dispatch ({
            type: 'USER_APPLICATIONS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'USER_APPLICATIONS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const studentApplications = (keyword='') => async(dispatch) =>{
    
    try {
        dispatch({
            type: 'STUDENT_APPLICATIONS_REQUEST'
        })

        const config = {
                headers: {
                    'Content-type': 'application/json',
            
                }
        }


        const { data } = await axios.get(
            `/api/internships${keyword}`,
            config
        )

        dispatch ({
            type: 'STUDENT_APPLICATIONS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'STUDENT_APPLICATIONS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const studentApplicationsView = () => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'APPLICATIONS_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/applies/`,
            config
        )

        dispatch ({
            type: 'APPLICATIONS_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'APPLICATIONS_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const applicationViewAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'APPLICATION_VIEW_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/apply/view/${id}/`,
            config
        )

        dispatch ({
            type: 'APPLICATION_VIEW_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'APPLICATION_VIEW_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const applicationUpdateAction =(form) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'APPLICATION_UPDATE_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(
            `/api/apply/update/${form.get('_id')}/`,
            form,
            config
        )

        dispatch ({
            type: 'APPLICATION_UPDATE_SUCCESS',
            payload: data
        })


    }
    catch(error) {
        dispatch ({
            type: 'APPLICATION_UPDATE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const createInternshipAction = (form) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'CREATE_INTERNSHIP_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            '/api/internships/create/',
            form,
            config
        )

        dispatch ({
            type: 'CREATE_INTERNSHIP_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'CREATE_INTERNSHIP_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const createApplyAction = (form) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'CREATE_APPLY_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post(
            `/api/apply/${form.get('_id')}/`,
            form,
            config
        )

        dispatch ({
            type: 'CREATE_APPLY_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'CREATE_APPLY_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const internshipViewAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'INTERNSHIP_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(
            `/api/internships/${id}/`,
            config
        )

        dispatch ({
            type: 'INTERNSHIP_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'INTERNSHIP_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const updateInternshipAction = (form,id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'UPDATE_INTERNSHIP_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'multipart/form-data',
                Authorization : `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(
            `/api/internships/update/${id}/`,
            form,
            config
        )

        dispatch ({
            type: 'UPDATE_INTERNSHIP_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'UPDATE_INTERNSHIP_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}


export const deleteInternshipAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'INTERNSHIP_DELETE_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/internships/delete/${id}/`,
            config
        )

        dispatch ({
            type: 'INTERNSHIP_DELETE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'INTERNSHIP_DELETE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}

export const deleteApplyAction = (id) => async(dispatch, getState) =>{
    
    try {
        dispatch({
            type: 'APPLY_DELETE_REQUEST'
        })
        

        const {
            userLoginReducer: { userInfo }, 
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization : `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.delete(
            `/api/apply/delete/${id}/`,
            config
        )

        dispatch ({
            type: 'APPLY_DELETE_SUCCESS',
            payload: data
        })
    }
    catch(error) {
        dispatch ({
            type: 'APPLY_DELETE_FAIL',
            payload: error.response && error.response.data.detail ? error.response.data.detail : error.message,
              
        })
    }
}