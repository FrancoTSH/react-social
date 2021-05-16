import Header from 'components/Header';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | ReactSocial</title>
      </Helmet>
      <Header />
      <main className="not-found">
        <div className="not-found__content">
          <h2 className="not-found__title">Esta página no está disponible</h2>
          <div className="not-found__description">
            Es posible que el enlace que seleccionaste esté roto o que se haya eliminado la página. <Link to="/">Volver a ReactSocial</Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default NotFound
