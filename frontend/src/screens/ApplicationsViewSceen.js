import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form, Modal } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import Accordion from 'react-bootstrap/Accordion';
import { applicationViewAction, applicationUpdateAction } from '../actions/applicationsActions'
import useFitText from "use-fit-text";


function Provider() {
  
  const navigate = useNavigate()
  const match = useParams()

  const dispatch = useDispatch()

  const Applications = useSelector(state => state.applicationsViewReducer)
  const { error, loading, applications } = Applications

  const Update = useSelector(state => state.applicationsUpdateReducer)
  const { loading:uploading , error: upError, success } = Update

  const [message, setMessage] = useState('')
  const [rejectionText, setRej] = useState('')
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 

  const provider = useSelector(state => state.userLoginReducer)
  const {userInfo} = provider

  const { fontSize, ref } = useFitText();

  useEffect(() => {
    if (userInfo != null){
      if(success === true) {
        setMessage('Πραγματοποιήθηκε η Ενέργεια με Επιτυχία')
        dispatch({ type: 'APPLICATION_UPDATE_RESET' })
      }
      if(userInfo.is_student === false){
        dispatch(applicationViewAction(match.id))
      }
      else{
        navigate('/students')
      }
    }
    else{
      navigate('/sign_in')
    }
  }, [dispatch, navigate, userInfo, success,match])


  const onLinkClick = (filename) => {
    // using Java Script method to get PDF file
    fetch(filename).then(response => {
        response.blob().then(blob => {
            // Creating new object of PDF file
            const fileURL = window.URL.createObjectURL(blob);
            // Setting various property values
            let alink = document.createElement('a');
            alink.href = fileURL;
            alink.download = filename.split("/")[2];
            alink.click();
        })
    })
  }

  const acceptHandler = (e,id) => {
    e.preventDefault()
    if(window.confirm("Είστε σίγουροι για αυτήν την ενέργεια;")){
      const form = new FormData()
      form.append('_id', id)
      form.append('state', 'accepted')
      dispatch(applicationUpdateAction(form))
    }
  }


  const declineHandler = (e,id) => {
    e.preventDefault()
    handleClose();
    const form = new FormData()
    form.append('_id', id)
    form.append('state', 'declined')
    form.append('rejectionText',rejectionText)
    console.log(id,rejectionText)
    dispatch(applicationUpdateAction(form))
  }

  return (
    <div>
      <div style={{ display: 'block', 
                  width: 700, padding: 15, height: '7vh'  }}
      >
        <Breadcrumb>
          <LinkContainer to = '/'>
            <Breadcrumb.Item>
              Αρχική
            </Breadcrumb.Item>
          </LinkContainer>
          <LinkContainer to = '/internship_provider'>
            <Breadcrumb.Item>
              Φορείς Υποδοχής
            </Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>
            Αιτήσεις
          </Breadcrumb.Item>
        </Breadcrumb>

        {upError ? (
          <div className="alert alert-dismissible alert-danger">
            <strong>{upError}</strong>
          </div>
        ) : (
          message && 
          <div className="alert alert-dismissible alert-success">
            <strong>{message}</strong>
          </div>
        )} 

        {uploading &&
            <Spinner 
            animation="border" role="status" style={{ margin: 'auto',
                                                        display: 'block'
                                                    }}>
                <span className="visually-hidden">Loading</span>
            </Spinner>
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
            <Accordion className='accordion' style={{
                          maxHeight: 'calc(90vh - 240px)',
                          overflowY: 'auto',
                          }}>
              {Array.isArray(applications) && applications.length ?
                  (applications.map(application => (  
                    <Accordion.Item
                      key = {application._id}
                      eventKey={application._id}
                    >
                      <Accordion.Header className='accordion-header'>
                        <div className="ms-2 me-auto">
                          <div className="fw-bold"><h4>{application.first_name} {application.last_name}</h4></div>
                              Τμήμα: <strong>{application.university}</strong> 
                              {application.state === 'accepted' && <div><br/>Εγκεκριμένη</div>}
                              {application.state === 'declined' && <div><br/>Απορριφθήσα</div>}
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className='accordion-body'>
                        <strong>Βιογραφικό/Αναλυτική Βαθμολογία: </strong>
                        <div ref={ref} 
                            style={{
                            fontSize,
                            height: "100%",
                            width: "100%",
                            objectFit: "cover"}}>
                            <Link onClick={() => onLinkClick(application.cv)}>{application.cv.split("/")[2]}</Link> 

                        </div>
                        <br/>
                        <strong>Μήνυμα: </strong><br/>
                        <p>{application.text}</p>
                        <br/>
                        <br/>
                        <Button variant='danger' onClick={handleShow} disabled={application.state!=="waiting"}>
                          Απόρριψη
                        </Button>
                        <Modal show={show} onHide={handleClose} enforceFocus={false}>
                          <Modal.Header closeButton>
                            <Modal.Title>Μήνυμα</Modal.Title>
                          </Modal.Header>
                          <Modal.Body>
                            <Form>
                              <Form.Group
                                className="mb-3"
                              >
                                <Form.Label>Μήνυμα</Form.Label>
                                <Form.Control 
                                      as="textarea" 
                                      rows={3} 
                                      type='text'   
                                      placeholder='Μήνυμα' 
                                      size="sm"
                                      value= {rejectionText}
                                      onChange = {(e) => setRej(e.target.value)}      
                                />
                              </Form.Group>
                            </Form>
                          </Modal.Body>
                          <Modal.Footer>
                            <Button onClick={handleClose} variant="secondary">
                              Κλείσιμο
                            </Button>
                            <Button onClick={(e) => declineHandler(e,application._id)} variant="primary">
                              Υποβολή
                            </Button>
                          </Modal.Footer>
                        </Modal>
                        <Button onClick={(e) => acceptHandler(e,application._id)} disabled={application.state!=="waiting"} style={{float: 'right'}}>Αποδοχή</Button>
                      </Accordion.Body>
                    </Accordion.Item>
                ))):
                  <div className='py-3' style={{float: 'center'}}>
                    <p class="lead">Δεν υπάρχουν αιτήσεις σε αυτή την αγγελία ακόμα.</p>
                  </div>
              }
            </Accordion>
          }

      </div>
    </div>
  )
}

export default Provider