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
    const [university, setUni] = useState('')
    
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
                if(user.is_student === true){
                    setUsername(user.username)
                    setFirstName(user.first_name)
                    setLastName(user.last_name)
                    setEmail(user.email)
                    setUni(user.university)
                }
                else{
                    navigate('/internship_provider/profile')
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
                    width: 700, padding: 15, height: '7vh' }}
            >
                <Breadcrumb>
                <LinkContainer to = '/'>
                    <Breadcrumb.Item>
                    Αρχική
                    </Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to = '/internship_provider'>
                    <Breadcrumb.Item>
                    Φοιτητές και Φοιτήτριες
                    </Breadcrumb.Item>
                </LinkContainer>
                <LinkContainer to = '/internship_provider/profile'>
                    <Breadcrumb.Item active>
                    Το προφίλ μου
                    </Breadcrumb.Item>
                </LinkContainer>
                </Breadcrumb>
            </div>
            
            <Container>
                <Row className = "justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className='py-1'>
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
                            <div className='py-3'>
                                <Button type='submit' className="btn btn-primary float-right" style={{float: 'right'}}>
                                    Επεξεργασία Προφίλ
                                </Button>
                            </div>
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

                            <Form.Group controlId='name' className='py-1'>
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

                            <Form.Group controlId='name' className='py-1'>
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

                            <Form.Group controlId='university' className='py-1'>
                                <Form.Label>Σχολή:</Form.Label>
                                <Form.Control 
                                    type='last name'   
                                    placeholder='Disabled input' 
                                    value={university}
                                    disabled
                                    readOnly                           
                                >        
                                </Form.Control>
                            </Form.Group> 
                            <br/>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default ProviderProfileScreen