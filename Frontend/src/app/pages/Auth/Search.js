import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "../../styles/Auth/login.css";
import Logo from "../../assets/logo-primary.png";
import { useHistory } from "react-router-dom";
function Signup(){
    const dispatch = useDispatch();
  const history = useHistory();
  
  const handleSwitchPage = () => {
    history.push("/profile");
  };
  const handleSwitchPageLogout = () => {
    history.push("/");
  };
  
  const handleSwitchPageUser = () => {
    history.push("/user");
  };
  
return(
  
    <div>
        
        
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a onClick={() => handleSwitchPage()}  class="navbar-brand" href="#">Profile</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a onClick={() => handleSwitchPageUser() }class="nav-link" href="#">Users <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a onClick={() => handleSwitchPageLogout() } class="nav-link" href="#">Logout</a>
      </li>
      
       
      
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form>
  </div>
</nav>
        
     </div>
     
    
);
}
export default Signup;