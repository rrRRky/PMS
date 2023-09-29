import React, { useState , useEffect } from 'react';
import SignInValidation from '../validation/sign-in-validation.compnenet';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useUserLoginDetailContext } from '../../contexts/userLoginDetail.context';
import { ReactComponent as DecoLogo } from '../../assets/jlogo.svg';
import './sign-in-form.styles.css';
import API_URL from '../../config';

const SignInForm = () => {
  const [values, setValues] = useState({
    userId: '',
    password: '',
    message: '',
  });
  const { setLoginDetail } = useUserLoginDetailContext();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [token, setToken] = useState('');
  axios.defaults.withCredentials = true;
  console.log(setLoginDetail);
  const handleChange = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };
  function refreshPage() {
    window.location.reload(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(SignInValidation(values));

    // if (Object.keys(errors).length === 0) {
      axios
        .post(`${API_URL}Users/login`, values, {
          mode: 'no-cors', 
          headers: {
            'Content-Type': 'application/json',
          },
          type: "POST",
          crossDomain: true,
          withCredentials: false,
          credentials: 'same-origin',
        })
        .then((resp) => {
          if (resp.status === 200) {
            // Retrieve the token from the response headers
            const token = resp.headers['authorization'];
            // set login context api 
            setLoginDetail({
              Name: values.userId,
              token: resp.data.token,
              id: resp.data.id,
              Roleid: resp.data.roleId,
              UserImage: resp.data.userImage,
              roleName: resp.data.roleName,
            });
            console.log(setLoginDetail);
            // Set the cookie
            Cookies.set('token', resp.data.token); 
            // Set the token in state
            setToken(resp.data.token);
            // Store the token and user session in sessionStorage and localStorage
            sessionStorage.setItem('token', resp.data.token);
            localStorage.setItem('token', resp.data.token);
            const userSession = {Name: values.userId, token: resp.data.token, id: resp.data.id, Roleid: resp.data.roleId, UserImage: resp.data.userImage };
            
            const RoleIDMY = resp.data.roleId;
            const UserId = resp.data.userId;
            const UserDP = resp.data.userImage;
            const RoleName = resp.data.roleName;
            const sessionString = JSON.stringify(userSession);
            sessionStorage.setItem('userSession', sessionString);
            localStorage.setItem('userSession', sessionString);
            sessionStorage.setItem('RoleIDMY', RoleIDMY);
            localStorage.setItem('RoleIDMY', RoleIDMY);
            sessionStorage.setItem('userId', UserId);
            localStorage.setItem('userId', UserId);
            sessionStorage.setItem('roleName', RoleName);
            localStorage.setItem('roleName', RoleName);
            localStorage.setItem('UserDP', UserDP);
            console.log(resp);
            navigate('/dashboard');
            refreshPage();
          } else if (resp.status !== 200) {
            // Handle unsuccessful sign-in
            let errorMessage = 'Sign-in failed. Please try again.';
            if (resp.data && resp.data.message) {
              // If the response contains an error message, use it as the error message
              errorMessage = resp.data.message;
            }
            setMessage(errorMessage);
            console.log(errorMessage);
          }
        })
        .catch((error) => {
          console.log(error);
          setMessage('Sign-in failed. Please try again.');        
          if (error.response) {
            // If the server responded with an error message
            alert(error.response.data.error);
          } else {
            // If there was a network error or some other issue
            alert('An error occurred. Please try again later.');
          }
        });
    // }
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
