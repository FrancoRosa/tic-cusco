import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { db, storage } from '../firebase';
import '../css/AdminNew.css';
import { connect } from 'react-redux';
import { setProducts } from '../actions';

const AdminNew = ({setProducts}) => {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [stock, setStock] = useState(0);
  const [listprice, setListPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [highlight, setHighlight] = useState(false);
  const [list, setList] = useState(false);
  const [image, setImage] = useState(null);
  const [images, setImages] = useState([]);
  let urls = [];


  const getProducts = (event, id) => {
    console.log('... reading products from Firebase')
    const allProducts = [];
    db.collection('products').get()
    .then(query => {
      console.log('... saving data on redux store')
      query.forEach(doc => allProducts.push({ ...doc.data(), id: doc.id }));
      setProducts(allProducts);
      event.target.classList.remove('is-loading')
      history.push(`/dashboard/${id}`)
    })
    .catch(error => {
      console.error(error)
    })
  }

  const saveProduct = async event => {
    event.preventDefault();
    event.target.classList.add('is-loading');
    const promises = [];
    images.forEach(img => {
      promises.push(saveImage(img, urls));
    });
    if (description && (categories.length > 0)){
      Promise.all(promises).then(()=>{
      db.collection('products').add({
        title,
        description,
        brand,
        categories,
        stock,
        listprice,
        price,
        highlight,
        list,
        urls,
      })
      .then(docRef => {
        getProducts(event, docRef.id)
      })
      .catch(error =>{
        event.target.classList.remove('is-loading')
      });
    })
    }
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
  
  const removeCategory = event => {
    event.preventDefault();
    const tempCategories = [...categories]
    tempCategories.pop()
    setCategories(tempCategories);
  }

  const addImage = event => {
    event.preventDefault();
    if (image) {
      setImages([...images, image]);
      setImage(null);
    }
  }

  const removeImage = event => {
    event.preventDefault();
    console.log('removing')
    const tempImages = [...images];
    tempImages.pop()
    setImages(tempImages);
    setImage(null);
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
          <button
            className="button new__button is-success"
            onClick={saveProduct}
            disabled={title === '' || description === '' || categories.length === 0} 
          >
            Guardar
          </button>
          <button className="button is-link new__button" onClick={()=>history.push('/dashboard')}>Cancelar</button>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="card new__form">
        <table className="table new__table">
          <tbody>
            <tr>
              <th>Titulo:</th>
              <td>
                <input
                  className="input" required
                  type="text" value={title}
                  onChange={e=> setTitle(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>Descripción:</th>
              <td>
                <textarea
                  className="textarea" required
                  type="text" value={description}
                  onChange={e=> setDescription(e.target.value)}
                  placeholder="Descripcion del producto"
                />
              </td>
            </tr>
            <tr>
              <th>Marca:</th>
              <td>
                <input
                  className="input" required
                  type="text" value={brand}
                  onChange={e=> setBrand(e.target.value)}
                  placeholder="Por ejemplo kingston (siempre en minusculas)"
                />
              </td>
            </tr>
            <tr>
              <th>Categorias ({categories.length}):</th>
              <td>
                <p>{categories.join(', ')}</p>
                {
                  categories.length > 0 
                  && 
                  <button
                    type="button"
                    className="button is-danger is-small new__button"
                    onClick={removeCategory}
                  >
                    Borrar categoria
                  </button>
                }
                
                <input 
                  className="input" required
                  type="text" value={category}
                  onChange={e=> setCategory(e.target.value)}
                  placeholder="Escribe una categoria. Luego, presiona añadir "
                  onKeyUp={e=>{if (e.key==='Enter') addCategory(e)}}
                />
                <button className="button is-success new__button is-small" onClick={addCategory}>Añadir categoria</button>
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
                <div class="file">
                  <label class="file-label is-small">
                    <input class="file-input" type="file" onChange={e=> setImage(e.target.files[0])} />
                    <span class="file-cta">
                      <span class="file-icon">
                        <i class="fas fa-upload"></i>
                      </span>
                      <span class="file-label">
                        {image ? image.name : 'Buscar imagen ...'}
                      </span>
                    </span>
                  </label>
                </div>
                {image && <img className="new__image" src={URL.createObjectURL(image)} alt=""/>}
                <br/>
                {image && <button className="button is-success is-small new__button" onClick={addImage}>Añadir Imagen</button>}
              </td>
            </tr>
            <tr>
              <th>Imagenes seleccionadas ({images.length}):</th>
              <td>
                {images.map(img => <img className="new__image" src={URL.createObjectURL(img)} alt=""/>)}
                { 
                  images.length > 0
                  &&
                  <button className="button is-danger new__button is-small" onClick={removeImage}>Borrar Imagen</button>
                }
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)};

const mapDispatchToProps = dispatch => ({
  setProducts: products => dispatch(setProducts(products)),
});

export default connect(null, mapDispatchToProps)(AdminNew);