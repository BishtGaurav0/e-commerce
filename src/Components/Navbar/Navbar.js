import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LoginIcon from '@mui/icons-material/Login';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import logo from '../../Assests/logo.png'
export default function Navbar() {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    // console.log("Products in cart", cartItems.length);

    return (    
        <>
         <nav id="navbar">
            <div id="left-panel">
                <Link to = '/' > <img src={logo} alt='logo' className='logo'/> </Link>
            </div>

            <div id="input">
                <SearchIcon style={{color:"grey"}}/>
                <input 
                    type = "text"
                    placeholder = "Search for products"
                    spellCheck = "false"
                />
            </div>

            <div id="right-panel">
                <div id="login">
                    <LoginIcon style={{color:"white"}}/>
                    <Link to="/signup"> Login </Link>
                </div>
                            
                <div id="dashboard">
                    <AddBusinessIcon style={{color:"white"}}/>
                    <Link to='/dashboard'> Dashboard </Link>
                </div>

                <div className='cart-number'>
                    {   
                        cartItems !==null && cartItems !== undefined ?
                        <h1 > {cartItems.length} </h1> : "0"
                    }
                </div>
                
                <div id="cart">
                    <ShoppingCartCheckoutIcon style={{color:"white"}}/>
                    <Link to='/cart'> Cart </Link>
                </div>
            </div>

         </nav>
        </>
    )
}
