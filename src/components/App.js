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
import AdminNew from './AdminNew';
import { auth } from '../firebase';
import { setUser } from '../actions';

const App = ({ user, setUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          
          <Route path="/new">
            <AdminNew />
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
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUser: user => dispatch(setUser(user)),
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
