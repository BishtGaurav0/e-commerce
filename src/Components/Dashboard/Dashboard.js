import React, { useEffect } from "react";
import { useState } from "react";
import './Dashboard.css'
import Footer from "../Footer/Footer";
import LoadingGif from '../../Assests/Loading.gif'
import CardData from '../Card/Card'
import CarouselComp from "../CarouselComp/CarouselComp";

const Dashboard = () => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  // console.log("data is ", data);

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


  // useEffect(()=>{
  //   let temp = data.filter((itm, i)=> {return {...itm, quantity:1}}) ;
  //   setData(temp);
  // }, [data])


  return (
    <div >
      <CarouselComp/>
      
      <div>
        {!loading ? (
          <div className="card-details">
            {
            data.map((e, i) => <CardData e={e} key={i}/>
            )}
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
