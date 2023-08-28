import { ReactElement, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';
import MessageBox from '../generic/messageBox/MessageBox';

import Api from '../../api/api';
import { Message, MessageType, notifier } from '../../utils/notifier';

import './layout.css';

type LayoutProps = {
  api: Api;
};

export default function Layout({ api }: LayoutProps): ReactElement {
  const [message, setMessage] = useState<Message>({
    type: MessageType.ERROR,
    title: '',
    message: '',
    showTime: 0,
  });
  const [messageVisibility, setMessageVisibility] = useState<boolean>(false);
  const [timeoutId, setTimeoutId] = useState(0);

  useEffect(() => {
    notifier.onMessage((mess: Message) => {
      clearTimeout(timeoutId);
      setMessage(mess);
      setMessageVisibility(true);
      const id = setTimeout(() => {
        setMessageVisibility(false);
      }, mess.showTime);
      setTimeoutId(+id);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <LayoutHeader api={api} />
      <main className='main'>
        <div className='main__container'>
          <Outlet />
        </div>
      </main>
      <LayoutFooter />
      {messageVisibility && (
        <MessageBox
          message={message}
          onClose={() => setMessageVisibility(false)}
        />
      )}
    </>
  );
}
