import './App.css';
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import Provider from './screens/Provider';
import Student from './screens/Student';
import Applications from './screens/Applications'
import ProviderProfileScreen from './screens/ProviderProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProviderEditScreen from './screens/ProviderEditScreen';
import StudentProfileScreen from './screens/StudentProfileScreen';
import StudentEditScreen from './screens/StudentEditScreen';
import ApplicationsViewScreen from './screens/ApplicationsViewSceen'
import CreateApplicationScreen from './screens/CreateApplicationScreen';
import EditInternshipScreen from './screens/EditInternshipScreen'

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
            <Route path='/internship_provider/create' element={<CreateApplicationScreen/>}/>
            <Route path='/internship_provider/internships/update/:id' element={<EditInternshipScreen/>}/>
            <Route path='/internship_provider/profile' element= {<ProviderProfileScreen/>}/>
            <Route path='/internship_provider/profile/update' element= {<ProviderEditScreen/>}/>
            <Route path='/internship_provider/applications/:id' element={<ApplicationsViewScreen/>}/>
            <Route path='/sign_up' element= {<RegisterScreen/>}/>
            <Route path='/students' element= {<Student/>}/>
            <Route path='/students/applications' element= {<Applications/>}/>
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
