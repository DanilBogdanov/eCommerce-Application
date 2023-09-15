import { ReactElement } from 'react';
import './discount.css';

type DiscountProps = {
  title: string;
  percent: number;
  code: string;
};

export default function Discount({
  title,
  percent,
  code,
}: DiscountProps): ReactElement {
  return (
    <div className='discount'>
      <div className='discount__percentage'>{percent}%</div>
      <div className='discount__content'>
        <img src='/img/discount.png' alt='discount' height={100} />
        <div className='discount__title'>{title}</div>
      </div>
      <div className='discount__code'>
        <code>code: {code}</code>
      </div>
    </div>
  );
}
