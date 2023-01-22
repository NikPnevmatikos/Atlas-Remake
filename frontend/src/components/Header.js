import React from 'react'
import { logout } from '../actions/userActions'
import {useState} from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { useNavigate, useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {useDispatch, useSelector} from 'react-redux'


// import { atlas_logo } from './atlas_logo.png'

function Header() {

  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLoginReducer)
  const {userInfo} = userLogin

  const logoutHandler = () => {
    dispatch(logout())
  }

  return (
      <Navbar bg='light' expand='lg' variant='light'>
        <Container fluid>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img style={{width:"80px", height:"80px"}} src="/atlas_logo.png" alt="" ></img>
              </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='navbarScroll' />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="navbar-nav justify-content-end" style={{ width: "100%" }} navbarScroll>
              {userInfo ? 
                userInfo.is_student ?
                  <>
                    <LinkContainer to='/students'>
                      <Nav.Link>Αναζήτηση Θέσης</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/students/applications'>
                      <Nav.Link>Οι Αιτήσεις μου</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/about'>
                      <Nav.Link>About Ατλα</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/announcement'>
                      <Nav.Link>Ανακοινώσεις</Nav.Link>
                    </LinkContainer>
                    <NavDropdown align="end" title={userInfo.username} id='username'>
                      <LinkContainer to='/students/profile'>
                        <NavDropdown.Item>Το προφίλ μου</NavDropdown.Item>
                      </LinkContainer> 
                      <NavDropdown.Divider/>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Αποσύνδεση
                      </NavDropdown.Item>
                    </NavDropdown> 
                  </>
                  :
                  <>
                    <LinkContainer to='/internship_provider'>
                      <Nav.Link>Οι αγγελίες μου</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/about'>
                      <Nav.Link>About Ατλα</Nav.Link>
                    </LinkContainer>
                    <LinkContainer to='/announcement'>
                      <Nav.Link>Ανακοινώσεις</Nav.Link>
                    </LinkContainer>
                    <NavDropdown align="end" title={userInfo.username} id='username'>
                      <LinkContainer to='/internship_provider/profile'>
                        <NavDropdown.Item>Το προφίλ μου</NavDropdown.Item>
                      </LinkContainer> 
                      <NavDropdown.Divider/>
                      <NavDropdown.Item onClick={logoutHandler}>
                        Αποσύνδεση
                      </NavDropdown.Item>
                    </NavDropdown>     
                  </>
                :
                <>
                  <LinkContainer to='/students'>
                    <Nav.Link>Φοιτητές/τριες</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/internship_provider'>
                    <Nav.Link>Φορείς Υποδοχής</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/about'>
                    <Nav.Link>About Ατλα</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/announcement'>
                    <Nav.Link>Ανακοινώσεις</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/sign_up'>
                    <Nav.Link>Εγγραφή</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to='/sign_in'>
                    <Nav.Link>Σύνδεση</Nav.Link>
                  </LinkContainer>
                </>
              }
              
            </Nav>
            {/* <button type="button" class="btn btn-info">Ελληνικά</button> */}
            {/* <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
              <div class="dropdown-menu" style="">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </li> */}

          </Navbar.Collapse>
        </Container>
      </Navbar>
  )
}

export default Header