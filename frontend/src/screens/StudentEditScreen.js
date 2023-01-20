import React, { useState, useEffect } from 'react'
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
    const [university, setUni] = useState('')
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
                    navigate('/students/profile')
                }
                dispatch({type:'USER_UPDATE_RESET'})
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
    }, [userInfo, navigate, dispatch, user, success])

    const submitHandler = (e) =>{
        e.preventDefault()
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
            }))
        }
    }

    return (
        <Container>
            <Row className = "justify-content-md-center">
                <Col xs={12} md={6}>
                    <h1>My Profile</h1>

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
                        <h5 className='py-3'>Στοιχεία Λογαριασμού:</h5>
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
                            <Form.Label>Επώνυμο:</Form.Label>
                            <Form.Control 
                                type='last name'   
                                placeholder='Disabled input' 
                                value={last_name}
                                onChange = {(e) => setLastName(e.target.value)}                         
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

                        <Button type='submit' className="btn btn-primary" style={{float: 'right'}}>
                            Save Changes
                        </Button>

                        <Link to='/internship_provider/profile'>
                            <Button type="button" className="btn btn-secondary">
                                Discard Changes
                            </Button>
                        </Link>

                    </Form>
                </Col>
            </Row>
        </Container>
    )
}

export default ProviderEditScreen