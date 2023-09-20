import { useEffect, useRef, useState } from 'react';
import { AccordionData } from '../../types/accordion';
import './AccordionItem.css';

function AccordionItem({
  data,
  isOpen,
  btnOnClick,
}: {
  data: AccordionData;
  isOpen: boolean;
  btnOnClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current as HTMLDivElement;

      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);
  return (
    <li className={`AccordionItem ${isOpen ? 'active' : ''}`}>
      <h2 className='AccordionItemTitle'>
        <button type='button' className='AccordionItemBtn' onClick={btnOnClick}>
          {data.title}
        </button>
      </h2>
      <div className='AccordionItemContainer' style={{ height }}>
        <div ref={contentRef} className='AccordionItemContent'>
          {data.content}
        </div>
      </div>
    </li>
  );
}

export default AccordionItem;
