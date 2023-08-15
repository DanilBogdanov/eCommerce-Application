import { ReactElement } from 'react';
import { NavLink } from 'react-router-dom';
import './notFound.css';
import pageError from '../../../assets/icons/404.jpg';

export default function NotFound(): ReactElement {
  return (
    <div className='not_found-container'>
      <img className='not_found-img' src={pageError} alt='404' />
      <h1>404!</h1>
      <h2>Page not found!</h2>
      <h2>Try again or...</h2>
      <NavLink className='not_found-nav_link' to='/'>
        Go to Main
      </NavLink>
    </div>
  );
}
