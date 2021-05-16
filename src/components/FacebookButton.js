import { useAuth } from 'context/AuthContext';
import { FaFacebookF as FacebookIcon } from "react-icons/fa";
import { useHistory } from "react-router";

const FacebookButton = () => {
  const { signUpWithFacebook } = useAuth();
  const history = useHistory();

  const handleClick = async () => {
    try {
      await signUpWithFacebook()
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <button type="button" className="btn btn-fb" onClick={handleClick}>
      <FacebookIcon size="16" style={{ verticalAlign: 'bottom', marginRight: '5px' }} /> Continuar con Facebook
    </button>
  )
}

export default FacebookButton
