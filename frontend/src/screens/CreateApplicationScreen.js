import React, { useState, useEffect } from 'react'
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { LinkContainer } from 'react-router-bootstrap'
import {useNavigate } from 'react-router-dom'
import { Form, Container, Button, Col, Row } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch, useSelector } from 'react-redux'
import { createInternshipAction  } from '../actions/applicationsActions'

function CreateApplicationScreen() {
    const navigate = useNavigate()
    
    const [name, setName] = useState('')
    const [university, setUniversity] = useState('Καμία Προτίμηση')
    const [length, setLength] = useState('3 μήνες')
    const [type, setType] = useState('Φυσική παρουσία')  
    const [description, setDescription] = useState('') 
    const [date, setDate] = useState('')
    const [country, setCountry] = useState('Ελλάδα')
    const [city, setCity] = useState('Αθήνα')
    const [price, setPrice] = useState('')

    const dispatch = useDispatch()

    const createInternship = useSelector(state => state.createInternshipReducer)
    const {error, loading, internship} = createInternship

    const userLogin = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLogin


    useEffect(() =>{
        dispatch({type:'CREATE_INTERNSHIP_RESET'})
        if (userInfo == null) {
            navigate('/sign_in')
        }
        else {
            if (userInfo.is_student === false){
                if(internship!= null){
                    navigate('/internship_provider')
                }
            }
            else {
                navigate('/students')
            }
        }
        
    }, [userInfo, navigate, dispatch,internship])

    const submitHandler = (e) =>{
        e.preventDefault()
        console.log("papap")

        dispatch(createInternshipAction({
            'id': userInfo.id,
            'name': name,
            'lenght': length,
            'date': date,
            'description': description,
            'university': university,
            'type' : type,
            'price' : price,
            'city' : city,
            'country': country,
            'state': 'final',
        }))
    }

    const buttonHandler = (e) =>{
        e.preventDefault()
        console.log("papap22")

        dispatch(createInternshipAction({
            'id': userInfo.id,
            'name': name,
            'lenght': length,
            'date': date,
            'description': description,
            'university': university,
            'type' : type,
            'price' : price,
            'city' : city,
            'country': country,
            'state': 'temporary',
        }))
    }
    return (
        <div>
            <div 
            style={{ 
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
                    Δημιουργία Νέας Αγγελίας
                </Breadcrumb.Item>
                </Breadcrumb>
                
            </div>
            <Container>
                <Row className = "justify-content-md-center">
                    <Col xs={12} md={6}>
                        <div className='py-1'>
                            <h3 style={{textAlign: "center"}} >Δημιουργία Αγγελίας</h3>
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
                            <Form.Group controlId='name' className='py-1'>
                                <Form.Label>Όνομα Αγγελίας:</Form.Label>
                                <Form.Control 
                                    type='name' 
                                    placeholder='Όνομα Αγγελίας' 
                                    required
                                    value={name}
                                    onChange = {(e) => setName(e.target.value)}                           
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='university' className='py-1'>
                                <Form.Label>Τμήμα Πρακτικάριου:</Form.Label>
                                <Form.Select 
                                    id="university"
                                    onChange = {(e) => setUniversity(e.target.value)} 
                                >    
                                    <option value="Καμία Προτίμηση">Καμία Προτίμηση</option>
                                    <option value="Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης">Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης</option>
                                    <option value="Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών">Εθνικό και Καποδηστριακό Πανεπιστήμιο Αθηνών</option>
                                    <option value="Εθνικό Μετσόβιο Πολυτεχνείο">Εθνικό Μετσόβιο Πολυτεχνείο</option>
                                    <option value="Οικονομικό Πανεπιστήμιο Αθηνών">Οικονομικό Πανεπιστήμιο Αθηνών</option>
                                    <option value="Πανεπιστήμιο Θεσσαλίας">Πανεπιστήμιο Θεσσαλίας</option>
                                    <option value="Πανεπιστήμιο Πειραιώς">Πανεπιστήμιο Πειραιώς</option>
                                </Form.Select>         
                            </Form.Group> 

                            <Form.Group controlId='length' className='py-1'>
                                <Form.Label>Διάρκεια Πρακτικής:</Form.Label>
                                <Form.Select 
                                    id="lenght"
                                    onChange = {(e) => setLength(e.target.value)} 
                                >    
                                    <option value="3 μήνες">3 μήνες</option>
                                    <option value="6 μήνες">6 μήνες</option>
                                </Form.Select> 
                            </Form.Group> 

                            <Form.Group controlId='type' className='py-3'>
                                <Form.Label>Τύπος</Form.Label>
                                <Form.Select 
                                    id="type"
                                    onChange = {(e) => setType(e.target.value)} 
                                >    
                                    <option value="Φυσική παρουσία">Φυσική παρουσία</option>
                                    <option value="Εξ αποστάσεως">Εξ αποστάσεως</option>
                                    <option value="Υβριδικό">Υβριδικό</option>
                                </Form.Select> 
                            </Form.Group> 

                            <Form.Group controlId='description' className='py-1'>
                                <Form.Label>Περισσότερες Πληροφορίες για την Αγγελία:</Form.Label>
                                <Form.Control 
                                    required
                                    type='description'   
                                    placeholder='Enter Description' 
                                    value={description}   
                                    onChange = {(e) => setDescription(e.target.value)}  
                                    as = "textarea"                          
                                    rows = {3}
                                >        
                                </Form.Control>

                            </Form.Group> 

                            <Form.Group controlId='date' className='py-1'>
                                <Form.Label>Ημερομηνία:</Form.Label>
                                <Form.Control 
                                    type='date'   
                                    placeholder='Enter Date' 
                                    value={date}  
                                    required
                                    onChange = {(e) => setDate(e.target.value)}                     
                                >        
                                </Form.Control>
                            </Form.Group> 

                            <Form.Group controlId='Country' className='py-1'>
                                <Form.Label>Χώρα:</Form.Label>
                                <Form.Select 
                                    id="country"
                                    onChange = {(e) => setCountry(e.target.value)} 
                                >    
                                    <option value="Ελλάδα">Ελλάδα</option>
                                    <option value="Κύπρος">Κύπρος</option>
                                </Form.Select> 
                            </Form.Group> 

                            <Form.Group controlId='City' className='py-1'>
                                <Form.Label>Πόλη:</Form.Label>
                                <Form.Select 
                                    id="country"
                                    onChange = {(e) => setCity(e.target.value)} 
                                >    
                                    <option value="Αθήνα">Αθήνα</option>
                                    <option value="Θεσσαλονίκη">Θεσσαλονίκη</option>
                                    <option value="Λάρισα">Λάρισα</option>
                                    <option value="Ρόδος">Ρόδος</option>
                                </Form.Select>       
                            </Form.Group> 

                            <Form.Group controlId='price' className='py-1'>
                                <Form.Label>Αμοιβή:</Form.Label>
                                <Form.Control 
                                    type='number'  
                                    required 
                                    placeholder='Enter Price' 
                                    value={price}
                                    onChange = {(e) => setPrice(e.target.value)}  
                                >        
                                </Form.Control>           
                            </Form.Group> 

                            <div className='py-4'>
                                <Button type='submit' className="btn btn-primary" style={{float: 'right'}}>
                                    Υποβολή Αγγελίας
                                </Button>
                                    
                                <Button onClick={buttonHandler} className="btn btn-secondary">
                                    Προσωρινή Αποθήκευση
                                </Button>
                            </div>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default CreateApplicationScreen