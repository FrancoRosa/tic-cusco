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
      if (count>0) {setCount(count => count - 1)} else {setCount(0)};
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const checkPass = () => {
    if (pass == 'Diegoandrea7') {
      admin=true;
      history.push('/admin/dashboard')
    } else {
      setError('Error en contraseña, intenta de nuevo');
      setCount(5);
    }
  }
  
  return(
    <div className="adminlogin">
      { !admin ? 
        <div>
          {
            count <= 0?
              <div>
                <input type="password" value={pass} onChange={e=>{setPass(e.target.value); setError('')}}/>
                <button onClick={checkPass}>Entrar</button>
                <p>{count}</p>
              </div>
            :
              <div>
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