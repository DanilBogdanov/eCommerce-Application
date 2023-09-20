import './modal.css';

type ModalProps = {
  callback: () => Promise<void>;
  isShow: (showModal: boolean) => void;
  message: string;
};

export function Modal({ callback, isShow, message }: ModalProps) {
  return (
    <div className='modal'>
      <div className='modal__wrapper'>
        <div className='modal__message'>{message}</div>
        <div className='modal__buttons-wrapper'>
          <button
            type='button'
            onClick={callback}
            className='button  modal__confirm'
          >
            confirm
          </button>
          <button
            type='button'
            onClick={() => {
              isShow(false);
            }}
            className='button modal__cancel'
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  );
}
