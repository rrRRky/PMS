import React, { useState } from 'react';
import SignInValidation from '../validation/sign-in-validation.component';
import { useNavigate } from 'react-router-dom';
import { useAuthDispatch } from '../path-to-your-context/AuthContext'; 
import { loginUser } from '../path-to-your-context/actions'; 
import { ReactComponent as DecoLogo } from '../../assets/jlogo.svg';
import './sign-in-form.styles.css';

const SignInForm = () => {
  const [values, setValues] = useState({
    userId: '',
    password: '',
  });
  const authDispatch = useAuthDispatch();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(SignInValidation(values));

    if (Object.keys(errors).length === 0) {
      loginUser(authDispatch, values)
        .then((data) => {
          if (data) {
            // Successful login, navigate to the dashboard
            navigate('/dashboard');
          } else {
            setMessage('Sign-in failed. Please try again.');
          }
        })
        .catch((error) => {
          console.log(error);
          setMessage('Sign-in failed. Please try again.');
        });
    }
  };

  return (
    <div className='d-flex flex-column' style={{ height: '97vh' }}>
        <div className='sign-up-container col-lg-3 col-md-4 col-sm-6 col-12 m-auto'>
        <div className='card border-success'>
            <div className='card-body'>
            <span className='loginLogo'>
                <DecoLogo className='sitlogo' />
            </span>
            <h5 className='mb-3 mt-3'>Account Log In</h5>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                <label htmlFor='userId' className='mb-2 form-label'>
                    User Name
                </label>
                <input
                    type='text'
                    className='form-control'
                    onChange={handleChange}
                    name='userId'
                    value={values.userId}
                    placeholder='Enter Name'
                />
                {errors.userId && <span className='text-danger'>{errors.userId}</span>}
                </div>
                <div className='mb-3'>
                <label htmlFor='password' className='mb-2 form-label'>
                    password
                </label>
                <input
                    className='form-control'
                    type='password'
                    onChange={handleChange}
                    name='password'
                    value={values.password}
                    placeholder='Enter password'
                />
                {errors.password && <span className='text-danger'>{errors.password}</span>}
                </div>
                <div className='buttons-container d-flex justify-content-center'>
                <button className='btn btn-success w-100' type='submit'>
                    Sign In
                </button>
                </div>

                {message && <p className='text-danger'>{message}</p>}
            </form>
            </div>
        </div>
        </div>
        <div className='container-fluid'>
        <div className='row'>
            <div className='col-lg-12 text-center'>
            <span>© 2023 Jayanita Exports. All Rights Reserved.</span>
            </div>
        </div>
        </div>
  </div>
  );
};

export default SignInForm;
