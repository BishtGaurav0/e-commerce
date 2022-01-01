import React, { useEffect, useState } from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import logo from '../../Assests/logo.png'
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


export default function Navbar(props) {
    let cartItems = JSON.parse(localStorage.getItem("cart"));
    
    let userEmail = props.userEmail;
    // console.log(userEmail);

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
                    {!userEmail ? <LoginIcon style={{color:"#551A8B"}}/> : <AccountCircleIcon style={{color:'#551A8B'}}/> }
                    <Link to="/signup"> {userEmail ? userEmail.slice(0, -10) : "Login"} </Link>
                </div>
                            
                <div id="dashboard">
                    <AddBusinessIcon style={{color:"#551A8B"}}/>
                    <Link to='/dashboard'> Dashboard </Link>
                </div>

                <div className='cart-number'>
                    {   
                        cartItems?.length > 0 ?
                        <label> {cartItems.length} </label> : "0"
                    }
                </div>
                
                <div id="cart">
                    <ShoppingCartCheckoutIcon style={{color:"#551A8B"}}/>
                    <Link to='/cart'> Cart </Link>
                </div>
            </div>

         </nav>
        </>
    )
}
