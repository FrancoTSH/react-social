import Button from 'components/Button';
import CenteredContainer from 'components/CenteredContainer';
import InputField from 'components/InputField';
import { useAuth } from 'context/AuthContext';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  password: Validator.string()
    .required('Ingrese su contraseña')
    .min(6, 'La contraseña debe tener minimo 6 caracteres'),
  confirmPassword: Validator.string()
    .oneOf([Validator.ref('password')], 'Las contraseñas deben ser iguales')
})

const ChangePassword = ({ location }) => {
  const { changePassword, verifyCode } = useAuth();
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  const query = new URLSearchParams(location.search);

  const handleSubmit = async (values) => {
    try {
      await changePassword(query.get('oobCode'), values.password);
      setSuccess(true);
    } catch (err) {
      if (err.code === 'auth/invalid-action-code') alert('El codigo de verificacion es invalido');
      else alert(err.message);
    }
  }

  if (!verifyCode(query.get('oobCode'))) history.push('/login');

  return (
    <>
      <Helmet>
        <title>Restaurar contraseña | ReactSocial</title>
      </Helmet>
      <CenteredContainer>
        {(success)
          ?
          <>
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" fill="#28a745" viewBox="0 0 16 16">
              <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
              <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
            </svg>
            <h2 className="form-title-secondary">Cambio de contraseña exitoso</h2>
            <p>Ahora puedes usar tu contraseña para ingresar a tu cuenta</p>
            <Link to="/login" className="btn btn-sm" >Aceptar</Link>
          </>
          :
          <>
            <h2 className="form-title-secondary">Cambiar contraseña</h2>
            <Formik initialValues={{
              password: '',
              confirmPassword: ''
            }}
              validationSchema={validateFields}
              onSubmit={handleSubmit}
              validateOnChange={false}
            >
              {
                ({ isSubmitting }) => (
                  <Form className="login">
                    <InputField type="password" name="password" label="Nueva contraseña" />
                    <InputField type="password" name="confirmPassword" label="Repetir nueva contraseña" />
                    <Button styles="btn-submit login-btn" text="Enviar" disabled={isSubmitting} />
                  </Form>
                )
              }
            </Formik>
          </>
        }
      </CenteredContainer>
    </>
  )
}

export default ChangePassword
