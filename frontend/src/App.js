import './App.css';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Provider from './screens/Provider';
import ProviderProfileScreen from './screens/ProviderProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
// import RegisterProviderScreen from './screens/RegisterProviderScreen';
import ProviderEditScreen from './screens/ProviderEditScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import StudentEditScreen from './screens/StudentEditScreen';

function App() {
  return (
    <Router>
      <Header/>
      <main >
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen/>} exact />
            <Route path='/sign_in' element={<LoginScreen/>}/>
            <Route path='/internship_provider' element={<Provider/>}/>
            <Route path='/internship_provider/profile' element= {<ProviderProfileScreen/>}/>
            <Route path='/internship_provider/profile/update' element= {<ProviderEditScreen/>}/>
            <Route path='/sign_up' element= {<RegisterScreen/>}/>
            <Route path='/students/profile' element= {<StudentProfileScreen/>}/>
            <Route path='/students/profile/update' element= {<StudentEditScreen/>}/>
          </Routes>
        </Container>
      </main>
      <Footer/>

    </Router>
  );
}

export default App;
