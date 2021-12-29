import React, { useEffect } from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Footer from "../Footer/Footer";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import LoadingGif from '../../Assests/Loading.gif'
import { useHistory } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const [open, setOpen] = React.useState(false);

  const [pImageUrl, setPimageUrl] = useState("");
  const [pTitile, setPtitle] = useState("");
  const [pDescription, setPdescription] = useState("");
  const [pAmount, setPamount] = useState("");

  // console.log(pImageUrl, pTitile, pDescription, pAmount);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // console.log("data is ", data);

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

  // const addNewProducts = async(pTitile, pAmount, pDescription, pImageUrl) => {
  //   try{
  //     const response = await fetch("https://fakestoreapi.com/products", {
  //       method: "POST",
  //       body: JSON.stringify({
  //         title: {pTitile},
  //         price: {pAmount},
  //         description: {pDescription},
  //         image: {pImageUrl},
  //         category: "clothing",
  //       }),
  //     })
  //     const data = await response.json();
  //     console.log("Product data is",data);    
  //   }
  //   catch(err) {
  //     console.log("Error in Adding New Product", err)
  //   }
  // }

  // const handleAddProducts = () => {
  //   if(pTitile && pAmount && pDescription && pImageUrl) {
  //     addNewProducts(pTitile, pAmount, pDescription, pImageUrl);
  //     console.log("Product Added");
  //     handleClose();
  //   } else {
  //     alert("Enter Valid Input ");
  //   }
  // };


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
      alert("Added to the cart");
      cartItem.push(e);
      localStorage.setItem("cart", JSON.stringify(cartItem));
    } else {
      let list = [];

      getItems.map((element) => {
        if (element.id === e.id) {
          flag = false;
          alert("Product is already present in the Cart");
        }
      });

      if (flag) {
        alert("Added to the cart");
        list = [e, ...getItems];
        localStorage.setItem("cart", JSON.stringify(list));
      }
    }
  };

  return (
    <div style={{backgroundColor:'whitesmoke'}}>
      <div>
        <div>
          <div style={{ textAlign: "end" }}>
            <Button
              style={{ margin: "50px" }}
              variant="contained"
              size="large"
              onClick={handleOpen}
            >
              Add New Products
            </Button>
          </div>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Create Product
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  autoComplete="given-name"
                  name="ImageURL"
                  fullWidth
                  autoFocus
                  label="Image URL"
                  onChange={(e) => setPimageUrl(e.target.value)}
                />
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  autoComplete="given-name"
                  name="Title"
                  fullWidth
                  label="Title"
                  onChange={(e) => setPtitle(e.target.value)}
                />
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  autoComplete="given-name"
                  name="Description"
                  fullWidth
                  label="Description"
                  onChange={(e) => setPdescription(e.target.value)}
                />
              </Typography>

              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <TextField
                  autoComplete="given-name"
                  name="Amount"
                  fullWidth
                  label="Amount"
                  onChange={(e) => setPamount(e.target.value)}
                />
              </Typography>

              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                style={{ textAlign: "center" }}
              >
                <Button
                  variant="contained"
                  size="medium"
                  color="success"
                  // onClick={handleAddProducts}
                >
                  Add
                </Button>
              </Typography>
            </Box>
          </Modal>
        </div>

        {!loading ? (
          <div className="card-details">
            {data.map((e, i) => (
              <Card sx={{ maxWidth: 345, minHeight: 520, borderRadius:'8px'}} key={i}>
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

                  <Typography variant="body2" color="text.secondary" style={{fontFamily:"'Philosopher', sans-serif"}}>
                    {readMore ? e.description : e.description.substr(0, 150)}
                    <Button
                      onClick={() => setReadMore(!readMore)}
                      style={{ textTransform: "lowercase" }}
                    >
                      {readMore ? "show less" : "read more"}
                    </Button>
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
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
          <div style={{ textAlign: "center" }}>
            <img src={LoadingGif} alt="loading..." />

            <h1> Please Wait While we are loading stuffs for you.. </h1>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
  
};

export default Dashboard;
