import { cleanup, render, screen } from '@testing-library/react';
import Feed from 'components/Feed';
import { MemoryRouter } from 'react-router-dom';

afterEach(cleanup);

jest.mock('context/AuthContext', () => ({
  useAuth: () => ({
    currentUser: {
      displayName: 'User',
      uid: '1'
    }
  })
}))

jest.mock('services/Posts', () => ({
  getPosts: (callback) => {
    callback({
      docs: [{
        data: () => ({
          caption: 'This is the post 1',
          imageURL: 'https://picsum.photos/1080/1080',
          userData: {
            username: 'User',
            userPhoto: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
          },
          likes: ['1'],
          postedAt: {
            toDate: () => new Date(Date.UTC(2012, 11, 12, 3, 0, 0)),
          },
        }),
        id: 1
      }, {
        data: () => ({
          caption: 'This is the post 2',
          imageURL: 'https://picsum.photos/1080/1080',
          userData: {
            username: 'User',
            userPhoto: 'https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png'
          },
          likes: [],
          postedAt: {
            toDate: () => new Date(Date.UTC(2015, 11, 12, 3, 0, 0)),
          },
        }),
        id: 2
      }],
      metadata: {
        hasPendingWrites: false
      }
    })
    return function () { }
  },
  getComments: () => Promise.resolve({
    docs: [],
    nextEmpty: true,
    lastDoc: 15
  }),
}))

describe('<Feed/>', () => {
  it('renders successfully', async () => {
    render(<Feed />, { wrapper: MemoryRouter })
    expect(await screen.findByText('This is the post 1')).toBeInTheDocument()
    expect(await screen.findByText('This is the post 2')).toBeInTheDocument()
  })
})

