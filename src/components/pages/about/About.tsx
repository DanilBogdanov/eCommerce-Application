import { ReactElement } from 'react';
import './About.css';
import Accordion from '../../../utils/accordion/Accordion';

export default function AboutUs(): ReactElement {
  const accordionItems = [
    {
      id: 'bogdanov',
      title: 'Danila Bogdanov',
      content: <div />,
    },
    {
      id: 'mekhdikhanov',
      title: 'Elmadyn Mekhdikhanov',
      content: (
        <div>
          <table className='AddressTable'>
            <thead className='AddressTableHead'>
              <tr className='AddressTableRow'>
                <th className='AddressTableHeader' colSpan={2}>
                  Task
                </th>
                <th className='AddressTableHeader' colSpan={2}>
                  Sprint number
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className='AddressTableRow'>
                <td className='AddressTableData'>
                  1. Add or Remove Product from Cart
                </td>
                <td className='AddressTableData'>Sprint 1</td>
              </tr>
            </tbody>
          </table>
        </div>
      ),
    },
    {
      id: 'gribanov',
      title: 'Timofey Gribanov',
      content: <div />,
    },
  ];

  return (
    <main>
      <h1 className='FormHeader UserFormHeader'>About Us</h1>
      <div className='AccordionContainer'>
        <Accordion items={accordionItems} />
      </div>
    </main>
  );
}
