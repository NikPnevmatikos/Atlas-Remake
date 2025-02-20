export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_LOGIN_REQUEST':
            return { loading: true }

        case 'USER_LOGIN_SUCCESS':
            return { loading: false, userInfo: action.payload }

        case 'USER_LOGIN_FAIL':
            return { loading: false, error: action.payload }

        case 'USER_LOGOUT':
            return {}

        default:
            return state
    }
}


export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_REGISTER_REQUEST':
            return { loading: true }

        case 'USER_REGISTER_SUCCESS':
            return { loading: false, userInfo: action.payload }

        case 'USER_REGISTER_FAIL':
            return { loading: false, error: action.payload }

        case 'USER_LOGOUT':
            return {}

        default:
            return state
    }
}


export const userProfileReducer = (state = {user: {}}, action) => {
    switch (action.type) {
        case 'USER_PROFILE_REQUEST':
            return { ...state, loading: true }

        case 'USER_PROFILE_SUCCESS':
            return { loading: false, user: action.payload }

        case 'USER_PROFILE_FAIL':
            return { loading: false, error: action.payload }

        case 'USER_PROFILE_RESET':
            return { user: {} }

        default:
            return state
    }
}


export const userUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_UPDATE_REQUEST':
            return {loading: true }

        case 'USER_UPDATE_SUCCESS':
            return { loading: false, success: true, userInfo: action.payload }

        case 'USER_UPDATE_FAIL':
            return { loading: false, error: action.payload }

        case 'USER_UPDATE_RESET':
            return {}

        default:
            return state
    }
}


export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case 'USER_DELETE_REQUEST':
            return {loading: true }

        case 'USER_DELETE_SUCCESS':
            return { loading: false, success: true }

        case 'USER_DELETE_FAIL':
            return { loading: false, error: action.payload }

        default:
            return state
    }
}