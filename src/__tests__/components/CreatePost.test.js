import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import CreatePost from 'components/CreatePost';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      photoURL: 'dd'
    }
  })
}))

jest.mock('services/Posts', () => ({
  createPost: jest.fn(() => Promise.resolve('Post created'))
}))

describe('<CreatePost/>', () => {
  global.URL.createObjectURL = jest.fn();

  it('renders successfully', () => {
    render(<CreatePost />)
    expect(screen.getByPlaceholderText('¿Qué estas pensando?')).toBeInTheDocument()
  })
  it('renders and after upload shows an image', () => {
    render(<CreatePost />)
    fireEvent.change(screen.getByLabelText('file-button'), {
      target: { files: [new Blob()] },
    })
    expect(screen.getByAltText('post-preview')).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText('delete-preview'))
    expect(screen.queryByAltText('post-preview')).not.toBeInTheDocument();
  })
  it('renders and when clicks the publish button publishes the post', async () => {
    render(<CreatePost />)
    fireEvent.change(screen.getByLabelText('file-button'), {
      target: { files: [new Blob()] },
    })
    fireEvent.change(screen.getByPlaceholderText('¿Qué estas pensando?'), {
      target: { value: 'Nuevo post' },
    })
    fireEvent.click(screen.getByText('Crear'))
    expect((await screen.findByPlaceholderText('¿Qué estas pensando?')).value).toBe('')
  })
})