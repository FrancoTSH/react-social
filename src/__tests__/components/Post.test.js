import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import Post from 'components/Post';
import { MemoryRouter } from 'react-router-dom';
import { deletePost } from 'services/Posts';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User'
    }
  })
}))

jest.mock('services/Posts', () => ({
  deletePost: jest.fn(() => Promise.resolve('Post deleted')),
  likePost: jest.fn(),
  unlikePost: jest.fn(),
  addComment: () => Promise.resolve({
    text: 'Just a comment',
    username: 'User',
    publishedAt: Date.now(),
    commentId: 4
  }),
  getComments: () => Promise.resolve({
    docs: [{
      commentId: 1,
      username: 'user1',
      text: 'this is a comment 1'
    },
    {
      commentId: 2,
      username: 'user2',
      text: 'this is a comment 2'
    },
    {
      commentId: 3,
      username: 'user3',
      text: 'this is a comment 3'
    },
    ],
    nextEmpty: true,
    lastDoc: 15
  })
}))

describe('<Post/>', () => {
  const post = {
    caption: 'This is a caption',
    imageURL: 'https://images.unsplash.com/photo-1563991655280-cb95c90ca2fb?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bm8lMjBjb3B5cmlnaHR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80',
    userData: {
      username: 'User',
      userPhoto: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
    },
    likes: ['1'],
    postedAt: {
      toDate: () => new Date(Date.UTC(2012, 11, 12, 3, 0, 0)),
    },
    userLiked: false,
    postId: 1
  }

  it('renders successfully', async () => {
    render(<Post {...post} />, { wrapper: MemoryRouter })
    expect(await screen.findByText(post.caption)).toBeInTheDocument()
  })

  it('renders and after click the delete button deletes the post', async () => {
    render(<Post {...post} />, { wrapper: MemoryRouter })
    fireEvent.click(await screen.findByLabelText('delete'));
    expect(deletePost).toHaveBeenCalledTimes(1)
  })

  it('renders and after click the like button shows liked style', async () => {
    render(<Post {...post} />, { wrapper: MemoryRouter })
    fireEvent.click(await screen.findByLabelText('like'));
    expect((await screen.findByLabelText('like')).firstElementChild.classList.contains('liked')).toBeTruthy();
  })

  it('renders and after click the like button shows not-liked style', async () => {
    post.userLiked = true;
    render(<Post {...post} />, { wrapper: MemoryRouter });
    fireEvent.click(await screen.findByLabelText('like'));
    expect((await screen.findByLabelText('like')).firstElementChild.classList.contains('not-liked')).toBeTruthy();
  })

  it('renders and show comments', async () => {
    render(<Post {...post} />, { wrapper: MemoryRouter });
    expect(await screen.findByText('user1')).toBeInTheDocument();
    expect(await screen.findByText('this is a comment 1')).toBeInTheDocument();
  })

  it('renders and adds a comment', async () => {
    render(<Post {...post} />, { wrapper: MemoryRouter });
    fireEvent.change(await screen.findByPlaceholderText('Agrega un comentario...'), {
      target: { value: 'Just a comment' },
    });
    expect((await screen.findByPlaceholderText('Agrega un comentario...')).value).toBe('Just a comment')
    fireEvent.click(await screen.findByText('Publicar'));
    expect(await screen.findByText('Just a comment')).toBeInTheDocument();
  })
})