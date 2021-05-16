import Button from 'components/Button';
import CenteredContainer from 'components/CenteredContainer';
import Checkbox from 'components/customCheckbox';
import FacebookButton from 'components/FacebookButton';
import GoogleButton from 'components/GoogleButton';
import InputField from 'components/InputField';
import { useAuth } from 'context/AuthContext';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  email: Validator.string()
    .required('Ingrese su email')
    .email('Ingrese un email valido'),
  password: Validator.string()
    .required('Ingrese su contraseña')
    .min(6, 'La contraseña debe tener minimo 6 caracteres')
})


const Login = () => {
  const { logIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      await logIn(values.email, values.password, values.remember);
      history.push('/');
    } catch (err) {
      if (err.code === 'auth/user-not-found') setFieldError('email', 'El usuario no existe');
      else if (err.code === 'auth/wrong-password') setFieldError('password', 'La contraseña es incorrecta');
      else alert(err.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Iniciar sesión | ReactSocial</title>
      </Helmet>
      <CenteredContainer>
        <h3 className="form-title">Bienvenido de nuevo!</h3>
        <Formik initialValues={{
          email: '',
          password: '',
          remember: false
        }}
          validationSchema={validateFields}
          onSubmit={handleSubmit}
          validateOnChange={false}
        >
          {
            ({ isSubmitting }) => (
              <Form className="login">
                <div className="social-buttons">
                  <FacebookButton />
                  <GoogleButton />
                </div>
                <div className="divider"><span className="o">ó</span></div>
                <InputField type="email" name="email" id="email" label="E-mail" />
                <InputField type="password" name="password" id="password" label="Contraseña" />
                <div className="form-foot">
                  <Checkbox text="Recordarme" id="remember" />
                  <Link to="/password-reset" className="login-help">¿Olvidaste tu contraseña?</Link>
                </div>
                <Button styles="btn-submit login-btn" text="Acceder" disabled={isSubmitting} />
              </Form>
            )
          }
        </Formik>
        <p>¿No tienes cuenta?<Link to="/register">Registrate</Link></p>
      </CenteredContainer>
    </>
  )
}

export default Login
