import Button from 'components/Button';
import Header from 'components/Header';
import InputField from 'components/InputField';
import { useAuth } from 'context/AuthContext';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  displayName: Validator.string()
    .required('Ingrese su nombre')
})


const Profile = () => {
  const { currentUser, updateUser } = useAuth();
  const [isUpdated, setIsUpdated] = useState(false)
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values) => {
    try {
      await updateUser(values)
      setIsUpdated(true);
      setTimeout(() => {
        setIsUpdated(false)
      }, 1500);
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <>
      <Helmet>
        <title>Editar Perfil | ReactSocial</title>
      </Helmet>
      <Header />
      <main>
        <div className="container">
          <div className="profile">
            <aside className="profile__sidebar">
              <ul className="profile__sidebar-list">
                <li><Link to="/account/edit" className="profile__sidebar-link active">Editar Perfil</Link></li>
                <li><Link to="/account/password" className="profile__sidebar-link">Cambiar Contraseña</Link></li>
              </ul>
            </aside>
            <article className="profile__main">
              <div className="profile__main-header">
                <div className="profile__main-avatar">
                  {!loading && <Skeleton circle={true} height={32} width={32} />}
                  <img src={image ? image : currentUser.photoURL} alt="avatar" className="nav-img" onLoad={() => setLoading(true)} />
                </div>
                <div className="profile__main-username">
                  <h3>{currentUser.displayName}</h3>
                  <label htmlFor="image" className="profile__main-change-photo">Cambiar foto de perfil</label>
                </div>
              </div>
              <div className="profile__main-form">
                <Formik initialValues={{
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL
                }}
                  validationSchema={validateFields}
                  onSubmit={handleSubmit}
                  validateOnChange={false}
                >
                  {({ isSubmitting, setFieldValue }) => (
                    <Form className="form-box secondary-form">
                      <InputField type="text" name="displayName" label="Nombre" aria-label="name" />
                      <small>Para ayudar a que las personas descubran tu cuenta, usa el nombre por el que te conoce la gente, ya sea tu nombre completo, apodo o nombre comercial.</small>
                      <InputField type="email" name="email" label="E-mail" hv={true} disabled value={currentUser.email} />
                      <InputField type="tel" name="phoneNumber" label="Telefono (No disponible)" disabled />
                      <input type="file" name="photoURL" id="image" className="file" accept="image/*" onChange={(e) => {
                        setFieldValue("photoURL", e.currentTarget.files[0]);
                        setImage(URL.createObjectURL(e.currentTarget.files[0]));
                      }} />
                      <Button styles={`btn-submit login-btn${isUpdated ? ' success' : ''}`} text="Enviar" disabled={isSubmitting} />
                    </Form>
                  )
                  }
                </Formik>
              </div>
            </article>
          </div>
        </div>
      </main>
    </>
  )
}

export default Profile
