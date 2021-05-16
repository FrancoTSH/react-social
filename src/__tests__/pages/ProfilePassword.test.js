import { cleanup, render, screen } from '@testing-library/react';
import ProfilePassword from 'pages/ProfilePassword';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      uid: '1'
    },
    updateUserPassword: () => Promise.resolve('User updated')
  })
}))


describe('<Profile/>', () => {
  it('renders successfully', () => {
    render(<ProfilePassword />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'Cambiar Contraseña' })).toBeInTheDocument()
  })
  it('renders and verify navigation', () => {
    render(<ProfilePassword />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'Cambiar Contraseña' }).classList.contains('active')).toBeTruthy()
  })
})