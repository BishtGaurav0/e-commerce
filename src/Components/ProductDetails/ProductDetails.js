import { Button, TextField } from '@mui/material';
import React, { useState } from 'react'
import './ProductDetails.css'
import ReactStars from "react-rating-stars-component";
import { useHistory } from 'react-router-dom';
import Footer from '../Footer/Footer';
import VerifiedIcon from '@mui/icons-material/Verified';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import { showNotification } from '../../Helpers/notification';

const ProductDetails = () => {
    const history = useHistory();
    const [inputPin, setInputPin] = useState("")
    const [showVerify, setshowVerify] = useState(false);
    
    const data = JSON.parse(localStorage.getItem("product-info")) ;
    // console.log("in product",data);

    let ratings = Math.random() * (4.5-3+1) + 3;

    let cartItem = [];
    const handleAddToCart = (e) => {
      let getItems = JSON.parse(localStorage.getItem("cart"));
  
      let flag = true; // data is present
  
      if (getItems === undefined || getItems === null) {
        showNotification("Added to the Cart", "alert", 1000)
        cartItem.push(e);
        localStorage.setItem("cart", JSON.stringify(cartItem));

      } else {
        let list = [];
  
        getItems.forEach((element) => { 
          if (element.id === e.id) {
            flag = false;
            showNotification("Product is already present in the Cart", "alert", 1000)
          }
        });
  
        if (flag) {
          showNotification("Added to the Cart", "alert", 1000)
          list = [e, ...getItems];
          localStorage.setItem("cart", JSON.stringify(list));
        }
      }

    };

    const handleCheck = () => {
        inputPin.length === 6 && setshowVerify(true);
        inputPin.length === 0 && setshowVerify(false)
    }

    const handleBuyNow = () => {
        console.log("Buy Now");
        history.push('/checkout');
    }

    return (
        <>
        <div id='product-details'>
            <div id='left-bar'>
                <div id='all-photos'>
                    {
                        data.photos.map( (e, i)=> (
                            <img src={e} alt="photos" key={i}
                                style={ {width: "6vw", maxHeight: "11.5vh", objectFit: "fill"} } />
                        ) )
                    }
                </div>

                <div>
                    <img 
                        src={data.preview} 
                        alt="preview"  
                        style={ {width: "20vw", height: "70vh", objectFit: "cover"} } />

                </div>
            </div>


            <div id='right-bar'>
                <div id='right-top'>
                    <div>
                        <label> Brand : {data.brand} </label>
                        <h1 id='title'> {data.name} </h1>
                        <label id='code'> Product Code : {data.id} </label>

                        <div id='ratings'>
                            <ReactStars 
                                count={5}
                                size={30}
                                value={ratings}
                                isHalf = {true}
                                activeColor="#ffd700"
                                edit={false}
                                a11y={false}
                                onChange={false}
                            />
                        </div>

                        <div id='price'>
                            <h1 > Rs. {data.price} </h1>
                            <label> Inclusive of all taxes </label>    
                        </div>
                    </div>

                    <div id='sizes'>
                        <h4> Size </h4>
                        {
                            data.size.map( (e, i) => (
                                <span className='size' key={i}> {e} </span>
                            ))
                        }
                    </div>
                    
                    <div id='pincode'>
                        <h4> Check Delivery Pincode </h4>
                        <div  id='pin'>
                            <TextField id="outlined-basic" placeholder='Enter Pincode' variant="outlined" onChange={(e) => setInputPin(e.target.value)}/> 
                            <Button id='check-btn' onClick={handleCheck} variant='outlined' size='large'> Check </Button>

                            {showVerify ?
                                <VerifiedIcon style={{color:'green'}}/> :
                                <GppMaybeIcon   style={{color:'red'}}/>
                            }
                        </div>
                    </div>

                    <div id='product-btns'>   
                        <Button color='secondary' variant='outlined' size='large' onClick={ () => handleAddToCart(data)}> Add to Cart </Button>
                        <Button color='secondary' variant='contained' size='large' onClick={handleBuyNow}> Buy Now </Button>
                    </div>
                </div>

                <div id='right-bottom'>
                    <h1> Description </h1>
                    <label> {data.description} </label>
                </div>
            </div>

        </div>
        
        <div style={{marginTop:'10vh'}}>
            <Footer/>
        </div>
        </>

    )
}

export default ProductDetails
