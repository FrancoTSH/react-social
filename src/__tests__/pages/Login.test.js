import { cleanup, render, screen } from '@testing-library/react';
import Login from 'pages/Login';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: () => ({}),
  }),
}));

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    logIn: jest.fn()
  })
}))

describe('<Login/>', () => {
  it('renders successfully', () => {
    render(<Login />, { wrapper: MemoryRouter })
    expect(screen.getByText('Bienvenido de nuevo!')).toBeInTheDocument()
  })
})