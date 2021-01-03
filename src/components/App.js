import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import Payment from './Payment';
import AdminLogin from './AdminLogin';
import AdminDashboard from './AdminDashboard';
import AdminProduct from './AdminProduct';
import AdminNew from './AdminNew';
import { auth } from '../firebase';
import { setProducts, setUser } from '../actions';
import { db } from '../firebase';




const App = ({ user, setUser, products, setProducts }) => {
  
  const getProducts = () => {
    console.log('... reading products from Firebase')
    const allProducts = [];
    db.collection('products').get()
    .then(query => {
      console.log('... saving data on redux store')
      query.forEach(doc => allProducts.push({ ...doc.data(), id: doc.id }));
      setProducts(allProducts);
    })
    .catch(error => {
      console.error(error)
    })
  }
  
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    getProducts();
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          
          <Route path="/new">
            <AdminNew />
          </Route>
          
          <Route path="/dashboard/:id">
            <AdminProduct />
          </Route>

          <Route path="/dashboard">
            <AdminDashboard />
          </Route>

          <Route path="/admin">
            <AdminLogin />
          </Route>
          
          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/checkout">
            <Header user={user}/>
            <Checkout />
          </Route>
          
          <Route path="/payment">
            <Header user={user}/>
            <Payment />
          </Route>

          <Route path="/">
            <Header user={user} />
            <Home />
          </Route>

        </Switch>
      </div>
    </Router>
  );
}
const mapStateToProps = state => ({
  user: state.user,
  products: state.products,
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
  setProducts: products => dispatch(setProducts(products)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
