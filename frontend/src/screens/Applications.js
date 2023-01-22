import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { studentApplicationsView } from '../actions/applicationsActions'
import { BsPlusCircle, BsTelephoneFill, BsTrash } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";

function Applications() {
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const Applications= useSelector(state => state.studentApplicationsViewReducer)
  const { error, loading, internships } = Applications

  const student = useSelector(state => state.userLoginReducer)
  const {userInfo} = student

//   const deleteApplication = useSelector(state => state.deleteApplicationReducer)
//   const {error: delete_error, loading: delete_load, success } = deleteApplication

  useEffect(() => {
    if (userInfo != null){
      if(userInfo.is_student === true){
        dispatch(studentApplicationsView())
      }
      else{
        navigate('/provider')
      }
    }
    else{
      navigate('/sign_in')
    }
  }, [dispatch, navigate, userInfo])

  return (
    <div>Applications</div>
  )
}

export default Applications