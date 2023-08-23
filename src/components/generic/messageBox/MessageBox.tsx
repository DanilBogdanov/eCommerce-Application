import { ReactElement } from 'react';
import { Message, MessageType } from '../../../utils/notifier';
import './messageBox.css';

type MessageBoxProps = {
  message: Message;
  onClose: () => void;
};

export default function MessageBox({
  message,
  onClose,
}: MessageBoxProps): ReactElement {
  const getClassName = () => {
    let typeName = 'default';
    if (message.type === MessageType.ERROR) {
      typeName = 'error';
    } else if (message.type === MessageType.INFO) {
      typeName = 'info';
    } else if (message.type === MessageType.SUCCESS) {
      typeName = 'success';
    } else if (message.type === MessageType.WARNING) {
      typeName = 'warning';
    }

    return `message-box message-box_${typeName}`;
  };

  return (
    <div className={getClassName()}>
      <div className='message-box__icon' />
      <div className='message-box__content'>
        <h4>{message.title}</h4>
        <p>{message.message}</p>
      </div>
      <button
        className='message-box__close-btn'
        type='button'
        onClick={() => onClose()}
      >
        ×
      </button>
    </div>
  );
}
