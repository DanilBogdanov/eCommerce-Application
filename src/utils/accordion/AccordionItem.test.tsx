import { render, screen } from '@testing-library/react';
import faker from 'faker';
import AccordionItem from './AccordionItem';

describe('<AccordionItem />', () => {
  it('should render content', () => {
    const id = faker.lorem.sentence();
    const title = faker.lorem.sentence();
    const content = faker.lorem.sentences();

    render(
      <AccordionItem
        data={{ id, title, content }}
        isOpen={faker.datatype.boolean()}
        btnOnClick={jest.fn()}
      />,
    );

    const titleEl = screen.queryByText(title);
    const contentEl = screen.queryByText(content);

    expect(titleEl).toBeInTheDocument();
    expect(contentEl).toBeInTheDocument();
  });

  it('should not display content if isOpen is false', () => {
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
        isOpen={false}
        btnOnClick={jest.fn()}
      />,
    );

    const titleEl = screen.queryByText(title);
    const listEl = titleEl?.closest('li');

    expect(listEl).not.toHaveClass('active');
  });

  it('should display content if isOpen is true', () => {
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
        isOpen
        btnOnClick={jest.fn()}
      />,
    );

    const titleEl = screen.queryByText(title);
    const listEl = titleEl?.closest('li');

    expect(listEl).toHaveClass('active');
  });
});
