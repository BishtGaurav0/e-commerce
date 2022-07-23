import React, {useState} from 'react'
import './Card.css'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import { showNotification } from '../../Helpers/notification';
import { useDispatch, useSelector } from "react-redux";
import { addToCart, viewDetails } from '../../State/Action';

function CardData({e, i}) {
  const history = useHistory();
  const dispatch = useDispatch();
  
  let cartData = useSelector((state)=>state.cartData)

  const [readMore, setReadMore] = useState(false);
    
  const handleViewDetails = (e) => {
    dispatch(viewDetails(e))
    window.scrollTo(0, 0);
    history.push('/product');
  }
    
  const handleAddToCart = (e) => {
    if(cartData.findIndex((element) => element.id === e.id) > -1 ) {
      showNotification("Product is already present", "warning", 1000)
      return;
    } else{
      dispatch(addToCart(e));
      showNotification("Added to the cart", "success", 1000)
    }
  };
    
  return (
      <div>
        <Card key={i} id='card' >
          <CardMedia
            component="img"
            image={e.preview}
            onClick={ () => handleViewDetails(e)}
            alt="green iguana"
            style={{
              width: "200px",
              height: "250px",
              objectFit: "fill",
              margin: "0 auto",
              padding: "20px",
              cursor:'pointer'
            }}
          />

          <CardContent >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              style={{ textAlign: "center", fontFamily:'Philospher' }}
            >
              {e.title}
            </Typography>

            <Typography variant="body"  color="text" style={{fontFamily:"'Philosopher', sans-serif"}}>
              {readMore ? e.description : e.description.substr(0, 100)}
              <Button
                onClick={() => setReadMore(!readMore)}
                style={{ textTransform: "lowercase" }}
              >
                {readMore ? "show less" : "read more"}
              </Button>
            </Typography>

            <Typography
              variant="body2"
              style={{
                color: "black",
                fontWeight: "800",
                fontSize: "1rem",
                fontFamily:"'Philosopher', sans-serif"
              }}
            >
              Rs. {e.price}
            </Typography>
          </CardContent>

          <CardActions
            style={{ display: "flex", justifyContent: "space-around" }} >
              <Button 
                size="large" 
                variant="outlined"
                onClick={ () => handleViewDetails(e)}
              > 
                View Details
              </Button>

              <Button 
                size="large"
                variant="contained" 
                onClick={() => handleAddToCart(e)}
              >
                Add to Cart{" "}
              </Button>
            
          </CardActions>
        </Card>
      </div>
  )
}

export default CardData
