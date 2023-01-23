import React, {  useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import { Row, Col } from 'react-bootstrap'
import Spinner from 'react-bootstrap/Spinner';
import ProgressBar from 'react-bootstrap/ProgressBar';

import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";

function MultiStepProgressBar({ type = 0 }) {

  const location = useLocation()  
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    providerType: "Ιδιωτικός Φορέας",
    category: "ΑΘλητισμός",
    name: "",
    afm: "",
    workers: "",
    country: "Ελλάδα",
    street: "",
    postal: "",
    first_name: "",
    last_name: "",
    phone: "",
    identification: "",
    university: "Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης",

  });

  const FormTitles = ["Στοιχεία Λογαριασμού", "Στοιχεία Νόμιμου Εκπρόσωπου", "Στοιχεία Φορέα Υποδοχής"];
  const FormStudent = ["Στοιχεία Λογαριασμού", "Σχολή"];
  const Progress = [33.3, 66.6, 100]

  const dispatch = useDispatch()
  const userRegister = useSelector(state => state.userRegisterReducer)
  const {error, loading, userInfo} = userRegister

  useEffect(() =>{
      if (userInfo != null) {
          if(userInfo.is_student === true){
              navigate('/students')  
          }
          else {
              navigate('/internship_provider')
          }
      }
  }, [userInfo, navigate, redirect])

  const PageDisplay = () => {
    if(type === 0){
        if (page === 0) {
            return <Step1 formData={formData} setFormData={setFormData} />;
        } else if (page === 1) {
            return <Step2 formData={formData} setFormData={setFormData} />;
        } else {
            return <Step3 formData={formData} setFormData={setFormData} />;
        }
    }
    else{
        if (page === 0) {
            return <Step4 formData={formData} setFormData={setFormData} />;
        } else {
            return <Step5 formData={formData} setFormData={setFormData} />;
        }  
    }
  };

  const submitHandler = (e) =>{
    e.preventDefault()
    console.log(formData)
    if(formData.username === "" || formData.password === "" || formData.email === "" || formData.fist_name === ""){
        alert("Συμπληρώστε όλα τα πεδία")
    }
    else{
        if(type === 0){
            dispatch(register(formData,'provider'))
        }
        else{
            dispatch(register(formData, 'student'))
        }
    }
  }

  return (
    <div style={{alignItems: 'center'}}>

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
        <Row className="py-2">
            <Col>
                <ProgressBar animated now={type == 0 ? page === 0 ? 33.3 : page == 1 ? 66.6 : 100 : page === 0 ? 50 : 100}/>      
            </Col>
        </Row>
        <div className="form py-2">
            <div className="form-container">
                <div className="header py-3">
                    {type == 0 ? 
                        <h5>{FormTitles[page]}</h5>
                    :
                        <h5>{FormStudent[page]}</h5>
                    }
                    
                </div>
                <div className="body">{PageDisplay()}</div>
                <div className="footer">
                <button type="button" class="btn btn-primary"
                    disabled={page == 0}
                    onClick={() => {
                    setPage((currPage) => currPage - 1);
                    }}
                >
                    Prev
                </button>
                <button type="button" class="btn btn-primary"
                    onClick={(e) => {
                    let length = FormTitles.length;
                    if(type === 1){
                        length = FormStudent.length;
                    }
                    if (page === length - 1) {
                        submitHandler(e);
                    } else {
                        if(formData.password !== formData.confirmPassword){
                          alert("Οι κωδικοί δεν είναι ίδιοι")
                        }
                        else{
                          setPage((currPage) => currPage + 1);
                        }
                    }
                    }}
                >
                    {type === 0 ? 
                        page === FormTitles.length - 1 ? 
                            "Submit" : 
                            "Next"
                        :
                        page === FormStudent.length - 1 ? 
                        "Submit" : 
                        "Next"                       
                    }
                </button>
                </div>
            </div>
        </div>
    </div>
  );
}

export default MultiStepProgressBar;