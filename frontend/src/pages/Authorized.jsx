
import Signin from './Signin';

function Authorized({ children }) {
  const token =    localStorage.getItem('token'); // Replace this logic with how you manage tokens.
  return token ? children : <Signin />;
}

export default Authorized;
