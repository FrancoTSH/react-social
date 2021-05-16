import { cleanup, render, screen } from '@testing-library/react';
import Sidebar from 'components/Sidebar';
import { useAuth } from 'context/AuthContext';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: jest.fn()
}))

describe('<Sidebar/>', () => {
  it('renders successfully', () => {
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'User'
      },
    }))
    render(<Sidebar />)
    expect(screen.getByText('Usuarios populares')).toBeInTheDocument()
  })
  it('renders and if an user is logged in shows an avatar image', () => {
    useAuth.mockImplementation(() => ({
      currentUser: {
        displayName: 'User'
      },
    }))
    render(<Sidebar />)
    expect(screen.getByAltText('avatar')).toBeInTheDocument();
  })
  it('renders and if an user is NOT logged in shows buttons', () => {
    useAuth.mockImplementation(() => ({
      currentUser: null,
    }))
    render(<Sidebar />)
    expect(screen.getByText('Inicia sesion para realizar una publicacion')).toBeInTheDocument();
  })

})