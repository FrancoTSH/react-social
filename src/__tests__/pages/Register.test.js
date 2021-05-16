import { cleanup, render, screen } from '@testing-library/react';
import Register from 'pages/Register';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    signUp: jest.fn()
  })
}))

jest.mock('services/avatarGenerator', () => ({
  getAvatarURL: () => Promise.resolve('URL')
}))

describe('<Register/>', () => {
  it('renders successfully', () => {
    render(<Register />, { wrapper: MemoryRouter })
    expect(screen.getByAltText('logo')).toBeInTheDocument()
  })
})