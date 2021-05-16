import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import PasswordReset from 'pages/PasswordReset';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      uid: '1'
    },
    resetPassword: jest.fn(() => Promise.resolve('Email send'))
  })
}))

describe('<PasswordReset/>', () => {
  it('renders successfully', () => {
    render(<PasswordReset />, { wrapper: MemoryRouter })
    expect(screen.getByText('Restablecimiento de contraseña')).toBeInTheDocument()
  })
  it('renders and after sending an email shows a success message', async () => {
    render(<PasswordReset />, { wrapper: MemoryRouter })
    fireEvent.change(screen.getByLabelText('E-mail'), {
      target: { value: 'admin@admin.com' },
    })
    fireEvent.click(screen.getByText('Enviar'))
    expect(await screen.findByLabelText('confirm-message')).toHaveTextContent('Hemos enviado un correo electrónico a admin@admin.com con las instrucciones para volver a establecer tu contraseña.')
  })
})