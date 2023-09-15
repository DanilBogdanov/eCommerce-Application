import { useState } from 'react';
import { AccordionData } from '../../types/accordion';
import AccordionItem from './AccordionItem';
import './Accordion.css';

function Accordion({ items }: { items: Array<AccordionData> }) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
  };
  return (
    <ul className='accordion'>
      {items.map((item, idx) => (
        <AccordionItem
          key={item.id}
          data={item}
          isOpen={idx === currentIdx}
          btnOnClick={() => btnOnClick(idx)}
        />
      ))}
    </ul>
  );
}

export default Accordion;
