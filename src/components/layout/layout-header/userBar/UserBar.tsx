import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavLinkClassesProps } from '../../../../types/layout';

import { MessageType, notifier } from '../../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../../types/constants';
import { api } from '../../../../api/api';

import './userBar.css';

const changeNavLinkClasses = ({ isActive }: NavLinkClassesProps): string => {
  return `user-bar__link  ${isActive ? 'user-bar__link_active' : ''}`;
};

export default function UserBar(): ReactElement {
  const [isAnonymous, setAnonymous] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setAnonymous(api.user.isAnonymous());
    setEmail(api.user.getEmail());

    api.auth.onChangeUser((isAnonym, userEmail) => {
      setAnonymous(isAnonym);
      setEmail(userEmail);
    });
  }, []);

  const logout = async () => {
    const resp = await api.auth.logout();
    if (resp.isSuccessful) {
      notifier.showMessage(
        MessageType.INFO,
        'Logout',
        `User ${email} successfully logged out`,
        MESSAGE_SHOW_TIME_SUCCESS,
      );
      navigate('/login');
    } else {
      notifier.showMessage(
        MessageType.ERROR,
        'Logout',
        resp.message,
        MESSAGE_SHOW_TIME_ERROR,
      );
    }
  };

  function getButtons() {
    if (isAnonymous) {
      return (
        <>
          <NavLink to='/login' className={changeNavLinkClasses}>
            LogIn
          </NavLink>
          <span className='user-bar__separator'>/</span>
          <NavLink to='/registration' className={changeNavLinkClasses}>
            LogUp
          </NavLink>
        </>
      );
    }
    return (
      <button type='button' onClick={() => logout()} className='user-bar__btn'>
        LogOut
      </button>
    );
  }

  return (
    <div className='user-bar' data-testid='user-bar'>
      <NavLink
        className='user-bar__img'
        to={isAnonymous ? '/login' : '/profile'}
      >
        <img src='/icons/header/user.svg' height={25} alt='user' />
      </NavLink>
      <div className='user-bar__links'>{getButtons()}</div>
      <div className='user-bar__info'>{isAnonymous ? 'Anonymous' : email}</div>
    </div>
  );
}
