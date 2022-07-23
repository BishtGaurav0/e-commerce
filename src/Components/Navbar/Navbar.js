import React from 'react';
import './Navbar.css'
import {Link} from 'react-router-dom';
import logo from '../../Assests/logo.png'
import SearchIcon from '@mui/icons-material/Search';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useHistory } from "react-router-dom";
import {signout} from '../../Helpers/auth'
import { showNotification } from '../../Helpers/notification';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../State/Action';
import CancelIcon from '@mui/icons-material/Cancel';

export default function Navbar() {
    const history = useHistory();
    const dispatch = useDispatch();

    let cartItems = useSelector((state) => state.cartData)
    let userEmail = useSelector((state) => state.userRed?.userName);

    const handleSignOut = async(e) => {       
        try{ 
            await signout();
            dispatch(logout())  
            showNotification("Sign Out Successfully","warning" ,1000)
            // console.log("Sign out successfully");
            history.push('/');
        } catch(err) {
            // console.log(err);
        }
    }
    
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
                    <Link to="/signup"> {userEmail ? userEmail.slice(0, -10).toUpperCase() : "Login"} </Link>
                </div>

                {
                    userEmail &&
                        <div id="sign-out">
                            <ExitToAppIcon style={{color:"#551A8B"}}/>
                            <Link to="" onClick={handleSignOut}> Sign Out </Link>
                        </div>
                }

                <div className='cart-number'>
                    {   
                        cartItems?.length > 0 ?
                        <label> {cartItems.length} </label> : "0"
                    }
                </div>
                
                <div id="cart">
                    <ShoppingCartIcon style={{color:"#551A8B"}}/>
                    <Link to='/cart'> Cart </Link>
                </div>
            </div>

         </nav>

         <nav id='mobile-nav'>
            <div>
                <Link to = '/' > <img src={logo} alt='logo' className='logo'/> </Link>
            </div>

            <div id='mob-right'>
                <div>
                    <Link to='/signup'> {!userEmail ? <LoginIcon style={{color:"#551A8B"}}/> : <AccountCircleIcon style={{color:'#551A8B'}}/>} </Link>
                </div>

            {
                userEmail &&
                    <div id="sign-out">
                        <Link to=""onClick={handleSignOut} > <CancelIcon style={{color:"#551A8B"}}/> </Link>
                    </div>
            }
                <div>
                    <Link to='/cart'> <ShoppingCartIcon style={{color:"#551A8B"}}/></Link>
                </div>
                
                <div className='cart-number'>
                    {cartItems?.length > 0 && (cartItems.length) }
                </div>

            </div>
         </nav>
        </>
    )
}
