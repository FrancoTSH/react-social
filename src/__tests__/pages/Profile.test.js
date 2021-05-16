import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Profile from 'pages/Profile';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      uid: '1'
    },
    updateUser: () => Promise.resolve('User updated')
  })
}))


describe('<Profile/>', () => {
  it('renders successfully', () => {
    render(<Profile />, { wrapper: MemoryRouter })
    expect(screen.getByText('Para ayudar a que las personas descubran tu cuenta, usa el nombre por el que te conoce la gente, ya sea tu nombre completo, apodo o nombre comercial.')).toBeInTheDocument()
  })
  it('renders and verify navigation', () => {
    render(<Profile />, { wrapper: MemoryRouter })
    expect(screen.getByRole('link', { name: 'Editar Perfil' }).classList.contains('active')).toBeTruthy()
  })
  it('renders and after click submit changes button style', async () => {
    render(<Profile />, { wrapper: MemoryRouter })
    fireEvent.change(screen.getByRole('textbox', { name: 'name' }), {
      target: { value: 'Nuevo nombre' },
    })
    fireEvent.click(screen.getByText('Enviar'))
    expect((await screen.findByText('Enviar')).classList.contains('success')).toBeTruthy()
  })
})