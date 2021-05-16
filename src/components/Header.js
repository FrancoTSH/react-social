import { useAuth } from 'context/AuthContext';
import logo from 'images/logo.png';
import React, { useCallback, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Link, useHistory } from 'react-router-dom';

const Header = () => {
  const { currentUser, logOut } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [submenu, setSubmenu] = useState(false);

  const handleLogOut = useCallback(async () => {
    try {
      await logOut()
      history.push("/login")
    } catch (error) {
      alert(error)
    }
  }, [history, logOut])

  const handleLoad = () => {
    setLoading(true);
  }

  return (
    <header>
      <div className="container">
        <div className="header-wrapper">
          <div className="header-left">
            <Link to="/" className="Logo"><img src={logo} alt="logo" width='110' /></Link>
          </div>
          <div className="header-right">
            <div className="menu">
            </div>
            <nav className="navbar">
              <ul className="nav-list">
                <li className="nav-item">
                  <Link to='/' className='nav-link'><svg aria-label="Inicio" fill="#262626" height="22" viewBox="0 0 48 48" width="22"><path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path></svg></Link>
                </li>
                {(!currentUser)
                  ? <li className="nav-item">
                    <div className="nav-btn-wrapper">
                      <Link to='/login' className='btn btn-nav'>Ingresar</Link>
                      <Link to='/register' className='btn btn-nav btn-sec'>Registrate</Link>
                    </div>
                  </li>
                  : <li className="nav-item">
                    <div className="avatar-img" onClick={() => setSubmenu(val => !val)}>
                      {!loading && <Skeleton circle={true} height={32} width={32} />}
                      <img src={currentUser.photoURL} alt="avatar" className="nav-img" onLoad={handleLoad} />
                    </div>
                    <div className={`sub-menu${(submenu) ? " show" : ""}`}>
                      <ul>
                        <li><Link to='/account/edit' className="sub-menu-link" ><svg aria-label="Perfil" fill="#262626" height="16" viewBox="0 0 32 32" width="16"><path d="M16 0C7.2 0 0 7.1 0 16c0 4.8 2.1 9.1 5.5 12l.3.3C8.5 30.6 12.1 32 16 32s7.5-1.4 10.2-3.7l.3-.3c3.4-3 5.5-7.2 5.5-12 0-8.9-7.2-16-16-16zm0 29c-2.8 0-5.3-.9-7.5-2.4.5-.9.9-1.3 1.4-1.8.7-.5 1.5-.8 2.4-.8h7.2c.9 0 1.7.3 2.4.8.5.4.9.8 1.4 1.8-2 1.5-4.5 2.4-7.3 2.4zm9.7-4.4c-.5-.9-1.1-1.5-1.9-2.1-1.2-.9-2.7-1.4-4.2-1.4h-7.2c-1.5 0-3 .5-4.2 1.4-.8.6-1.4 1.2-1.9 2.1C4.2 22.3 3 19.3 3 16 3 8.8 8.8 3 16 3s13 5.8 13 13c0 3.3-1.2 6.3-3.3 8.6zM16 5.7c-3.9 0-7 3.1-7 7s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm0 11c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z"></path></svg>Mi cuenta</Link> </li>
                        <li><span className="sub-menu-link" aria-label="logout" onClick={() => handleLogOut()}>Salir</span> </li>
                      </ul>
                    </div>
                  </li>
                }
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
