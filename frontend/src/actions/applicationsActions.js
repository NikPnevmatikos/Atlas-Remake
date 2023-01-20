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