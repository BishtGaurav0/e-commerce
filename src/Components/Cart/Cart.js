import React, {useState} from "react";
import "./Cart.css";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { Button, CardActions } from "@mui/material";
import {useHistory,Link } from "react-router-dom";

const Cart = () => {
  const history = useHistory();

  let cart =  JSON.parse(localStorage.getItem("cart"));

  const [quantity, setQuantity] = useState(1);
  
  let cartItem = cart?.map( function(e) {
    let obj = Object.assign({}, e);
    obj.quantity = quantity;
    return obj;
  })

  // console.log(cartItem);


  // ---------------------------------------------------
  let total = 0;
  let promoDiscount = Math.random().toFixed(2) * 5 ; 
  let shippingFee = Math.random().toFixed(2) * 50 ;
  
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
    setQuantity(e.quantity + 1 );
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
          {cartItem !== undefined && cartItem !== null && cartItem.length > 0 ? (
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

                <div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <Link to = '/product' style={{color:'black'}}> <h2> {e.name} </h2> </Link>
                    </Typography>

                    <Typography variant="h4">Rs. {e.price}</Typography>

                    <Typography className="qty-btn">
                      <Button size='small' onClick = { () => handleDecQuantity(e)} > - </Button>
                      <label> {e.quantity} </label>
                      <Button size='small' onClick = { () => handleIncQuantity(e)} > + </Button>
                    </Typography>

                    <Typography>
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
                src="https://www.seekpng.com/png/detail/117-1170538_404-your-cart-is-empty.png"
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
            <h3> Promos: </h3>
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
            </Button>
          </CardActions>
        </div> 
        }
      </div>

    </div> // ending div
  );
};

export default Cart;
