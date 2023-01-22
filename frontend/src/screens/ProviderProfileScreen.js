import React, { useState, useEffect } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { userProfile } from '../actions/userActions'
// import PhoneInput from 'react-phone-input-2'
// import 'react-phone-input-2/lib/style.css'

function ProviderProfileScreen() {

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
    
    const dispatch = useDispatch()

    const userprofile = useSelector(state => state.userProfileReducer)
    const {error, loading, user} = userprofile

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin

    useEffect(() =>{
        if (userInfo == null) {
            navigate('/sign_in')
        }
        else {
            if (user == null || !user.first_name || Number(userInfo.id) !== Number(user.id))  {
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
    }, [userInfo, navigate, dispatch, user])

    const submitHandler = (e) =>{
        e.preventDefault()
        navigate('update')
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
                <Breadcrumb.Item active>
                    Το προφίλ μου
                </Breadcrumb.Item>
                </Breadcrumb>
                
            </div>
            
            <Container>
                <Row className = "justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div>
                            <h3 style={{textAlign: "center"}} >Το Προφίλ Μου</h3>
                        </div>
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
                            <div className='py-2'>
                                <Button type='submit' className="btn btn-primary float-right" style={{float: 'right'}}>
                                    Edit Your Profile
                                </Button>
                            </div>
                            <h5 className='py-3'>Στοιχεία Λογαριασμού:</h5>
                            <Form.Group controlId='username' className='py-1'>
                                <Form.Label>Όνομα Χρήστη:</Form.Label>
                                <Form.Control 
                                    type='username' 
                                    placeholder='Disabled input' 
                                    value={username}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='email' className='py-1'>
                                <Form.Label>Email:</Form.Label>
                                <Form.Control 
                                    type='Email'   
                                    placeholder='Disabled input' 
                                    value={email}
                                    disabled
                                    readOnly  
                                >        
                                </Form.Control>           
                            </Form.Group> 
                            <h5 className='py-3'>Στοιχεία Φορέα Υποδοχής:</h5>

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

                            <Form.Group controlId='companyName' className='py-1'>
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

                            <Form.Group controlId='companyName' className='py-1'>
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

                            <Form.Group controlId='afm' className='py-1'>
                                <Form.Label>Απασχολούμενοι:</Form.Label>
                                <Form.Control 
                                    type='text'   
                                    placeholder='Disabled input' 
                                    value={workers}
                                    disabled
                                    readOnly  
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


                            <h5 className='py-3'>Στοιχεία Νομίμου Εκπροσώπου:</h5>
                            <Form.Group controlId='first_name' className='py-1'>
                                <Form.Label>First Name:</Form.Label>
                                <Form.Control 
                                    type='name'   
                                    placeholder='Disabled input' 
                                    value={first_name}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='last_name' className='py-1'>
                                <Form.Label>Last Name:</Form.Label>
                                <Form.Control 
                                    type='last name'   
                                    placeholder='Disabled input' 
                                    value={last_name}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='phone' className='py-1'>
                                <Form.Label>Τηλέφωνο:</Form.Label>
                                <Form.Control 
                                    type='phone'   
                                    placeholder='Disabled input' 
                                    value={phone}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='number' className='py-1'>
                                <Form.Label>Αριθμός Ταυτότητας:</Form.Label>
                                <Form.Control 
                                    type='text'   
                                    placeholder='Disabled input' 
                                    value={identification}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 



                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProviderProfileScreen