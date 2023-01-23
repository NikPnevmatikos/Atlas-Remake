import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Form, Modal } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { studentApplicationsView, deleteApplyAction, applicationUpdateAction } from '../actions/applicationsActions'
import { BsPlusCircle, BsTelephoneFill, BsTrash } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";

function Applications() {
  const location = useLocation()
  const navigate = useNavigate()

  const [flag, setFlag] = useState(false)
  const [file, setFile] = useState()
  const [text, setText] = useState('')
  const [show, setShow] = useState(false);
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
 
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const dispatch = useDispatch()

  const Applications= useSelector(state => state.studentApplicationsViewReducer)
  const { error, loading, applications } = Applications

  const student = useSelector(state => state.userLoginReducer)
  const {userInfo} = student

  const Update = useSelector(state => state.applicationsUpdateReducer)
  const { loading:uploading , error: upError, success: upSuccess } = Update

  const deleteApplication = useSelector(state => state.deleteApplyReducer)
  const {error: delete_error, loading: delete_load, success } = deleteApplication

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
  }, [dispatch, navigate, userInfo,success, upSuccess])

  const deleteHandler = (id) => {

    if (window.confirm('Are you sure you want to delete this Apply?')) {
        dispatch(deleteApplyAction(id))
    }
  }

  const submitHandler = (e,id) => {
    e.preventDefault()
    handleClose();

    const form = new FormData()

    form.append('_id', id)
    form.append('state', 'waiting')
    form.append('flag', flag)
    form.append('file', file)
    form.append('text', text)

    dispatch(applicationUpdateAction(form))
}

  const upload = (e) => {
    setFlag(true)
    const file = e.target.files[0]
    setFile(file)
  }

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
          <LinkContainer to = '/students'>
            <Breadcrumb.Item>
              Φοιτητές και Φοιτήτριες
            </Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>
            Οι αιτήσεις μου
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>  
        <div>
            <h3 style={{textAlign: "center"}} >Οι Αιτήσεις Μου</h3>
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
            <ListGroup className='single_list' as="ol" numbered style={{
                                                          maxHeight: 'calc(90vh - 240px)',
                                                          overflowY: 'auto',
                                                          }}>
              
              {Array.isArray(applications) && applications.length ?
                  (applications.map(application => (  
                    <ListGroup.Item
                      key={application._id}
                      as="li"
                      className="d-flex justify-content-between align-items-start object-fit-cover"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">
                          <Link to={`/students?id=${application.internship}`}>
                            <h5>{application.name}</h5>
                          </Link>
                        </div>
                        <HiLocationMarker className='react-icons'/>{application.country}, {application.city} <br/>
                        {application.lenght}, {application.type}<br/>
                        <BsTelephoneFill className='react-icons'/>{application.phone}, <GrMail className='react-icons'/>{application.email} <br/>
                      </div>
                      <div>
                        {application.state === 'temporary' ?
                        <div>
                          <Badge bg="secondary" style={{float: 'right'}}>
                            Προσωρινή Αποθήκευση
                          </Badge>
                            <br/>
                          <div className='py-3'>
                            <button type="button" class="btn btn-danger btn-sm" onClick={() => deleteHandler(application._id)} style= {{float:'right'}}><BsTrash/></button>
                          </div>
                          <br/>
                        </div>
                        :
                         application.state === 'accepted' ?
                          <div>
                          <Badge bg="secondary" style={{float: 'right'}}>
                            Εγκρίθηκε
                          </Badge>
                            <br/>
                            <br/>
                            <br/>
                          </div>
                          : application.state === 'declined' ?
                          <div>
                            <Badge bg="secondary" style={{float: 'right'}}>
                              Απορρίφθηκε
                            </Badge>
                              <br/>
                              <br/>
                              <br/>
                          </div>     
                          :
                            <div>
                              <Badge bg="secondary" style={{float: 'right'}}>
                                Εκκρεμεί
                              </Badge>
                                <br/>
                                <br/>
                                <br/>
                            </div>                                                
                        }
                        <div>
                          
                          <div style={{float: 'right'}}>
                            {application.state !== 'waiting' ?
                              application.state === 'temporary' ?
                                (
                                  <>
                                  <Link onClick={handleShow}>
                                    Επεξεργασία
                                  </Link>
                            
                                  <Modal show={show} onHide={handleClose} enforceFocus={false}>
                                    <Modal.Header closeButton>
                                      <Modal.Title>Επεξεργασία</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                      <Form>
                                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                          <Form.Label>Βιογραφικό/Αναλυτική Βαθμολογία</Form.Label> 
                                  
                                          <Form.Control 
                                              type="file"
                                              size="sm"
                                              onChange = {upload}
                                              />
                                        </Form.Group>
                                        <Form.Group
                                          className="mb-3"
                                          controlId="exampleForm.ControlTextarea1"
                                        >
                                          <Form.Label>Μήνυμα</Form.Label>
                                          <Form.Control 
                                                as="textarea" 
                                                rows={3} 
                                                type='description'   
                                                placeholder='Μήνυμα' 
                                                size="sm"
                                                defaultValue= {application.text}
                                                onChange = {(e) => setText(e.target.value)}      
                                          />
                                        </Form.Group>
                                      </Form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                      <Button variant="secondary" onClick={handleClose}>
                                        Close
                                      </Button>
                                      <Button onClick={(e) => submitHandler(e,application._id)} variant="primary">
                                        Save Changes
                                      </Button>
                                    </Modal.Footer>
                                  </Modal>
                                </>)
                                : application.state === 'declined' && (
                                <OverlayTrigger
                                  trigger="click"
                                  key={'left'}
                                  placement={'left'}
                                  overlay={
                                    <Popover id={`popover-positioned-left`}>
                                      <Popover.Header as="h3">{`Μήνυμα Απόρριψης`}</Popover.Header>
                                      <Popover.Body>
                                        {application.rejectionText}
                                      </Popover.Body>
                                    </Popover>
                                  }
                                >
                                  <Link >Μήνυμα Απόρριψης</Link>
                                </OverlayTrigger>
                              )
                            :
                            (
                            <>
                                <Link onClick={handleShow2}>
                                  Προβολή
                                </Link>
                          
                                <Modal show={show2} onHide={handleClose2} enforceFocus={false}>
                                  <Modal.Header closeButton>
                                    <Modal.Title>Προβολή</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form>
                                      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                        <Form.Label>Βιογραφικό/Αναλυτική Βαθμολογία</Form.Label> 
                                        <Link onClick={() => onLinkClick(application.cv)}>{application.cv.split("/")[2]}</Link>
                                      </Form.Group>
                                        
                                        <Form.Group
                                            className="mb-3"
                                        >
                                          <Form.Label>Μήνυμα</Form.Label>
                                            <Form.Control 
                                                  as="textarea" 
                                                  rows={3}    
                                                  placeholder='Μήνυμα' 
                                                  size="sm"
                                                  readOnly
                                                  value= {application.text}     
                                              />
                                      </Form.Group>
                                    </Form>
                                  </Modal.Body>
                                  <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2}>
                                      Close
                                    </Button>
                                  </Modal.Footer>
                                </Modal>
                            </>)
                            
                            }
                          </div>
                        </div>
                      </div>
                    </ListGroup.Item>
                ))):
                  <div className='py-3' style={{float: 'center'}}>
                    <p class="lead">Δεν υπάρχουν αιτήσεις σε αγγελίες ακόμα.</p>
                  </div>
                }
            </ListGroup>
          }
    </div>
  )
}

export default Applications