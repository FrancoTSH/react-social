import Button from 'components/Button';
import CenteredContainer from 'components/CenteredContainer';
import FacebookButton from 'components/FacebookButton';
import GoogleButton from 'components/GoogleButton';
import InputField from 'components/InputField';
import { useAuth } from 'context/AuthContext';
import { Form, Formik } from 'formik';
import { Helmet } from 'react-helmet';
import { Link, useHistory } from 'react-router-dom';
import { getAvatarURL } from 'services/avatarGenerator';
import * as Validator from 'yup';

const validateFields = Validator.object().shape({
  name: Validator.string()
    .required('Ingrese su nombre'),
  email: Validator.string()
    .required('Ingrese su email')
    .email('Ingrese un email valido'),
  password: Validator.string()
    .required('Ingrese su contraseña')
    .min(6, 'La contraseña debe tener minimo 6 caracteres')
})

const Register = () => {
  const { signUp } = useAuth();
  const history = useHistory();

  const handleSubmit = async (values, { setFieldError }) => {
    try {
      const res = await signUp(values.email, values.password);
      const avatar = await getAvatarURL(values.name, res.user.uid);
      await res.user.updateProfile({
        displayName: values.name,
        photoURL: avatar
      });
      history.push('/');
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') setFieldError('email', 'El email ya existe');
    }
  }

  return (
    <>
      <Helmet>
        <title>Registrarte | ReactSocial</title>
      </Helmet>
      <CenteredContainer>
        <Formik initialValues={{
          name: '',
          email: '',
          password: ''
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
                <InputField type="text" name="name" label="Nombre" id="name" />
                <InputField type="email" name="email" label="E-mail" id="email" />
                <InputField type="password" name="password" label="Contraseña" id="password" />
                <Button styles="btn-submit login-btn" text="Crear cuenta" disabled={isSubmitting} />
              </Form>
            )
          }
        </Formik>
        <p>¿Tienes una cuenta?<Link to="/login">Inicia sesión</Link></p>
      </CenteredContainer>
    </>
  )
}

export default Register
