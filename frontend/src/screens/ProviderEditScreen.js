import React, { useState, useEffect } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import {Link ,useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile, userUpdate  } from '../actions/userActions'

function ProviderEditScreen() {

    const navigate = useNavigate()
    
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')  
    const [afm, setAfm] = useState('') 
    const [phone, setPhone] = useState('')
    const [category, setCategory] = useState('')
    const [workers, setWorkers] = useState('')
    const [providerType, setproviderType] = useState('')
    const [country, setCountry] = useState('')
    const [street, setStreet] = useState('')
    const [postal, setPostal] = useState('')
    const [identification, setId] = useState('')
    const [company, setCompany] = useState('')
    const [password, setPassword] = useState('')   
    const [confirmPassword, setConfirmPassword] = useState('') 
    const [errorMessage, setErrorMessage] = useState('')
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    const userupdate = useSelector(state => state.userUpdateReducer)
    const {success} = userupdate

    useEffect(() =>{
        if (userInfo == null) {
            navigate('/sign_in')
        }
        else {
            if (user == null || user.first_name == null || success === true)  {
                if(success === true){
                    navigate('/internship_provider/profile')
                }
                dispatch({type:'USER_UPDATE_RESET'})
                dispatch(userProfile('profile'))
            }
            else {
                if(user.is_student === false){
                    setUsername(user.username)
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    setEmail(user.email)
                    setCategory(user.category)
                    setWorkers(user.workers)
                    setStreet(user.street)
                    setPostal(user.postal)
                    setCompany(user.name)
                    setproviderType(user.providerType)
                    setPhone(user.phone)
                    setAfm(user.afm)
                    setId(user.identification)
                    setCountry(user.country)
                }
                else{
                    navigate('/students/profile')
                }
            }
        }
    }, [userInfo, navigate, dispatch, user, success])

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("papap")
        if (password !== confirmPassword) {
            setErrorMessage("Password does not match.")
        }
        else{
            dispatch(userUpdate({
                'id': user.id,
                'username': username,
                'first_name': first_name,
                'last_name': last_name,
                'password': password,
                'email': email,
                'providerType' : providerType,
                'category' : category,
                'afm' : afm,
                'country': country,
                'workers' : workers,
                'street' : street,
                'postal' : postal,
                'name' : company,
                'identification' : identification,
                'phone' : phone
            }))
        }
    }

    return (
        <div>
            <div 
            style={{ display: 'block', 
                    width: 700, padding: 15 }}
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
                <LinkContainer to = '/internship_provider/profile'>
                    <Breadcrumb.Item>
                    Το προφίλ μου
                    </Breadcrumb.Item>
                </LinkContainer>
                <Breadcrumb.Item active>
                    Επεξεργασία Προφίλ
                </Breadcrumb.Item>
                </Breadcrumb>
                
            </div>
            <Container>
                <Row className = "justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div>
                            <h3 style={{textAlign: "center"}} >Επεξεργασία Προφίλ</h3>
                        </div>
                        {errorMessage && 
                            <div className="alert alert-dismissible alert-danger">
                            <strong>{errorMessage}</strong>
                            </div>
                        }

                        {error && 
                            <div className="alert alert-dismissible alert-danger">
                            <strong>{error}</strong>
                            </div>
                        }
                        {loading &&
                            <Spinner 
                            animation="border" role="status" style={{ margin: 'auto',
                                                                        display: 'block'
                                                                    }}>
                                <span className="visually-hidden">Loading</span>
                            </Spinner>
                        }
                        
                        <Form onSubmit={submitHandler}>
                            <h5 className='py-2'>Στοιχεία Λογαριασμού:</h5>
                            <Form.Group controlId='username' className='py-1'>
                                <Form.Label>Όνομα Χρήστη:</Form.Label>
                                <Form.Control 
                                    type='username' 
                                    placeholder='Disabled input' 
                                    value={username}
                                    onChange = {(e) => setUsername(e.target.value)}                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='email' className='py-1'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type='Email'   
                                    placeholder='Disabled input' 
                                    value={email}
                                    onChange = {(e) => setEmail(e.target.value)}  
                                >        
                                </Form.Control>           
                            </Form.Group> 

                            <Form.Group controlId='password' className='py-1'>
                            <Form.Label>Νέος Κωδικός (Optional)</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Enter Password' 
                                value={password}
                                onChange = {(e) => setPassword(e.target.value)}                            
                            >
                            </Form.Control>
                        </Form.Group> 

                        <Form.Group controlId='passwordConfirm' className='py-3'>
                            <Form.Label>Επιβεβαίωση Κωδικού</Form.Label>
                            <Form.Control 
                                type='password' 
                                placeholder='Confirm Password' 
                                value={confirmPassword}
                                onChange = {(e) => setConfirmPassword(e.target.value)}                            
                            >
                            </Form.Control>
                        </Form.Group> 

                            <h5 className='py-2'>Στοιχεία Φορέα Υποδοχής:</h5>

                            <Form.Group controlId='companyName' className='py-1'>
                                <Form.Label>Επωνυμία:</Form.Label>
                                <Form.Control 
                                    type='name'   
                                    placeholder='Disabled input' 
                                    value={company}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='type' className='py-1'>
                                <Form.Label>Είδος φορέα:</Form.Label>
                                <Form.Control 
                                    type='name'   
                                    placeholder='Disabled input' 
                                    value={providerType}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='field' className='py-1'>
                                <Form.Label>Πεδίο δραστηριότητας:</Form.Label>
                                <Form.Control 
                                    type='name'   
                                    placeholder='Disabled input' 
                                    value={category}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='afm' className='py-1'>
                                <Form.Label>ΑΦΜ:</Form.Label>
                                <Form.Control 
                                    type='text'   
                                    placeholder='Disabled input' 
                                    value={afm}
                                    disabled
                                    readOnly  
                                >        
                                </Form.Control>           
                            </Form.Group> 

                            <Form.Group controlId='workers' className='py-1'>
                                <Form.Label>Απασχολούμενοι:</Form.Label>
                                <Form.Control 
                                    type='text'   
                                    placeholder='Disabled input' 
                                    value={workers}
                                    onChange = {(e) => setWorkers(e.target.value)}  
                                >        
                                </Form.Control>           
                            </Form.Group> 

                            <Form.Group>
                                <Form.Label>Χώρα:</Form.Label>
                                <Form.Control
                                    disabled
                                    readOnly 
                                    type='text' 
                                    placeholder='Enter Country' 
                                    value={country}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Οδός:</Form.Label>
                                <Form.Control
                                    disabled
                                    readOnly 
                                    type='text' 
                                    value={street}
                                >
                                </Form.Control>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>ΤΚ:</Form.Label>
                                <Form.Control
                                    disabled
                                    readOnly 
                                    type='text' 
                                    value={postal}
                                >
                                </Form.Control>
                            </Form.Group>


                            <h5 className='py-2'>Στοιχεία Νομίμου Εκπροσώπου:</h5>
                            <Form.Group controlId='first name' className='py-1'>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control 
                                    type='name'   
                                    placeholder='Disabled input' 
                                    value={first_name}
                                    onChange = {(e) => setFirstName(e.target.value)}                         
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='last name' className='py-1'>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control 
                                    type='last name'   
                                    placeholder='Disabled input' 
                                    value={last_name}
                                    onChange = {(e) => setLastName(e.target.value)}                         
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='phone' className='py-1'>
                                <Form.Label>Τηλέφωνο:</Form.Label>
                                <Form.Control 
                                    type='phone'   
                                    placeholder='Disabled input' 
                                    value={phone}
                                    onChange = {(e) => setPhone(e.target.value)}                            
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='number' className='py-1'>
                                <Form.Label>Αριθμός Ταυτότητας:</Form.Label>
                                <Form.Control 
                                    type='text'   
                                    placeholder='Disabled input' 
                                    value={identification}
                                    onChange = {(e) => setId(e.target.value)}                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Button type='submit' className="btn btn-dark btn-lg" style={{float: 'right'}}>
                                Save Changes
                            </Button>

                            <Link to='/internship_provider/profile'>
                                <Button type="button" className="btn btn-dark btn-lg">
                                    Discard Changes
                                </Button>
                            </Link>

                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProviderEditScreen