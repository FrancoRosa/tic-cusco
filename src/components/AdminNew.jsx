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
  const [listprice, setListPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [list, setList] = useState(false);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  let urls = [];


  const saveProduct = async event => {
    event.preventDefault();
    const promises = [];
    images.forEach(img => {
      promises.push(saveImage(img, urls));
    });
    
    Promise.all(promises).then(()=>{
      console.log('urls');
      console.log(urls);
      db.collection('products').add({
        description,
        categories,
        stock,
        listprice,
        price,
        highlight,
        list,
        urls,
      })
      .then(() => {
        console.log('...productSaved');
        setSuccess(true);
      })
      .catch(error =>{
        console.error('...was it an error?');
        console.error(error.message);
      });
    })
  }

  const saveImage = (file, urls) => { 
    return new Promise ((resolve, reject) => {
      var storageRef = storage.ref();
      var uploadTask = storageRef.child('images/' + file.name).put(file);
      uploadTask.on('state_changed', // or 'state_changed'
        snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused': // or 'paused'
              console.log('Upload is paused');
              break;
            case 'running': // or 'running'
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, error => {
        switch (error.code) {
          case 'storage/unauthorized':
            break;
          case 'storage/canceled':
            break;
          case 'storage/unknown':
            break;
          default:
            break;
        }
      }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL);
          resolve(urls.push(downloadURL));
        });
      });
    });
  };

  const addCategory = event => {
    event.preventDefault();
    if (category !== '') {
      setCategories([...categories, category.toLocaleLowerCase()]);
      setCategory('');
    }
  }
  
  const addImage = event => {
    event.preventDefault();
    if (image) {
      setImages([...images, image]);
      setImage('');
    }
  }

  const removeImage = event => {
    event.preventDefault();
    console.log('removing')
    const tempImages = [...images];
    tempImages.pop()
    setImages(tempImages);
    setImage('');
  }

  const successTimer = () => {
    setTimeout(history.push('/dashboard'), 1000)
  }

  return(
  <div className="new">
    <div className="navbar dashboard__nav">
      <div className="navbar-brand">
        <h1 
          className="title is-3 dashboard__title"
          onClick={() => history.push('/')}
        >
          tic-cusco
        </h1>
        
      </div>
      <div className="navbar-menu">
        <div className="navbar-start new__title">
          <h1 className="title is-6">Nuevo Producto</h1>
        </div>
        <div className="navbar-end">
          <button className="button is-success new__button" onClick={saveProduct}>Guardar</button>
          <button className="button is-danger new__button" onClick={()=>history.push('/dashboard')}>Cancelar</button>
        </div>
      </div>
    </div>

    { !success ?
      <div className="container">
        <div className="card new__form">
          <table className="table new__table">
            <tbody>
              <tr>
                <th>Descripción:</th>
                <td>
                  <input
                    className="input"
                    type="text" value={description}
                    onChange={e=> setDescription(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Categorias:</th>
                <td>
                  <p>{categories.join(', ')}</p>
                  <input 
                    className="input"
                    type="text" value={category}
                    onChange={e=> setCategory(e.target.value)}
                    placeholder="teclado"
                  />
                  <button className="button is-link" onClick={addCategory}>Añadir categoria</button>
                </td>
              </tr>
              <tr>
                <th>Stock:</th>
                <td>
                  <input 
                    className="input"
                    type="number" value={stock}
                    onChange={e=> setStock(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Precio de Lista:</th>
                <td>
                  <input 
                    className="input"
                    type="number" value={listprice}
                    onChange={e=> setListPrice(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Precio:</th>
                <td>
                  <input 
                    className="input"
                    type="number" value={price}
                    onChange={e=> setPrice(e.target.value)}
                  />
                </td>
              </tr>
              <tr>
                <th>Destacar:</th>
                <td>
                  <input 
                    type="checkbox" value={highlight}
                    onChange={e=>setHighlight(e.target.checked)}
                  />
                </td>
              </tr>
              <tr>
                <th>Listar:</th>
                <td>
                  <input 
                    type="checkbox" value={highlight}
                    onChange={e=>setList(e.target.checked)}
                  /></td>
              </tr>
              <tr>
                <th>Imagenes:</th>
                <td>
                  <input 
                    type="file" onChange={e=> setImage(e.target.files[0])}
                  />
                  <button className="button is-link" onClick={addImage}>Añadir Imagen</button>
                </td>
              </tr>
              <tr>
                <th>Imagenes seleccionadas ({images.length}):</th>
                <td>
                  {images.map(img => <img className="new__image" src={URL.createObjectURL(img)} alt=""/>)}
                  { 
                    images.length > 0
                    &&
                    <button className="button is-danger" onClick={removeImage}>Borrar Imagen</button>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div> :
      <div className="container">
        {successTimer()}
        Producto guardado, redireccinando...
      </div>
    }
  </div>
)};

export default AdminNew;