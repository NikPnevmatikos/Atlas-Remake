import React from 'react'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import RegisterProviderScreen from './RegisterProviderScreen'
import RegisterStudentScreen from './RegisterStudentScreen'

function RegisterScreen() {
  return (
    <div className='py-3'>
      <Tabs
          defaultActiveKey="students"
          id="justify-tab-example"
          className="mb-3"
          justify
          >
          <Tab eventKey="students" title="Φοιτητές">
              <RegisterStudentScreen/>
          </Tab>
          <Tab eventKey="provider" title="Φορείς Υποδοχής">
              <RegisterProviderScreen/>
          </Tab>
      </Tabs>
    </div>
  )
}

export default RegisterScreen