import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { db, storage } from '../firebase';
import '../css/AdminNew.css';

const AdminNew = () => {
  const history = useHistory();
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState(0);
  const [price, setPrice] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [list, setList] = useState(false);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const urls = []
  const saveProduct = event => {
    event.preventDefault();
    const promises = [];
    images.forEach(img => {
      promises.push(
        saveImage(img)
      );
    });
    
    Promise.all(promises).then(()=>{
      db.collection('products').add({
        description,
        categories,
        stock,
        price,
        highlight,
        list,
        urls,
      })
      .then(console.log('...productSaved'))
      .catch(console.error('...productNotSaved'));
    })
  }

  const saveImage = async file => {
    storage.ref('images').child(file.name).getDownloadURL()
      .then(url => {
        urls.push(url);
        console.log('...imageSaved');
      })
      .catch(()=>console.error('...imageNotSaved'))
  }

  const addCategory = event => {
    event.preventDefault();
    if (category !== '') {
      setCategories([...categories, category.toLocaleLowerCase()]);
      setCategory('');
    }
  }
  
  const addImage = event => {
    event.preventDefault();
    console.log(image)
    if (image) {
      console.log('saving...')
      setImages([...images, image]);
      setImage(null);
    }
  }

  return(
  <div className="new">
    <h1>Nuevo Producto</h1>
    <form action="">
      <h6>Descripcion</h6>
      <input type="text" value={description} onChange={e=> setDescription(e.target.value)} />
      
      <h6>Categorias</h6>
      <p>{categories.join(', ')}</p>
      <input type="text" value={category}
        onChange={e=> setCategory(e.target.value)}
        placeholder="teclado"
      />
      <button onClick={addCategory}>Añadir categoria</button>
      
      <h6>Stock</h6>
      <input type="number" value={stock} onChange={e=> setStock(e.target.value)} />
      
      <h6>Precio</h6>
      <input type="number" value={price} onChange={e=> setPrice(e.target.value)} />
      
      <h6>Destacar</h6>
      <input type="checkbox" value={highlight} onChange={e=>setHighlight(e.target.checked)} />
      
      <h6>Listar</h6>
      <input type="checkbox" value={list} onChange={e=> setList(e.target.checked)} />
      
      <h6>Imagenes</h6>
      {images.map(img => <img src={URL.createObjectURL(img)} alt=""/>)}
      <input type="file" onChange={e=> setImage(e.target.files[0])} />
      <button onClick={addImage}>Añadir Imagen</button>
      <br />

      <button onClick={saveProduct}>Guardar</button>
    </form>
    <button onClick={()=>history.push('/dashboard')}>Cancelar</button>
  </div>
)};

export default AdminNew;