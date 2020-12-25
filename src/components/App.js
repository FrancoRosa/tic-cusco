import { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Checkout from './Checkout';
import Login from './Login';
import { auth } from '../firebase';
import { setUser } from '../actions';

const App = ({ user, setUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged(authUser => {
      console.log('The user is:', authUser)
      if (authUser) {
        console.log('>>>>>loggedIN');
        setUser(authUser);
      } else {
        console.log('>>>>>loggedOUT')
        setUser(null);
      }
    })
  }, [])

  return (
    <Router>
      <div className="app">
        <Switch>
          
          <Route path="/login">
            <Login />
          </Route>
          
          <Route path="/checkout">
            <Header user={user}/>
            <Checkout />
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
