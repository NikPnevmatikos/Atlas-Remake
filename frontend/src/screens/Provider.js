import React, {useState, useEffect} from 'react'
import {useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
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
      <div style={{ display: 'block', 
                  width: 700, padding: 30 }}
      >
        <Breadcrumb>
          <LinkContainer to = '/'>
            <Breadcrumb.Item>
              Αρχική
            </Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>
            Φορείς Υποδοχής
          </Breadcrumb.Item>
        </Breadcrumb>
        <div className='py-3'>
            <Button className="btn btn-dark btn-lg">
                Δημιουργία Αγγελίας
            </Button>
        </div>
        <ListGroup as="ol" numbered>
          {Array.isArray(applications) ?
              (applications.map(application => (  
                <ListGroup.Item
                  key={application._id}
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <div className="ms-2 me-auto">
                    <div className="fw-bold"><h5>{application.name}</h5></div>
                      {application.lenght} <br/>
                      {application.type}
                  </div>
                  <Badge bg="primary" pill>
                    14
                  </Badge>
                </ListGroup.Item>
            ))):
            null
          }
        </ListGroup>

      </div>
    </div>
  )
}

export default Provider