import { render, screen, fireEvent } from '@testing-library/react';
import faker from 'faker';
import Accordion from './Accordion';
import AccordionItem from './AccordionItem';

describe('<Accordion />', () => {
  it('should render items', () => {
    const items = [];

    for (let i = 0; i < 3; i += 1) {
      items.push({
        id: faker.lorem.sentence(),
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
      });
    }

    render(<Accordion items={items} />);

    items.forEach(({ title, content }) => {
      const idEl = screen.queryByText(title);
      const titleEl = screen.queryByText(title);
      const contentEl = screen.queryByText(content);

      expect(idEl).toBeInTheDocument();
      expect(titleEl).toBeInTheDocument();
      expect(contentEl).toBeInTheDocument();
    });
  });

  it('should open one at a time', () => {
    const items = [];

    for (let i = 0; i < 3; i += 1) {
      items.push({
        id: faker.lorem.sentence(),
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
      });
    }

    render(<Accordion items={items} />);

    items.forEach(({ title }) => {
      const titleEl = screen.queryByText(title) as HTMLButtonElement;

      fireEvent.click(titleEl);

      const currentListEl = titleEl.closest('li');
      const activeListEls = document.querySelectorAll('li.active');
      const activeListEl = activeListEls[0];

      expect(activeListEls.length).toBe(1);
      expect(activeListEl).toEqual(currentListEl);
    });
  });

  it('should close if already opened', () => {
    const items = [];

    for (let i = 0; i < 3; i += 1) {
      items.push({
        id: faker.lorem.sentence(),
        title: faker.lorem.sentence(),
        content: faker.lorem.sentences(),
      });
    }

    render(<Accordion items={items} />);

    items.forEach(({ title }) => {
      const titleEl = screen.queryByText(title) as HTMLButtonElement;

      fireEvent.click(titleEl);
      fireEvent.click(titleEl);

      const currentListEl = titleEl.closest('li');

      expect(currentListEl).not.toHaveClass('active');
    });
  });
  it('should call btnOnClick on title click', () => {
    const btnOnClickMock = jest.fn();

    const id = faker.lorem.sentence();
    const title = faker.lorem.sentence();
    const content = faker.lorem.sentences();

    render(
      <AccordionItem
        data={{
          id,
          title,
          content,
        }}
        isOpen={faker.datatype.boolean()}
        btnOnClick={btnOnClickMock}
      />,
    );

    const titleEl = screen.queryByText(title) as HTMLButtonElement;

    fireEvent.click(titleEl);

    expect(btnOnClickMock).toBeCalledTimes(1);
  });
});
