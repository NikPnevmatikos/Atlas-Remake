import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { providerApplications, deleteInternshipAction } from '../actions/applicationsActions'
import { BsPlusCircle, BsTelephoneFill, BsTrash } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";

function Provider() {
  
  const location = useLocation()
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const Internships= useSelector(state => state.providerApplicationsReducer)
  const { error, loading, internships } = Internships

  const provider = useSelector(state => state.userLoginReducer)
  const {userInfo} = provider

  const deleteInternship = useSelector(state => state.deleteInternshipReducer)
  const {error: delete_error, loading: delete_load, success } = deleteInternship

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
  }, [dispatch, navigate, userInfo, success])

  const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Internship?')) {
        dispatch(deleteInternshipAction(id))
    }
}

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
        <div className='single_list'>
            <h3 style={{textAlign: "center"}} >Οι Αγγελίες Μου</h3>
        </div>
        <div className='py-5'>
          <LinkContainer to={`create`}>
            <Button className="btn btn-primary">
                Δημιουργία Αγγελίας  <BsPlusCircle className='react-icons'/>
            </Button>
          </LinkContainer>
        </div>

        {delete_load && 
                <Spinner 
                animation="border" role="status" style={{ margin: 'auto',
                                                            display: 'block'
                                                        }}>
                    <span className="visually-hidden">Loading</span>
                </Spinner>
        }
        {delete_error && 
            <div className="alert alert-dismissible alert-danger">
                <strong>{delete_error}</strong>
            </div>
        }
        {loading ? 
          <Spinner 
          animation="border" role="status" style={{ margin: 'auto',
                                                    display: 'block'
                                                  }}>
            <span className="visually-hidden">Loading</span>
          </Spinner>
          : error ?
            <div className="alert alert-dismissible alert-danger">
              <strong>{error}</strong>
            </div>
            :
            <ListGroup className='single_list' as="ol" numbered>
              {Array.isArray(internships) ?
                  (internships.map(internship => (  
                    <ListGroup.Item
                      key={internship._id}
                      as="li"
                      className="d-flex justify-content-between align-items-start object-fit-cover"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          <h5>{internship.name}</h5>
                        </div>
                        <HiLocationMarker className='react-icons'/>{internship.country}, {internship.city} <br/>
                        {internship.lenght}, {internship.type}<br/>
                        <BsTelephoneFill className='react-icons'/>{userInfo.phone}, <GrMail className='react-icons'/>{userInfo.email} <br/>
                      </div>
                      <div>
                        {internship.state === 'temporary' ?
                        <button type="button" class="btn btn-outline-danger" onClick={() => deleteHandler(internship._id)} style= {{float:'right'}}><BsTrash/></button>
                        :
                        <Badge bg="light" pill style={{float: 'right'}}>
                          Posted
                        </Badge>
                        }
                        <div>
                          <br/>
                          <br/>
                          <br/>
                          <Link to={internship.state === 'final' ? `applications/${internship._id}` : `internships/update/${internship._id}`}>
                            { internship.state === 'temporary' ?
                              'Επεξεργασία >' 
                            :      
                              'Προβολή Αγγελιών >'
                            }
                          </Link>
                        </div>
                      </div>
                    </ListGroup.Item>
                ))):
                null
              }
            </ListGroup>
          }
      </div>
    </div>
  )
}

export default Provider