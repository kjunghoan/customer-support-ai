import Home from '@/app/page';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';

describe('Home', () => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  it('Should have a chat component', () => {
    const result = render(<Home />);
    const chat = result.container.querySelector('#supportChat');
    expect(chat).toBeInTheDocument();
  });
});
