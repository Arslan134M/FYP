import React from "react";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
const HireCard = ({ hire }) => {
  console.log(hire);
  const history = useHistory();
  const handleSwithPage = () => {
    // history.push(username);
  };
  return (
    
    <div className="card bg-light col-10">
    <div classNmae="card-header">
      <a href="#" className="card-link"><b><div>
      
                    {hire?.service}
                    {hire?.location}
                    
                    

                    </div></b></a>
    <div className="card-body">
    <img className="card-img-bottom" src="https://image.shutterstock.com/image-vector/cleaning-clean-service-logo-icon-600w-1007843209.jpg"
     className="img" alt="not found"
     height="50px" width="50 px">
        
     </img>
   
    </div>
    </div>
    </div>
  
    );
  };
  
  export default HireCard;