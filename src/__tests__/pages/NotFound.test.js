import { cleanup, render, screen } from '@testing-library/react';
import NotFound from 'pages/NotFound';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      uid: '1',
      photoURL: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    }
  })
}))

describe('<NotFound/>', () => {
  it('renders successfully', () => {
    render(<NotFound />, { wrapper: MemoryRouter })
    expect(screen.getByText('Esta página no está disponible')).toBeInTheDocument()
  })
})