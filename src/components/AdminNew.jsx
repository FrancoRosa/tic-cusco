import '../css/AdminNew.css';
import { useState } from 'react';
import { db } from '../firebase';

const AdminNew = () => {
  const [title, setTitle] = useState('');
  const [stock, setStock] = useState('');
  const testDB = event => {
    event.preventDefault();
    db.collection('test').doc(title).set('cool') 
    console.log('save');
  }

  return(
  <div className="new">
    <h1>Nuevo Producto</h1>
    <form action="">
      <h6>Titulo</h6>
      <input type="text" value={title} onChange={e=> setTitle(e.target.value)}/>
      <h6>Cantidad</h6>
      <input type="number" value={stock} onChange={e=> setStock(e.target.value)}/>
      <br />
      <button onClick={testDB}>Guardar</button>
    </form>
    <button>Cancelar</button>
  </div>
)};

export default AdminNew;