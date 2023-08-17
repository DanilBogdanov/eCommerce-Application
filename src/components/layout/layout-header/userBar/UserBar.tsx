import { ReactElement, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BiLogInCircle, BiLogOutCircle } from 'react-icons/bi';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { NavLinkClassesProps } from '../../../../types/layout';

import Api from '../../../../api/api';
import './userBar.css';

type UserBarProps = {
  api: Api;
};

const changeNavLinkClasses = ({
  isActive,
  isPending,
}: NavLinkClassesProps): string => {
  return `login-link ${isPending ? 'pending' : ''} ${isActive ? 'active' : ''}`;
};

export default function UserBar({ api }: UserBarProps): ReactElement {
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
  }, [api.user, api.auth]);

  const logout = async () => {
    const resp = await api.auth.logout();
    if (resp.result) {
      navigate('/login');
    }
  };

  function getButtons() {
    if (isAnonymous) {
      return (
        <div className='login-link_container'>
          <NavLink to='/login' className={changeNavLinkClasses}>
            <BiLogInCircle />
            LogIn
          </NavLink>
          <NavLink to='/registration' className={changeNavLinkClasses}>
            <AiOutlineUserAdd />
            LogUp
          </NavLink>
        </div>
      );
    }
    return (
      <button type='button' onClick={() => logout()} className='logut-btn'>
        <BiLogOutCircle />
        LogOut
      </button>
    );
  }

  return (
    <div className='user-bar'>
      <div className='user-container'>
        <img src='/img/user.svg' height={30} alt='user' />
        <span>{email}</span>
      </div>
      <div>{getButtons()}</div>
    </div>
  );
}
