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
  oldpass: Validator.string()
    .required('Ingrese su anterior contraseña')
    .min(6, 'La contraseña debe tener minimo 6 caracteres'),
  newpass: Validator.string()
    .required('Ingrese su nueva contraseña')
    .min(6, 'La contraseña debe tener minimo 6 caracteres'),
  confirm_newpass: Validator.string()
    .oneOf([Validator.ref('newpass')], 'Las contraseñas deben ser iguales')
})


const ProfilePassword = () => {
  const { currentUser, updateUserPassword } = useAuth();
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (values, { setStatus, setFieldError, resetForm }) => {
    try {
      await updateUserPassword(values.oldpass, values.newpass);
      setStatus({ success: true })
      setTimeout(() => {
        setStatus({ success: undefined })
        resetForm({
          oldpass: '',
          newpass: '',
          confirm_newpass: ''
        })
      }, 1500);
    } catch (err) {
      if (err.code === 'auth/wrong-password') setFieldError('oldpass', 'La contraseña es incorrecta')
    }
  }

  return (
    <>
      <Helmet>
        <title>Cambiar contraseña | ReactSocial</title>
      </Helmet>
      <Header />
      <main>
        <div className="container">
          <div className="profile">
            <aside className="profile__sidebar">
              <ul className="profile__sidebar-list">
                <li><Link to="/account/edit" className="profile__sidebar-link">Editar Perfil</Link></li>
                <li><Link to="/account/password" className="profile__sidebar-link active">Cambiar Contraseña</Link></li>
              </ul>
            </aside>
            <article className="profile__main">
              <div className="profile__main-header">
                <div className="profile__main-avatar">
                  {!loading && <Skeleton circle={true} height={32} width={32} />}
                  <img src={currentUser.photoURL} alt="avatar" className="nav-img" onLoad={() => setLoading(true)} />
                </div>
                <div className="profile__main-username">
                  <h3>{currentUser.displayName}</h3>
                </div>
              </div>
              <div className="profile__main-form">
                <Formik initialValues={{
                  oldpass: '',
                  newpass: '',
                  confirm_newpass: ''
                }}
                  validationSchema={validateFields}
                  onSubmit={handleSubmit}
                  validateOnChange={false}
                >
                  {({ isSubmitting, status }) => (
                    <Form className="form-box secondary-form">
                      <InputField type="password" name="oldpass" label="Anterior contraseña" />
                      <InputField type="password" name="newpass" label="Nueva contraseña" />
                      <InputField type="password" name="confirm_newpass" label="Confirmar nueva contraseña" />
                      <Button styles={`btn-submit login-btn${isSubmitting && !status ? ' loading' : ''}${status && status.success ? ' success' : ''}`} text="Cambiar contraseña" disabled={isSubmitting} />
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

export default ProfilePassword