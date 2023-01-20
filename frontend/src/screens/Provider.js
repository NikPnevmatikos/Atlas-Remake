import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import { providerApplications } from '../actions/applicationsActions'

function Provider() {
  
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const Applications = useSelector(state => state.providerApplicationsReducer)
  const { error, loading, applications } = Applications


  const provider = useSelector(state => state.userLoginReducer)
  const {userInfo} = provider

  useEffect(() => {
    if (userInfo != null){
      if(userInfo.is_student === false){
        dispatch(providerApplications())
      }
      else{
        navigate('/students')
      }
    }
    else{
      navigate('/sign_in')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <div>
        Provider
    </div>
  )
}

export default Provider