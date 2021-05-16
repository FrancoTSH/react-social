import Button from 'components/Button';
import CenteredContainer from 'components/CenteredContainer';
import InputField from 'components/InputField';
import { useAuth } from 'context/AuthContext';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  email: Validator.string()
    .required('Ingrese su email')
    .email('Ingrese un email valido')
})

const PasswordReset = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState(null);

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      await resetPassword(values.email);
      setEmail(values.email);
    } catch (err) {
      if (err.code === 'auth/user-not-found') setFieldError('email', 'Usuario no registrado');
      else alert(err.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Restablece tu contraseña | ReactSocial</title>
      </Helmet>
      <CenteredContainer>
        {(email)
          ? <>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#28a745" viewBox="0 0 16 16">
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
            <h2 className="form-title-secondary">Restablecimiento de contraseña</h2>
            <p aria-label="confirm-message">Hemos enviado un correo electrónico a <b>{email}</b> con las instrucciones para volver a establecer tu contraseña.</p>
            <Link to="/login" className="btn btn-sm" >Aceptar</Link>
          </>
          : <>
            <h2 className="form-title-secondary">Restablecimiento de contraseña</h2>
            <p>Pon la dirección de correo electrónico que usaste para registrarte. Te enviaremos un mensaje con tu nombre de usuario y un enlace para restablecer tu contraseña.</p>
            <Formik initialValues={{
              email: ''
            }}
              validationSchema={validateFields}
              onSubmit={handleSubmit}
              validateOnChange={false}
            >
              {
                ({ isSubmitting }) => (
                  <Form className="login">
                    <InputField type="email" name="email" label="E-mail" id="email" />
                    <Button styles="btn-submit login-btn" text="Enviar" disabled={isSubmitting} />
                  </Form>
                )
              }
            </Formik>
            <p><Link to="/login">Volver a la página de acceso</Link></p>
          </>
        }
      </CenteredContainer>
    </>
  )
}

export default PasswordReset
