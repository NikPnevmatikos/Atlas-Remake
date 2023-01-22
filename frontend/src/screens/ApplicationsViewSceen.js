import React, {useState, useEffect} from 'react'
import {Link, useParams, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import { Button } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Spinner from 'react-bootstrap/Spinner';
// import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';
import { applicationViewAction, applicationUpdateAction } from '../actions/applicationsActions'
import { BsPlusCircle } from "react-icons/bs";
import useFitText from "use-fit-text";


function Provider() {
  
  const location = useLocation()
  const navigate = useNavigate()
  const match = useParams()

  const dispatch = useDispatch()

  const Applications = useSelector(state => state.applicationsViewReducer)
  const { error, loading, applications } = Applications

  const Update = useSelector(state => state.applicationsUpdateReducer)
  const { loading:uploading , error: upError, success } = Update

  const [message, setMessage] = useState('')
  const [rejectionText, setRej] = useState('')
 

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
  }, [dispatch, navigate, userInfo, success])


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

  const acceptHandler = (id) => {
    alert("Είστε σίγουροι για αυτήν την ενέργεια;")
    const form = new FormData()
    form.append('_id', id)
    form.append('state', 'accepted')
    dispatch(applicationUpdateAction(form))
  }

  const declineHandler = (id,rejectionText) => {
    const form = new FormData()
    form.append('_id', id)
    form.append('state', 'declined')
    form.append('rejectionText',rejectionText)
    dispatch(applicationUpdateAction(form))
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
            <Accordion className='accordion'>
              {Array.isArray(applications) ?
                  (applications.map(application => (  
                    <Accordion.Item
                      key = {application._id}
                      eventKey={application._id}
                    >
                      <Accordion.Header className='accordion-header'>
                        <div className="ms-2 me-auto">
                          <div className="fw-bold"><h4>{application.first_name} {application.last_name}</h4></div>
                              Τμήμα:<strong>{application.university}</strong> 
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
                        <OverlayTrigger
                          trigger="click"
                          key='right'
                          placement='right'
                          overlay={
                            <Popover id={`popover-positioned-right`}>
                              <Popover.Header as="h3">Αιτιολογία Απόρριψης:</Popover.Header>
                              <Popover.Body>
                                  lalal
                              </Popover.Body>
                            </Popover>
                          }
                        >
                          <Button disabled={application.state!=="waiting"} variant='danger'>Απόρριψη</Button>
                        </OverlayTrigger>
                        <Button onClick={() => acceptHandler(application._id,application.state)} disabled={application.state!=="waiting"} style={{float: 'right'}}>Αποδοχή</Button>
                      </Accordion.Body>
                    </Accordion.Item>
                ))):
                null
              }
            </Accordion>
          }

      </div>
    </div>
  )
}

export default Provider