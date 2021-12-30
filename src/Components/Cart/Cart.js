import React, {useState, useEffect} from "react";
import "./Cart.css";
import Card from "@mui/material/Card";
import emptyCart from '../../Assests/emptyCart.gif'
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import {useHistory,Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';

const Cart = () => {
  const history = useHistory();

  let cart =  JSON.parse(localStorage.getItem("cart"));

  // let cartLength = cart.length;
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    let ref = [];

    for(let i=0; i<15; i++){
      ref.push(1);
    }
    setQuantity(ref);

  }, []);

  let cartItem = cart?.map( function(e) {
    let obj = Object.assign({}, e);
    obj.quantity = quantity[parseInt(e.id)];
    return obj;
  })

  console.log(cartItem);


  // ---------------------------------------------------
  let total = 0;
  let promoDiscount = Math.random().toFixed(2) * 20 ; 
  let shippingFee = Math.random().toFixed(2) * 75 ;
  
  let items ;
  
  
  if(cartItem !== null && cartItem !== undefined){
    items = cartItem.length ;
    // console.log(items) ;
    
    cartItem.map((e) => {
      return total += e.price ;
    })
  }
  
  let orderTotal = (total - promoDiscount + shippingFee); 

  const handleIncQuantity = (e) => {
    console.log("Quantity Increased", e);
    let temp = quantity;
    temp[parseInt(e.id)] += 1;
    setQuantity(temp)
    console.log(quantity)
  }

  const handleDecQuantity = (e) => {
    console.log("Quantity Decreased", e);
  }

  const handlePlacedOrder = () => {
    localStorage.removeItem("cart");
    history.push("/checkout");
  };

  const handleRemoveCart = (id) => {
    let newCart = cartItem.filter( (e)=> e.id !== id );
    console.log(newCart) ;  
    localStorage.setItem("cart", JSON.stringify(newCart));
    alert("Item Removed from the Cart");    
    history.push('/cart');
  }


  return (
    <div>
      <h1 className="cart-heading"> My Cart </h1>

      <div className="cart">
        <div>
          {
          cartItem !== undefined && cartItem !== null && cartItem.length > 0 ? (
            cartItem.map((e, i) => (
              <Card
                sx={{ width: 800, minHeight: 350, margin: 1 }}
                key={i}
                className="cart-item"
              >
                <div>
                  <CardMedia
                    component="img"
                    image={e.preview}
                    alt="green iguana"
                    style={{
                      width: "200px",
                      height: "250px",
                      objectFit: "cover",
                      padding: "20px",
                    }}
                  />
                </div>

                <div id="cart-info">
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div" id="cart-name">
                      <Link to = '/product' style={{color:'black'}}> <h3> {e.name} </h3> </Link>
                    </Typography>

                    <Typography variant="h4" id='cart-brand'> <label> Brand: {e.brand} </label> </Typography>

                    <Typography variant="h4" id='cart-price'>Rs. {e.price}</Typography>

                    <Typography id="qty-btn">
                      <Button size='small' onClick = { () => handleDecQuantity(e)} > - </Button>
                      <label> { quantity[parseInt(e.id)] } </label>
                      <Button size='small' onClick = { () => handleIncQuantity(e)} > + </Button>
                    </Typography>

                    <Typography id="remove-cart">
                      <Button 
                        color="error" 
                        size="large"
                        variant="outlined" 
                        onClick={() => handleRemoveCart(e.id) } 
                        > 
                        Remove 
                      </Button>
                    </Typography>
                  </CardContent>
                </div>
              </Card>

            )) 
          ) : (
            <div className="empty-cart">
              <img
                src={emptyCart}
                alt="empty cart"
              />
            </div>
          )}
        </div>
        
        {
        cartItem !== undefined && cartItem !== null && cartItem.length > 0 &&
        <div className="order-summary">
          <h1> Order Summary </h1>

          <div className="summary">
            <h3> Price ( {items} ) : </h3>
            <p> Rs. {total.toFixed(2)} </p>
          </div>

          <div className="summary">
            <h3> Discount: </h3>
            <p> Rs. - {promoDiscount.toFixed(2)} </p>
          </div>

          <div className="summary">
            <h3> Shipping Fee: </h3>
            <p> Rs. + {shippingFee.toFixed(2)} </p>
          </div>

          <div className="summary">
            <h2> Order Total: </h2>
            <h2> Rs. {orderTotal.toFixed(2)} </h2>
          </div>

          <CardActions>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              style={{ marginLeft: "auto", marginRight: "auto" }}
              onClick={handlePlacedOrder}
              >
              CHECKOUT
              
              <ArrowRightAltIcon />
            </Button>
          </CardActions>
        </div> 
        }
      </div>

    </div> // ending div
  );
};

export default Cart;
