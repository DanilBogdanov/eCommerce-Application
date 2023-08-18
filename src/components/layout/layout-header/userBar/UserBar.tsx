import { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../../../api/api';
import './userBar.css';
import { MessageType, notifier } from '../../../../utils/notifier';
import {
  MESSAGE_SHOW_TIME_ERROR,
  MESSAGE_SHOW_TIME_SUCCESS,
} from '../../../../types/constants';

type UserBarProps = {
  api: Api;
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
          <button
            type='button'
            onClick={() => {
              navigate('/login');
            }}
          >
            LogIn
          </button>
          <button type='button' onClick={() => navigate('/registration')}>
            LogUp
          </button>
        </>
      );
    }
    return (
      <button type='button' onClick={() => logout()}>
        LogOut
      </button>
    );
  }

  return (
    <div className='user-bar'>
      <img src='/img/user.svg' height={30} alt='user' />
      <span>{email}</span>
      <div>{getButtons()}</div>
    </div>
  );
}
