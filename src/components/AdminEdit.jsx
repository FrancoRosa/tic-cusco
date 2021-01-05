import { useHistory, useParams } from 'react-router-dom';
import { useState } from 'react';
import { db, storage } from '../firebase';
import { connect } from 'react-redux';

const AdminEdit = ({ products }) => {
  const params = useParams();
  const history = useHistory();
  const product = products.filter(product => product.id === params.id)[0]

  const [description, setDescription] = useState(product.description);
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState(product.categories);
  const [stock, setStock] = useState(product.stock);
  const [listprice, setListPrice] = useState(product.listprice);
  const [price, setPrice] = useState(product.price);
  const [highlight, setHighlight] = useState(product.highlight);
  const [list, setList] = useState(product.list);
  const [image, setImage] = useState('');
  const [images, setImages] = useState([]);
  const [success, setSuccess] = useState(false);
  let urls = product.urls;


  const updateProduct = async event => {
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
  
  const addImage = event => {
    event.preventDefault();
    console.log(image)
    if (image) {
      setImages([...images, image]);
      setImage(null);
    }
  }

  const successTimer = () => {
    setTimeout(history.push('/dashboard'), 1000)
  }

  return(
  <div className="new">
    { !success ?
      <div className="new__container">
        <h1>Editar Producto</h1>
        <div>
          <h6>Descripcion</h6>
          <input type="text" value={description} onChange={e=> setDescription(e.target.value)} />
          
          <h6>Categorias</h6>
          <p>{categories.join(', ')}</p>
          <input type="text" value={category}
            onChange={e=> setCategory(e.target.value)}
            placeholder="teclado"
          />
          <button onClick={addCategory}>Añadir categoria</button>
          <button onClick={e=>{e.preventDefault();setCategories([])}}>Borrar categorias</button>
          
          <h6>Stock</h6>
          <input type="number" value={stock} onChange={e=> setStock(e.target.value)} />
          
          <h6>Precio de Lista</h6>
          <input type="number" value={listprice} onChange={e=> setListPrice(e.target.value)} />
          
          
          <h6>Precio</h6>
          <input type="number" value={price} onChange={e=> setPrice(e.target.value)} />
          
          <h6>Destacar</h6>
          <input type="checkbox" value={highlight} onChange={e=>setHighlight(e.target.checked)} />
          
          <h6>Listar</h6>
          <input type="checkbox" value={list} onChange={e=> setList(e.target.checked)} />
          
          <h6>Imagenes Guardadas</h6>
          <button onCLick={()=>console.log('test')}>Borrar Imagenes</button>
          <br />
          {urls.map(url => <img src={url} alt=""/>)}
          <br />
          <h6>Imagenes</h6>
          {images.map(img => <img src={URL.createObjectURL(img)} alt=""/>)}
          <input type="file" onChange={e=> setImage(e.target.files[0])} />
          <button onClick={addImage}>Añadir Imagen</button>
          <br />

          <button onClick={updateProduct}>Guardar</button>
        </div>
        <button onClick={()=>history.push(`/dashboard/${product.id}`)}>Cancelar</button>
      </div> :
      <div className="new__success">
        {successTimer()}
        Producto guardado, redireccinando...
      </div>
    }
  </div>
)};

const mapStateToProps = state => ({
  products: state.products,
})
export default connect(mapStateToProps)(AdminEdit);