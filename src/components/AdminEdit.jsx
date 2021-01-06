import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { db, storage } from '../firebase';
import { connect } from 'react-redux';
import { setProducts } from '../actions';

const AdminEdit = ({ products, setProducts }) => {
  const params = useParams();
  const history = useHistory();
  const product = products.filter(product => product.id === params.id)[0]

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState('');

  const [categories, setCategories] = useState(product.categories);
  const [stock, setStock] = useState(product.stock);
  const [listprice, setListPrice] = useState(product.listprice);
  const [price, setPrice] = useState(product.price);
  const [highlight, setHighlight] = useState(product.highlight);
  const [list, setList] = useState(product.list);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [savedimgs, setSavedimgs] = useState(product.urls);
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
    event.target.classList.add('is-loading')
    const promises = [];
    images.forEach(img => {
      promises.push(saveImage(img));
    });
    
    Promise.all(promises).then(()=>{
      console.log('urls');
      console.log(urls);
      db.collection('products').doc(product.id).set({
        title,
        brand,
        description,
        categories,
        stock,
        listprice,
        price,
        highlight,
        list,
        urls: [...savedimgs, ...urls],
      })
      .then(() => {
        console.log('...productSaved');
        getProducts(event, product.id);
      })
      .catch(error =>{
        event.target.classList.remove('is-loading')
        console.error('...was it an error?');
        console.error(error.message);
      });
    });
    
  }

  const saveImage = (file) => { 
    return new Promise ((resolve, reject) => {
      var storageRef = storage.ref();
      var uploadTask = storageRef.child('images/' + file.name).put(file);
      uploadTask.on('state_changed',
        snapshot => {
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
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
    console.log(image)
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

  const removeSavedimgs = event => {
    event.preventDefault();
    event.target.classList.add('is-loading');
    console.log('removing')
    const tempSavedimgs = [...savedimgs];
    const tempUrl = tempSavedimgs.pop()
    const imgRef = storage.refFromURL(tempUrl)
    imgRef.delete()
      .then(()=>{
        event.target.classList.remove('is-loading');
        setSavedimgs(tempSavedimgs)
      })
      .catch(error => {
        if (error.message.includes('object-not-found')) {
          setSavedimgs(tempSavedimgs);
        } else {
          console.log(error)
        }
        event.target.classList.remove('is-loading');
      })
  }

  const removeProduct = e => {
    console.log('product removed')
    console.log(e)
    e.target.classList.add('is-loading')
    db.collection("products").doc(product.id).delete()
      .then(()=>{
        e.target.classList.remove('is-loading')
        console.log('Product Deleted')
        getProducts(e);
        history.push('/dashboard')
      })
      .catch(error=>{
        e.target.classList.remove('is-loading')
        console.log(error);
      })
  }

  const savedCategories = (products) => {
    const result = [];
    products.forEach(product => product.categories.forEach(category => {
      if(!result.includes(category)) result.push(category);
    }))
    return result.sort();
  }

  const savedBrands = (products) => {
    const result = [];
    products.forEach(product => {
      if(product.brand && !result.includes(product.brand)) result.push(product.brand);
    })
    return result.sort();
  }

  const toggleCategory = event => {
    event.target.classList.add('is-dark')
    setCategories([...categories, event.target.innerText])
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
          <h1 className="title is-6">Editar Producto</h1>
        </div>
        <div className="navbar-end">
          <button className="button is-danger new__button" onClick={removeProduct}>Eliminar</button>
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
                  />
                </td>
              </tr>
              <tr>
                <th>Marca:</th>
                <td>
                  <div className="new__fields">
                    {savedBrands(products).map(brand => <span className="tag" onClick={e=>setBrand(e.target.innerText)}>{brand}</span>)}
                  </div>
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
                  <div className="new__fields">
                    {savedCategories(products).map(category => <span className="tag" onClick={toggleCategory}>{category}</span>)}
                  </div>
                  <p>{categories.join(', ')}</p>
                  {
                    categories.length > 0 
                    && 
                    <button className="button is-danger is-small new__button" onClick={removeCategory}>Borrar categoria</button>
                  }
                  <input
                    options={['uno','dos','tres','cuatro']} 
                    className="input" required
                    type="text" value={category}
                    onChange={e=> setCategory(e.target.value)}
                    placeholder="teclado"
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
                    type="checkbox" value={highlight} checked={highlight}
                    onChange={e=>setHighlight(e.target.checked)}
                  />
                </td>
              </tr>
              <tr>
                <th>Listar:</th>
                <td>
                  <input 
                    type="checkbox" value={list} checked={list}
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
              <tr>
                <th>Imagenes guardadas ({savedimgs.length}):</th>
                <td>
                  {savedimgs.map(img => <img className="new__image" src={img} alt=""/>)}
                  { 
                    savedimgs.length > 0
                    &&
                    <button className="button is-danger new__button is-small" onClick={removeSavedimgs}>Borrar Imagen</button>
                  }
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  </div>
)};

const mapStateToProps = state => ({
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  setProducts: products => dispatch(setProducts(products)),
})

export default connect(mapStateToProps,mapDispatchToProps)(AdminEdit);