import '../css/AdminLogin.css'
import { connect } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const AdminLogin = ({ admin }) => {
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkCount = () => {
    if (count<0) setCount(0); 
  }
  
  const checkPass = () => {
    if (pass === 'Diegoandrea7') {
      admin=true;
      history.push('/dashboard')
    } else {
      setError('Error en contraseña, intenta de nuevo');
      setCount(5);
    }
  }
  
  return(
    <div className="adminlogin">
      {checkCount()}
      { !admin ? 
        <div>
          { 
            count == 0 ?
              <div className="adminlogin__form">
                <p>Hola tic-cusco</p>
                <input type="password" value={pass} onChange={e=>{setPass(e.target.value); setError('')}}/>
                <button onClick={checkPass}>Entrar</button>
              </div>
            :
              <div className="adminlogin__error">
                <p>{count}</p>
                <p>{error}</p>
              </div>
          }
        </div>
        :
        <div>
          <p>Hola Administrador!</p>
          <button onClick={checkPass}>Go to dashboard</button>
        </div>
      }
    </div>
  )
}

const mapStateToProps = state => ({
  admin: state.admin
})

export default connect(mapStateToProps)(AdminLogin);