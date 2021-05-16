import CreatePost from 'components/CreatePost';
import Feed from 'components/Feed';
import Header from 'components/Header';
import Sidebar from 'components/Sidebar';
import { useAuth } from 'context/AuthContext';
import { Helmet } from 'react-helmet';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <>
      <Helmet>
        <title>Inicio | ReactSocial</title>
      </Helmet>
      <Header />
      <main>
        <div className="container">
          <div className="content-wrapper">
            <div className="main-content">
              {currentUser && <CreatePost />}
              <Feed />
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
