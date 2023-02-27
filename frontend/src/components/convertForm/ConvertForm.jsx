import { React, useState, useEffect } from 'react';
import { postRequest } from '../../services/api';
import './ConvertForm.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from '../modal/Modal';
import LoginForm from '../loginForm/LoginForm';
import RegisterForm from '../registerForm/RegisterForm';



function ConvertForm() {
  const [amount, setAmount] = useState('');
  const [from, setFrom] = useState('bitcoin');
  const [to, setTo] = useState('usd');
  const [result, setResult] = useState()
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState(0);

  const [ipAddress, setIpAddress] = useState('');

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseRegisterModal = () => setShowRegisterModal(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setAuthToken(null);
    setUser(null);
  };

  useEffect(() => {
    fetch('https://api.ipify.org/?format=json')
      .then(response => response.json())
      .then(data => setIpAddress(data.ip));
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const prefix = '/convert';
    const params = {
      amount: amount,
      from: from,
      to: to,
      deviceAddress: ipAddress,
      isLogged: authToken ? true : false
    };
    const headers = {
      'content-type': 'application/json'
    };
    const response = await postRequest(prefix, params, headers);
    setStatus(response.status);
    setMessage(response.message);
    response.status === 201 ? setResult(response.data) :  setResult(null);
  };

  return (
    <div className="container">

    <div>
      <Modal show={showLoginModal} handleClose={handleCloseLoginModal}>
          <LoginForm />
      </Modal>
      <Modal show={showRegisterModal} handleClose={handleCloseRegisterModal}>
          <RegisterForm />
      </Modal>
    </div>

      <h1 className="text-center text-light">
        <strong>
          <span className="text-success">CRYPTO-MONEY</span> CONVERTOR
        </strong>
      </h1>
      <form className="search-form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-4">
            <input
              type="number"
              className="form-control text-center"
              placeholder="Amount , Ex: 34"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              required
            />
          </div>
          <div className="col-4">
            <select
              className="form-control
              form-select text-center border-dark"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
            >
              <option value="bitcoin">BTC - BITCOIN</option>
              <option value="ethereum">ETH - ETHEREUM</option>
              <option value="tether">USDT - TETHER</option>
              <option value="binancecoin">BNB - BINANCE</option>
              <option value="litecoin">LTC - LITECOIN</option>
            </select>
          </div>
          <div className="col-4">
            <select
              className="form-control
              form-select text-center border-dark"
              value={to}
              onChange={(event) => setTo(event.target.value)}
            >
              <option value="usd"> USD - DOLLAR AMERICAIN</option>
              <option value="eur">EUR - EURO</option>
              <option value="jpy">YEN - JAPAN</option>
              <option value="chf">CHF - SWISS FRANC</option>
              <option value="cad">CAD - CANADIAN DOLLAR</option>
              <option value="gbp">GBP - POUND STERLING</option>
            </select>
          </div>

          {message && status!== 201 && 
            <div className="d-flex align-items-center mt-3 text-danger" role="alert">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
              </svg>
              <div>
                {message}
              </div>
            </div>
          }

          {result &&
            <div className="card mt-5 bg-dark border-dark">
              <div className="card-body text-white text-uppercase text-size">
              <span><b>{result.from.value} {result.from.name} = </b></span>
              <span className="badge badge-lg bg-success">{result.to.value.toLocaleString('fr-FR', {style: 'currency', currency: to.toUpperCase()})}</span>
              </div>
            </div>
          }
          <div className="col-12 mt-5 text-center">
            <button type="submit" className="btn btn-md w-100 btn-success text-uppercase">
              <strong>
                Convertir Maintenant
              </strong>
            </button>
          </div>

          {authToken ?
            <div className="col-5 mt-5 text-center">
              <button type="button" className="btn btn-md ml-2 w-100 btn-light text-uppercase text-danger" onClick={() => handleLogout()}>
                <strong>
                  LOG OUT
                </strong>
              </button>
              {user && 
                <div className="mt-2">
                  <small className="text-sm text-white text-start"><strong>{user.fullName} </strong></small>
                  <small className="text-muted"><strong>( {user.email} )</strong></small>
                </div>
              }
            </div>
            :
            <div>
              <div className="col-5 mt-5 text-center">
              <button type="button" className="btn btn-md ml-2 w-100 btn-light text-uppercase text-dark" onClick={() => setShowRegisterModal(true)}>
                <strong>
                  CREATE ACCOUNT
                </strong>
              </button>
              </div>
              <div className="col-5 mt-2 text-center">
              <button type="button" className="btn btn-md ml-2 w-100 btn-success text-uppercase text-white" onClick={() => setShowLoginModal(true)}>
                <strong>
                  LOG IN
                </strong>
              </button>
              </div>
            </div>
          }
        </div>

      </form>
    </div>

  );
}

export { ConvertForm };