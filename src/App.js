import React from 'react'
import './App.css';
import {HashRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import FourOFour from './Pages/FourOFour';
import Navbar from './Components/Navbar/Navbar';
import Dashboard from './Components/Dashboard/Dashboard';
import Cart from './Components/Cart/Cart';
import CheckoutComp from './Components/Checkout/CheckoutComp/CheckoutComp';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import { useSelector } from 'react-redux';

function App() {
  const userEmail = useSelector((state)=> state.userRed?.userName);
  function PrivateRoute ({Component, path}) {
    return (
      <Route 
      path={path}
      render={(props)=> 
        userEmail? <Component {...props} /> : <Redirect to='/signin'/> 
      }
      />
    )
  }

  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Switch>
          <Route exact path = {'/'} component={Dashboard} />
          <Route exact path = {'/signup'} component={SignUp} />
          <Route exact path = {'/signin'} component={SignIn} />
          <Route exact path = {'/product'} component={ProductDetails} />
          <PrivateRoute exact path = {'/cart'} Component={Cart} />
          <PrivateRoute exact path = {'/checkout'} Component={CheckoutComp} />
          <Route component={FourOFour} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;