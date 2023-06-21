import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Map } from './map/map';
import { Form } from './form/form';

// const root = ReactDOM.createRoot(document.getElementById('root'));

export default function App() {
  return (
    <BrowserRouter>
    <div className='body bg-dark text-light'>
      <header className='container-fluid'>
      <nav className='navbar fixed-top navbar-dark'>
        <div className='navbar-brand'>
          What The Dog Doing<sup>&reg;</sup>
        </div>
        <menu className='navbar-nav'>
          <li className='nav-item'>
            <NavLink className='nav-link' to='login'>
              Login
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='map'>
              Map
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className='nav-link' to='form'>
              Add Sighting
            </NavLink>
          </li>
        </menu>
      </nav>
      </header>

      <Routes>
        <Route path='/' element={<Login />} exact />
        <Route path='/login' element={<Login />} />
        <Route path='/map' element={<Map />} />
        <Route path='/form' element={<Form />} />
        <Route path='*' element={<NotFound />} />
      </Routes>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Author: Molly Smith</span>
          <a className='text-reset' href='https://github.com/Mollyannshine/Startup-example'>
            GitHub
          </a>
        </div>
      </footer>
    </div>
  </BrowserRouter>
  );
}

function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Huh. Couldn't find that page.5</main>;
}