import { MESSAGE_SHOW_TIME } from '../../types/constants';

export enum MessageType {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
}

export type Message = {
  type: MessageType;
  title: string;
  message: string;
  showTime: number;
};

type Callback = (message: Message) => void;

class Notifier {
  private callback?: Callback;

  public showMessage(
    type: MessageType,
    title: string,
    message: string,
    showTime: number = MESSAGE_SHOW_TIME,
  ) {
    if (this.callback) {
      this.callback({
        type,
        title,
        message,
        showTime,
      });
    }
  }

  public onMessage(callback: Callback) {
    this.callback = callback;
  }
}

export const notifier = new Notifier();
