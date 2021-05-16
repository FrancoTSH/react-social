import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Header from 'components/Header';
import { useAuth } from 'context/AuthContext';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('context/AuthContext', () => ({
  useAuth: jest.fn()
}))

describe('<Header/>', () => {
  it('renders successfully', () => {
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'User'
      }
    }))
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })
  it('renders and after click logOut button logges out', () => {
    const mockLogOut = jest.fn(() => Promise.resolve('Logged Out'));
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'User'
      },
      logOut: mockLogOut
    }))
    render(<Header />, { wrapper: MemoryRouter })
    fireEvent.click(screen.getByLabelText('logout'))
    expect(mockLogOut).toHaveBeenCalledTimes(1);
  })
  it('renders and if an user is logged in shows an avatar image', () => {
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'User'
      }
    }))
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  })
  it('renders and if an user is NOT logged in shows buttons', () => {
    useAuth.mockImplementation(() => ({
      currentUser: null,
    }))
    render(<Header />, { wrapper: MemoryRouter })
    expect(screen.getByText('Ingresar')).toBeInTheDocument();
  })
})