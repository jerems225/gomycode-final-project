import React from 'react';
import './Home.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../../components/header/Header';
import { ConvertForm } from '../../components/convertForm/ConvertForm';


function Home() {
  return (
    <div className="container">
      <Header />
      <ConvertForm />
    </div>
  );
}

export { Home };