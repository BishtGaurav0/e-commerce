import React, {useState} from "react";
import "./Cart.css";
import Card from "@mui/material/Card";
import emptyCartGif from '../../Assests/emptyCart.gif'
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import {useHistory,Link } from "react-router-dom";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { showNotification } from "../../Helpers/notification";
import { useSelector, useDispatch } from "react-redux";
import { emptyCart, removeFromCart } from "../../State/Action";

const Cart = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  let cartItem =  useSelector((state) => state.cartData)
  const [quantity, setQuantity] = useState(1);
  // let quantity = 1;

  // let cartItem = cart?.map( function(e) {
  //   let obj = Object.assign({}, e);
  //   obj.quantity = quantity
  //   return obj;
  // })

  // console.log(cartItem);

  // Summary Values
  
  let total = 0;
  let promoDiscount = Math.random().toFixed(2) * 20 ; 
  let shippingFee = Math.random().toFixed(2) * 75 ;
  
  let items ;
  
  
  if(cartItem !== null && cartItem !== undefined){
    items = cartItem.length ;

    cartItem.map((e) => {
      return total += e.price ;
    })
  }
  
  let orderTotal = (total - promoDiscount + shippingFee); 

  // handle Buttons 
  const handleIncQuantity = (e) => {
    setQuantity(quantity + 1)
  }

  const handleDecQuantity = (e) => {
    setQuantity(quantity - 1)
  }

  const handleCheckout = () => {
    // localStorage.removeItem("cart");
    dispatch(emptyCart())
    history.push("/checkout");
  };

  const handleRemoveCart = (id) => {
    dispatch(removeFromCart(id))
    showNotification("Item removed from the cart", "info", 1000);
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
                sx={{ width: 'auto', minHeight: 350, margin: 1 }}
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
                      <label> { quantity } </label>
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
                src={emptyCartGif}
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
              onClick={handleCheckout}
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
