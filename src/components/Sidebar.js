import { useAuth } from 'context/AuthContext';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';

const suggestions = [
  { id: 1, image: "/images/xqc.jpg", name: "xqcow1" },
  { id: 2, image: "/images/pewdiepie.jpg", name: "pewdiepie" },
  { id: 3, image: "/images/mrbeast.jpg", name: "mrbeast" },
  { id: 4, image: "/images/jcena.jpg", name: "johncena" },
  { id: 5, image: "/images/rock.jpg", name: "therock" },
]

const Sidebar = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false)

  return (
    <aside className="sidebar">
      <div className="sidebar__user">
        {
          (currentUser)
            ? (<>
              <div className="sidebar__user-avatar">
                {!loading && <Skeleton circle={true} height={56} width={56} />}
                <img src={currentUser.photoURL} alt="avatar" onLoad={() => setLoading(true)} />
              </div>
              <div className="sidebar__user-data">
                <p className="sidebar__user-name">{currentUser.displayName}</p>
                <p className="sidebar__user-email">{currentUser.email}</p>
              </div>
            </>)
            : (
              <strong>Inicia sesion para realizar una publicacion</strong>
            )
        }
      </div>
      <div className="sidebar__list">
        <div className="sidebar__list-title"><span>Usuarios populares</span></div>
        <div className="sidebar__list-users">
          {
            suggestions.map(user => (
              <div className="sidebar__list-user" key={user.id}>
                <div className="sidebar__list-a">
                  <div className="sidebar__list-user-img">
                    <img src={user.image} alt={user.name} />
                  </div>
                  <div className="sidebar__list-user-info">
                    <span className="sidebar__list-user-name">{user.name}</span>
                    <span className="sidebar__list-user-extra">Sugerencia para ti</span>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
