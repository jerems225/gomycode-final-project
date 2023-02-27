import React, { useState } from 'react';
import './RegisterForm.css'
import { postRequest } from '../../services/api';

function RegisterForm() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState(0);
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prefix = '/registration';
    const params = {
      fullName: fullName,
      email: email,
      password: password,
    };
    const headers = {
      'content-type': 'application/json'
    };
    const response = await postRequest(prefix, params, headers);
    console.log(response);
    setStatus(response.status);
    setMessage(response.message);
    if(response.status === 201)
    {
      const result = response.data;
      localStorage.setItem("authToken", result.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      window.location.reload();
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-center text-light">
        <strong>
          <span className="text-success">SIGN IN</span>
          {message && status!== 201 && 
            <div className="d-flex align-items-center mt-3 text-danger" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
              <small>{message}</small>
              </div>
            </div>
          }

        {message && status=== 201 && 
            <div className="d-flex align-items-center mt-3 text-success" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
              <small>{message}</small>
              </div>
            </div>
          }
        </strong>
      </h2>
      <div className="container-fluid">
        <div className="row">
        <div className="col-12">
            <input
              type="text"
              id="fullname"
              placeholder="FullName..."
              className="form-control register-input"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              required
            />
          </div>
          <div className="col-12 mt-3">
            <input
              type="email"
              id="register-email"
              placeholder="Email..."
              className="form-control register-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="col-12 mt-3">
            <input
              type="password"
              id="register-password"
              placeholder="Password..."
              className="form-control register-input"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </div>
        </div>
      </div>
      <button type="submit" className="btn btn-sm btn-success mt-4 w-100"><strong> CREATE ACCOUNT NOW</strong></button>
    </form>
  );
}

export default RegisterForm;
