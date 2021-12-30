import React, { useEffect } from "react";
import { useState } from "react";
import './Dashboard.css'
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../Footer/Footer";
import LoadingGif from '../../Assests/Loading.gif'
import { useHistory } from "react-router-dom";
import { showNotification } from "../../Helpers/notification";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);

  console.log("data is ", data);

  const history = useHistory();

  const fetchData = async () => {
    try {
      const data = await fetch("https://5d76bf96515d1a0014085cf9.mockapi.io/product");
      const res = await data.json();
      setData(res);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);


  // shop now
  const handleShopNow = (e) => {
    console.log("productInfo",e);
    localStorage.setItem("product-info", JSON.stringify(e));
    history.push('/product');
  }

  // add to cart
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

  return (
    <div >
      <div style={{backgroundColor:'whitesmoke', padding:'2vh 0'}}>
        {!loading ? (
          <div className="card-details">
            {
            data.map((e, i) => (
              <Card sx={{ maxWidth: 345, height: 510, borderRadius:'8px'}} key={i} >
                <CardMedia
                  component="img"
                  image={e.preview}
                  alt="green iguana"
                  style={{
                    width: "200px",
                    height: "250px",
                    objectFit: "cover",
                    margin: "0 auto",
                    padding: "20px",
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
                      onClick={ () => handleShopNow(e)}
                    > 
                      Shop Now 
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
            ))}
          </div>
        ) : (
          <div id="loading">
            <img src={LoadingGif} alt="loading..." />
          </div>
        )}
      </div>

      <Footer />
    
    </div>
  );
  
};

export default Dashboard;
