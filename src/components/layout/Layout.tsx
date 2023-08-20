import { ReactElement, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import LayoutHeader from './layout-header/LayoutHeader';
import LayoutFooter from './layout-footer/LayoutFooter';
import Api from '../../api/api';
import './layout.css';
import { Message, MessageType, notifier } from '../../utils/notifier';
import MessageBox from '../generic/messageBox/MessageBox';

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
  }, [timeoutId]);
  return (
    <div className='layout_container'>
      <LayoutHeader api={api} />
      <div className='outlet-container'>
        <Outlet />
      </div>
      <LayoutFooter />
      {messageVisibility && (
        <MessageBox
          message={message}
          onClose={() => setMessageVisibility(false)}
        />
      )}
    </div>
  );
}
