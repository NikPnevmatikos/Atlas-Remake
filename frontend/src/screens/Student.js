import React, {useState, useEffect} from 'react'
import {Link, useNavigate, useLocation} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Dropdown from 'react-bootstrap/Dropdown';
import Tab from 'react-bootstrap/Tab';
import { LinkContainer } from 'react-router-bootstrap'
import { Button, Row, Col, Container, Modal, Form } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge';import ListGroup from 'react-bootstrap/ListGroup';
import Spinner from 'react-bootstrap/Spinner';
import { studentApplications, createApplyAction } from '../actions/applicationsActions'
import { BsPlusCircle, BsTelephoneFill, BsTrash, BsBuilding, BsFillCalendarWeekFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { HiLocationMarker } from "react-icons/hi";
import { FaBusinessTime, FaMoneyBillWave } from "react-icons/fa";
import axios from 'axios';


function Student() {
  const location = useLocation()
  const navigate = useNavigate()
  const params = new URLSearchParams(location.search)

  const [flag, setFlag] = useState(false)
  const [current, setCur] = useState({})
  const [file, setFile] = useState()
  const [text, setText] = useState('')
  const [show, setShow] = useState(false);
  const [keyword , setKeyword] = useState('')
  const [uni, setUni] = useState('')
  const [lenght, setLen] = useState('')
  const [type, setType] = useState('')
  const [loc, setLoc] = useState('')
  const [visible, setVis] = useState('')
  // const [message, setMessage] = useState('')
 
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch()

  const Applications= useSelector(state => state.studentApplicationsReducer)
  const { error, loading, applications } = Applications

  const Create = useSelector(state => state.createApplyReducer)
  const { success } = Create

  const student = useSelector(state => state.userLoginReducer)
  const {userInfo} = student


//   const deleteApplication = useSelector(state => state.deleteApplicationReducer)
//   const {error: delete_error, loading: delete_load, success } = deleteApplication

  useEffect(() => {
    dispatch(studentApplications(`?${keyword}`))
    if(success){
      dispatch({type: 'CREATE_APPLY_RESET'})
      alert("Η ενέργεια πραγματοποιήθηκε με επιτυχία")
    }
    if(keyword){
        navigate(`/students?${keyword}`)
    }
    
    if(userInfo != null && userInfo.is_student === false){
      navigate('/internship_provider')
    }
  }, [dispatch, success, navigate,userInfo, keyword])

  const submitHandler = (e,id,state) => {
    if(userInfo != null){
      e.preventDefault()
      handleClose();

      const form = new FormData()

      form.append('_id', id)
      form.append('state', state)
      form.append('flag', flag)
      form.append('file', file)
      form.append('text', text)

      console.log(id, flag, state, file, text)
      dispatch(createApplyAction(form))
    }
    else{
      navigate('/sign_in')
    }
}

  const upload = (e) => {
    setFlag(true)
    const file = e.target.files[0]
    setFile(file)
  }

  let obj = {}
  const handleClick = (e,application) => {
    e.preventDefault();
    if(keyword){
     navigate(`/students?id=${application._id}&${keyword}`) 
    }
    else{
      navigate(`/students?id=${application._id}`)
    }
    
    setCur(current => ({...application}))

    if(userInfo){

      const config = {
        headers: {
            'Content-type': 'multipart/form-data',
            Authorization : `Bearer ${userInfo.token}`
        }
      }

      axios.get(
        `/api/apply/exist/${application._id}/`,
        config
      ).then(res => {
        setVis(res.data);
      })
    }

  }

  const setCurrent = (e) => {
    let cur = applications.find(obj => {
      return obj._id === Number(params.get("id"));
    });
    setCur(current => ({...cur}))
  }

  const clickHandler = (e) => {
      let key = ''
      key = key + 'uni='
      if(uni !== 'Τμήμα'){
        key = key + `${uni}`
      }
      key = key + '&len='
      if(lenght !== 'Διάρκεια'){
        key = key + `${lenght}`
      }
      key = key + '&type='
      if(type !== 'Τύπος' ){
        key = key + `${type}`
      }
      key = key + '&loc='
      if (loc !== 'Τοποθεσία'){
        key = key + `${loc}`
      }
      setKeyword(key)
  }

  return (
    <div>
      <div style={{ display: 'block', 
                  width: 700, padding: 15, height: '7vh' }}
      >
        <Breadcrumb>
          <LinkContainer to = '/'>
            <Breadcrumb.Item>
              Αρχική
            </Breadcrumb.Item>
          </LinkContainer>
          <Breadcrumb.Item active>
            Φοιτητές και Φοιτήτριες
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>

      {/*   D   R   O   P   D   O   W   N   S  */}
      <div class="btn-group py-2" style={{width: 'fit-content', display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
        <Form.Select style={{width: '40%'}} 
                    size="sm"
                    id="university"
                    onChange = {(e) => setUni(e.target.value)} 
        >
          <option>Τμήμα</option>
          <option value="Αριστοτέλειο Πανεπιστήμιο Θεσσαλονικης">Αριστοτέλειο Πανεπιστήμιο Θεσσαλονικης</option>
          <option value="Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών">Εθνικό και Καποδηστριακό Πανεπιστήμιο Αθηνών</option>
          <option value="Εθνικό Μετσόβιο Πολυτεχνείο">Εθνικό Μετσόβιο Πολυτεχνείο</option>
          <option value="Οικονομικό Πανεπιστήμιο Αθηνών">Οικονομικό Πανεπιστήμιο Αθηνών</option>
          <option value="Οικονομικό Πανεπιστήμιο Αθηνών">Οικονομικό Πανεπιστήμιο Αθηνών</option>
          <option value="Πανεπιστήμιο Πειραιώς">Πανεπιστήμιο Πειραιώς</option>
        </Form.Select>
        <Form.Select style={{width: '40%'}}
              size="sm"
              id="lenght"
              onChange = {(e) => setLen(e.target.value)} >
          <option>Διάρκεια</option>
          <option value="3 μήνες">3 μήνες</option>
          <option value="6 μήνες">6 μήνες</option>
        </Form.Select>
        <Form.Select style={{width: '40%'}}
                  size="sm"
                  id="type"
                  onChange = {(e) => setType(e.target.value)} >
          <option>Τύπος</option>
          <option value="Φυσική παρουσία">Φυσική παρουσία</option>
          <option value="Εξ αποστάσεως">Εξ αποστάσεως</option>
          <option value="Υβριδικό">Υβριδικό</option>
        </Form.Select>

        <Form.Select style={{width: '40%'}}
                size="sm"
                id="city"
                onChange = {(e) => setLoc(e.target.value)} >
          <option>Τοποθεσία</option>
          <option value="Αθήνα">Αθήνα</option>
          <option value="Θεσσαλονίκη">Θεσσαλονίκη</option>
          <option value="Λάρισα">Λάρισα</option>
          <option value="Λάρισα">Λάρισα</option>
          <option value="Ρόδος">Ρόδος</option>
        </Form.Select>
        <div>
          <Button onClick={clickHandler}variant="outline-primary" style={{width: 'max-content'}}> Εφάρμογη των Φίλτερ </Button>
        </div>
      </div>

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
        applications.length === 0 ?
          <Container>
          <div className='py-3' style={{float: 'center'}}>
            
            <p class="lead">Δεν υπάρχουν διαθέσιμα αποτελέσματα.</p>
          </div>
          </Container>
        :
        <Tab.Container id="list-group-tabs-example" defaultActiveKey={(e)=>{
                                                      if(params.get("id")){
                                                        setCurrent(e)
                                                        return '?id='+params.get("id")
                                                      }
                                                      }}>
          <Row>
            <Col sm={4}>
              <ListGroup style={{
                  maxHeight: 'calc(100vh - 210px)',
                  overflowY: 'auto'
                }}>
                {applications.map(application =>(
                  <ListGroup.Item action key={application._id} onClick={(e) =>handleClick(e,application)} href={'?id='+application._id}>
                    {application.companyName}
                    <h4> <small class="text-muted"> {application.name} </small> </h4> 
                    <HiLocationMarker className='react-icons'/>{application.country}, {application.city} <br/>
                    {application.lenght}, {application.type}<br/>
                    <BsTelephoneFill className='react-icons'/>{application.phone}, <GrMail className='react-icons'/>{application.email} <br/>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col sm={8}>
              <Tab.Content style={{
                  maxHeight: 'calc(105vh - 240px)',
                  overflowY: 'auto',
                  }}
                >
                {params.get("id") &&
                  <div>
                    <Tab.Pane eventKey={'?id='+params.get("id")}>
                    <Row >
                      <Col md={12}>
                        <Container style={{backgroundColor: 'white', padding: '3%'}}>
                          <Row style={{width: '100%'}}>
                            <Col style={{width: 'fit-content'}}>
                              <p class="lead" style={{width: 'fit-content'}}><em>{current.companyName}</em></p> 
                            </Col>
                            <Col style={{width: 'content', float: 'right'}}>
                              <Button disabled={visible==='true'} onClick={handleShow} className="btn btn-primary float-right" style={{ float:'right', width: 'fit-content'}}>
                                {visible ?
                                  visible ==='true' ? 'Έγινε Αίτηση' : 'Κάνε Αίτηση'
                                  : 'Κάνε Αίτηση'
                                }
                              </Button>

                              <Modal show={show} onHide={handleClose} enforceFocus={false}>
                                <Modal.Header closeButton>
                                  <Modal.Title>Αίτηση</Modal.Title>
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
                                    >
                                      <Form.Label>Μήνυμα</Form.Label>
                                      <Form.Control 
                                            as="textarea" 
                                            rows={3} 
                                            type='text'   
                                            placeholder='Μήνυμα' 
                                            size="sm"
                                            value= {text}
                                            onChange = {(e) => setText(e.target.value)}      
                                      />
                                    </Form.Group>
                                  </Form>
                                </Modal.Body>
                                <Modal.Footer>
                                  <Button onClick={(e) => submitHandler(e,current._id,'temporary')} variant="secondary">
                                    Προσωρινή Αποθήκευση
                                  </Button>
                                  <Button onClick={(e) => submitHandler(e,current._id,'waiting')} variant="primary">
                                    Υποβολή
                                  </Button>
                                </Modal.Footer>
                              </Modal>
                            </Col> 
                            
                               
                          </Row>
                    
                            
                        
                          <h2>{current.name}</h2>
                          <hr
                            style={{
                              background: 'gray',
                              color: 'gray',
                              borderColor: 'gray',
                              height: '2px',
                            }}
                          />
                          <h5>Περιγραφή Πρακτικής Άσκησης:</h5>
                          <Container>
                            <HiLocationMarker/> {current.country}, {current.city} <br/>
                            <FaBusinessTime/> {current.lenght} <br/>
                            <BsBuilding/> {current.type} <br/>
                            <BsFillCalendarWeekFill/> {current.date} <br/>
                            <BsTelephoneFill/> {current.phone} <br/>
                            <GrMail/> {current.email} <br/>
                            <FaMoneyBillWave/> {current.price}€ 
                            <br/>
                            <strong>Περιγραφή:</strong><br/>
                            <Container>
                              {current.description}
                            </Container>
                          </Container>
                        </Container>
                      </Col>
                    </Row>
                    </Tab.Pane>
                  </div>
                } 
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      }
    </div>
  )
}

export default Student