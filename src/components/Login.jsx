import { Link, useHistory } from 'react-router-dom';
import LocalMallIcon from '@material-ui/icons/LocalMall';
import '../css/Login.css';
import { useState } from 'react';
import { auth } from '../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const history = useHistory();

  const signIn = e => {
    e.preventDefault();
    auth.signInWithEmailAndPassword(email, pass)
        .then(auth => history.push('/'))
        .catch(error => alert(error.message));
  }

  const register = e => {
    e.preventDefault();
    auth.createUserWithEmailAndPassword(email, pass)
        .then(auth => {
          console.log(auth);
          history.push('/')
        })
        .catch(error => alert(error.message));

  }

  return (
    <div className="login">
      <Link to="/">
        <h2 className="login__logo">
            <LocalMallIcon className="header__titleIcon"/>
            TIC CUSCO
        </h2>
      </Link>
      <div className="login__container">
        <h1>Iniciar Sesión</h1>
        <form className="login__form">
          <h5>E-mail</h5>
          <input 
            type="text"
            value={email}
            onChange={e=>setEmail(e.target.value)}
          />
          <h5>Contraseña</h5>
          <input
            type="password"
            value={pass}
            onChange={e=>setPass(e.target.value)}
          />
          <button type="submit" onClick={signIn}>Ingresar</button>
        </form>
        <p>Ingresando, aceptas las condiciones y terminos de uso.</p>
        <button onClick={register}>Crear cuenta</button>
      </div>
    </div>
  );
};

export default Login;