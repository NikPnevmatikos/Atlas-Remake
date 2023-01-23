import React, { useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Container } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { providerApplications, deleteInternshipAction } from '../actions/applicationsActions'
import { BsPlusCircle, BsTelephoneFill, BsTrash } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";

function Provider() {
  
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
                  width: 700, padding: 15, height: '100%'
                 }}
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
        </div>
        <div >
            <h3 style={{textAlign: "center"}} >Οι Αγγελίες Μου</h3>
        </div>
        <div className='py-2'>
          <LinkContainer to={`create`}>
            <Button className="btn btn-primary float-right" style={{float:'right'}}>
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
            <Container>
              <ListGroup className='single_list' as="ol" numbered style={{
                                                                    maxHeight: 'calc(90vh - 240px)',
                                                                    overflowY: 'auto',
                                                                    }}>
                {Array.isArray(internships) && internships.length ?
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
                          <div>
                            <Badge bg="secondary" style={{float: 'right'}}>
                              Προσωρινή Αποθήκευση
                            </Badge>
                              <br/>
                            <div className='py-3'>
                              <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteHandler(internship._id)} style= {{float:'right'}}><BsTrash/></button>
                            </div>
                            <br/>
                          </div>
                          :
                          <div>

                          <Badge bg="secondary" style={{float: 'right'}}>
                            Έχει Δημοσιευτεί
                          </Badge>
                            <br/>
                            <br/>
                            <br/>
                          </div>
                          }
                          <div>
                            
                            <div style={{float: 'right'}}>
                              <Link to={internship.state === 'final' ? `applications/${internship._id}` : `internships/update/${internship._id}`}>
                                { internship.state === 'temporary' ?
                                  'Επεξεργασία >' 
                                :      
                                  'Προβολή Αγγελιών >'
                                }
                              </Link>
                            </div>
                          </div>
                        </div>
                      </ListGroup.Item>
                  ))):
                    <div className='py-3' style={{float: 'center'}}>
                      <p class="lead">Δεν υπάρχουν αγγελίες ακόμα.</p>
                    </div>
                }
              </ListGroup>
            </Container>
          }
    </div>
  )
}

export default Provider