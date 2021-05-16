import logo from 'images/logo.png';
import { Link } from 'react-router-dom';

const CenteredContainer = ({ children }) => {
  return (
    <div className="container">
      <div className="header">
        <Link to="/"><img src={logo} alt="logo" className="logo" /></Link>
      </div>
      <div className="form-box">
        {children}
      </div>
    </div>
  )
}

export default CenteredContainer
