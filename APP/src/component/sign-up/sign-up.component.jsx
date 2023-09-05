import React, { useState } from 'react';
import SignUpValidation from '../validation/sign-up-validation.compnenet';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import './sign-up-form.styles.css';
import API_URL from '../../config';

const SignUpForm = () => {
  const [values, setValues] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  console.log('hit');

  // const resetFormFields = () => {
  //   // setFormFields(defaultFormFields);
  // };

  axios.defaults.withCredentials = true;
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrors(SignUpValidation(values));
    if (values.password !== values.confirmPassword) {
      alert('passwords do not match');
      return;
    }
    if(errors.username === "" && errors.email === "" && errors.password === ""){
      axios.post(`${API_URL}/signup`, values)
      .then(res => {
        if(res.status === 201){
            navigate('/');
        } else {
          setMessage("error");
          alert("error");
        }
      })
      .catch(err => console.log(err));
    }

   

    // try {
    //   const response = await fetch('http://192.168.103.142:8088/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username: values.username, email: values.email, password: values.password }),
    //   });
    //   console.log(response);
    //   if (response.status === 201) {
    //     alert('Registration successful!');
    //   } else if (response.status === 400) {
    //     alert('Something went wrong!');
    //   } else {
    //     alert('Registration failed.');
    //   }

    //   resetFormFields();
    // } catch (error) {
    //   console.error(error);
    // }
  };

  // After successful authentication
  const userSession = { username: values.username, password: values.password };
  const sessionString = JSON.stringify(userSession);
  sessionStorage.setItem('userSession', sessionString);

  return (
    <div className='sign-up-container col-lg-5 col-12'>
      <div className='card border-success'>
        <div className='card-header text-center'>
          <h2>Don't have an account?</h2>
          <span>Sign up with your email and password</span>
        </div>
        <div className='card-body'>
          <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="username">Display Name</label>
                <input
                type="text"   className='form-control'
                onChange={handleChange}
                value={values.username}  placeholder="User Name" name="username" />
                {errors.username && <span className='text-danger'> {errors.username}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="label">Email</label>
                <input 
                type="email"   placeholder='label' className='form-control'
                onChange={handleChange}
                value={values.email} name="email" />
                {errors.email && <span className='text-danger'> {errors.email}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="Password">Password</label>
                <input
                type="password" placeholder='Password'   className='form-control'
                onChange={handleChange}
                value={values.password} name="password" />
                {errors.password && <span className='text-danger'> {errors.password}</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">confirm Password</label>
                <input
                type="password" placeholder='confirm Password'  
                onChange={handleChange}
                value={values.confirmPassword} name="confirmPassword"  className='form-control' />
              </div>
              <div className="button-container">
                  <button className='btn btn-success w-100'  type="submit">Sign up</button>
              </div>
            <p>{message}</p>
            </form>
        </div>
      </div>
    </div>
  ); 
};

export default SignUpForm;